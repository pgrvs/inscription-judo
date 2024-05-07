import BarreEtapes from "./BarreEtapes"
import React from "react"
import Navigation from "../Navigation"
import { useNavigate } from 'react-router-dom'
import {
    addAdherent,
    addCategorieToAdherent,
    addResponsableToAdherent,
    updateAdherent,
    updateResponsableToAdherent,
    createFacture,
    validateFacture,
    createPdfFacture
} from "../../API/RequetesAPI"

const FormulaireFin = ({donnees}) => {
    const navigate = useNavigate()

    const handleHome = async () => {
        let adherentId

        // Création / modification de l'adhérent
        if (!donnees.idAdherent){
            adherentId =  await addAdherent(donnees.adherent, donnees.etatSante, donnees.cotisation)
        } else {
            const response = await updateAdherent(donnees.idAdherent, donnees.adherent, donnees.etatSante, donnees.cotisation)
            adherentId = response.id
        }

        // Ajout du tag 'adherent'
        addCategorieToAdherent(adherentId)

        // Création / modification des responsables de l'adhérent
        donnees.responsables.forEach((responsable) => {
            if (!responsable.id){
                addResponsableToAdherent(adherentId, responsable)
            } else {
                console.log(responsable)
                updateResponsableToAdherent(adherentId, responsable)
            }
        })

        const idFacture = await createFacture(adherentId, donnees.cotisation)
        const facture = await validateFacture(idFacture)
        createPdfFacture(facture.ref)

        //Envoie du mail


        navigate('/')
    }

    return(
        <div>
            <Navigation
                partieActuelle={1}
                afficherPartie={1}
                lienVersPagePrecedente={'/nouvelAdherent/cotisation'}
            />
            <BarreEtapes isMajeur={donnees.isAdherentMajeur}/>
            <h3>L'adhérent va recevoir par email :</h3>
            <ul>
                <li>La facture</li>
                <li>Les horaires</li>
                <li>L'attestation relatif à l'état de santé (à rentourner)</li>
                <li>Les règles autour du certificat médical et/ou des attesations sur l'honneur</li>
                <li>Ainsi que des informations sur : </li>
                <ul>
                    <li>L'autorisation du droit à l'image</li>
                    <li>La situation d'accident sportif</li>
                </ul>
            </ul>
            <button onClick={handleHome}>Fin, retour à l'accueil</button>
        </div>
    )
}

export default FormulaireFin