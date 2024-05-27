import BarreEtapes from "./BarreEtapes"
import React, {useState} from "react"
import Navigation from "../Navigation"
import {useNavigate} from 'react-router-dom'
import {
    addAdherent, updateAdherent,
    addCategorieToAdherent,
    addResponsableToAdherent,
    updateResponsableToAdherent,
    createFacture,
    validateFacture,
    createPdfFacture,
    downloadDocument
} from "../../API/RequetesAPI"
import {sendEmail} from "../email/SendEmail"
import EmailInscription from "../email/EmailInscription"
import EmailCertificatMedical from "../email/EmailCertificatMedical"
import EmailResponsable from "../email/EmailResponsable"
import {
    textEmailInscription,
    textEmailCertificatMedical,
    textEmailResponsable
} from "../email/emailText"
import {render} from '@react-email/render'
import style from "../../styles/inscription/FormulaireFin.module.scss"

const FormulaireFin = ({donnees}) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {
        idAdherent,
        isAdherentMajeur,
        adherent,
        responsables,
        etatSante,
        cotisation,
    } = donnees

    const handleHome = async () => {
        setLoading(true)
        let adherentId

// --------- Création ou modification de l'adhérent
        if (!idAdherent){
            adherentId =  await addAdherent(adherent, etatSante, cotisation)
        } else {
            const response = await updateAdherent(idAdherent, adherent, etatSante, cotisation)
            adherentId = response.id
            console.log(response)
        }

// --------- Ajout du tag 'adherent'
        addCategorieToAdherent(adherentId)

// --------- Création ou modification des responsables de l'adhérent
        responsables.forEach((responsable) => {
            if (!responsable.id){
                addResponsableToAdherent(adherentId, responsable)
            } else {
                updateResponsableToAdherent(adherentId, responsable)
            }
        })

        const idFacture = await createFacture(adherentId, cotisation)
        const facture = await validateFacture(idFacture)
        await createPdfFacture(facture.ref)

// --------- Envoie du mail
        const regleSantePdf = await downloadDocument('ecm' , 'Documents_a_envoyer/Regles-autours-du-certificat-medical-et-des-attestations-sur-honneur.pdf')
        const facturePdf = await downloadDocument('facture' , facture.ref + '/' + facture.ref + '.pdf')
        const horairesPdf = await downloadDocument('ecm' , 'Documents_a_envoyer/Horaires.pdf')

        let attachments = [
            {
                'filename' : 'Regles-autours-du-certificat-medical-et-des-attestations-sur-honneur.pdf',
                'content' : regleSantePdf.content,
                'contentType' : 'application/pdf',
                'encoding': 'base64'
            }
        ]

// --------- Si besoin d'un certificat médial
        if (etatSante){
            const emailHtml = render(<EmailCertificatMedical prenom={adherent.prenom} nom={adherent.nom}/>)
            sendEmail(
                adherent.adresseEmail,
                'Cercle du Judo Vesoul - Cerificat Médical',
                textEmailCertificatMedical(adherent.prenom, adherent.nom),
                emailHtml,
                attachments
            )
        }

        attachments.push({
            'filename' : facturePdf.filename,
            'content' : facturePdf.content,
            'contentType' : 'application/pdf',
            'encoding': 'base64'
        },
        {
            'filename' : horairesPdf.filename,
            'content' : horairesPdf.content,
            'contentType' : 'application/pdf',
            'encoding': 'base64'
        }
        )

// --------- Email pour l'inscription d'un adherent MAJEUR avec attestation de santé
        if (isAdherentMajeur && !etatSante) {
            const attestationMajeur = await downloadDocument('ecm' , 'Documents_a_envoyer/Attestation-QS-sport.pdf')

            attachments.push({
                'filename' : attestationMajeur.filename,
                'content' : attestationMajeur.content,
                'contentType' : 'application/pdf',
                'encoding': 'base64'
            })

            const emailHtml = render(
                <EmailInscription
                    prenom={adherent.prenom}
                    nom={adherent.nom}
                    text={"Merci de retourner l'attestation relatif à l'état de santé complété et signé, s'il vous plais."}
                />)
            sendEmail(
                adherent.adresseEmail,
                'Cercle du Judo Vesoul - Inscription',
                textEmailInscription(adherent.prenom, adherent.nom, "Merci de retourner l'attestation relatif à l'état de santé complété et signé, s'il vous plais."),
                emailHtml,
                attachments
            )

        }
// --------- Email pour l'inscription d'un adherent MINEUR avec attestation de santé
        else if (!etatSante){
            const attestationMineur = await downloadDocument('ecm' , 'Documents_a_envoyer/Attestation-relatif-etat-de-sante-du-sportif-mineur.pdf')

            attachments.push({
                'filename' : attestationMineur.filename,
                'content' : attestationMineur.content,
                'contentType' : 'application/pdf',
                'encoding': 'base64'
            })

            const emailHtml = render(
                <EmailInscription
                    prenom={adherent.prenom}
                    nom={adherent.nom}
                    text={"Merci de retourner l'attestation relatif à l'état de santé complété et signé, s'il vous plais."}
                />)
            sendEmail(
                adherent.adresseEmail,
                'Cercle du Judo Vesoul - Inscription',
                textEmailInscription(adherent.prenom, adherent.nom, "Merci de retourner l'attestation relatif à l'état de santé complété et signé, s'il vous plais."),
                emailHtml,
                attachments
            )

        }
// --------- Email pour l'inscription d'un adherent avec demande du cerificat médical
        else {
            const emailHtml = render(
                <EmailInscription
                    prenom={adherent.prenom}
                    nom={adherent.nom}
                    text={"Merci de fournir un certificat médical, s'il vous plais."}
                />)
            sendEmail(
                adherent.adresseEmail,
                'Cercle du Judo Vesoul - Inscription',
                textEmailInscription(adherent.prenom, adherent.nom, "Merci de fournir un certificat médical, s'il vous plais."),
                emailHtml,
                attachments
            )
        }

// --------- Email pour les Responsables
        let info
        let attachmentsResponsable
        if (!isAdherentMajeur){
            responsables.forEach((responsable) => {
                info = responsable.informations
                attachmentsResponsable = []

                if (info.factures || info.legales || info.sportives) {
                    if(info.factures) {
                        attachmentsResponsable.push({
                            'filename' : facturePdf.filename,
                            'content' : facturePdf.content,
                            'contentType' : 'application/pdf',
                            'encoding': 'base64'
                        })
                    }
                    if(info.legales) {
                        attachmentsResponsable.push({
                            'filename' : 'Regles-autours-du-certificat-medical-et-des-attestations-sur-honneur.pdf',
                            'content' : regleSantePdf.content,
                            'contentType' : 'application/pdf',
                            'encoding': 'base64'
                        })
                    }
                    if(info.sportives) {
                        attachmentsResponsable.push({
                            'filename': horairesPdf.filename,
                            'content': horairesPdf.content,
                            'contentType': 'application/pdf',
                            'encoding': 'base64'
                        })
                    }

                    const emailHtml = render(
                        <EmailResponsable
                            prenom={adherent.prenom}
                            nom={adherent.nom}
                        />)
                    sendEmail(
                        responsable.adresseEmail,
                        'Cercle du Judo Vesoul - Inscription',
                        textEmailResponsable(adherent.prenom, adherent.nom),
                        emailHtml,
                        attachments
                    )
                }
            })
        }

        navigate('/')
    }

    return(
        <div>
            { loading
                ? <p>Traitement en cours ...</p>
                :
                <>
                    <Navigation
                        partieActuelle={1}
                        afficherPartie={1}
                        lienVersPagePrecedente={'/nouvel-adherent/cotisation'}
                    />
                    <div className="container">
                        <BarreEtapes isMajeur={isAdherentMajeur}/>
                        <div className={"encadrementPrincipal"}>
                            <div className={style.containerFin}>
                                <h3>L'adhérent va recevoir par email :</h3>
                                <ul>
                                    <li>La facture</li>
                                    <li>Les horaires</li>
                                    <li>L'attestation relatif à l'état de santé <span>(à rentourner)</span></li>
                                    <li>Les règles autour du certificat médical et/ou des attesations sur l'honneur</li>
                                    <li>Ainsi que des informations sur :</li>
                                    <ul>
                                        <li>L'autorisation du droit à l'image</li>
                                        <li>La situation d'accident sportif</li>
                                    </ul>
                                </ul>
                                <button className={"buttonSuivant"} onClick={handleHome}>Fin, retour à l'accueil</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default FormulaireFin