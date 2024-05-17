import React, {useEffect, useState} from 'react'
import {rechercheAdherents, getResponsablesByIdAdherent} from "../../API/RequetesAPI"
import Navigation from '../Navigation'
import {splitName, convertTimestampToDate, capitalize, informationsRecevoirParMailToObject} from "../../common/utils"
import './../../styles/recherche-adherent.scss'
import './../../styles/globale.scss'

const RechercheAdherent = ({ donneesRecherche, onSuivant }) => {
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [numeroLicence, setNumeroLicence] = useState('')
    const [resultats, setResultats] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetcheData()
    }, [nom, prenom, numeroLicence])

    const fetcheData = async () => {
        setLoading(true)
        let results = []
        if (nom || prenom || numeroLicence) {
            try {
                results = await rechercheAdherents(prenom, nom, numeroLicence)
            } catch (error) {
                console.error("Erreur lors de la recherche des adhérents:", error)
            }
        }
        setResultats(results)
        setLoading(false)
    }

    useEffect(() => {
        if (Object.keys(donneesRecherche).length !== 0) {
            setPrenom(donneesRecherche.prenom)
            setNom(donneesRecherche.nom)
            setNumeroLicence(donneesRecherche.numeroLicence)
        }
    }, [donneesRecherche])

    const handleChangeNom = (e) => {
        const upperCaseNom = e.target.value.toUpperCase()
        setNom(upperCaseNom)
    }

    const handleChangePrenom = (e) => {
        setPrenom(capitalize(e.target.value))
    }

    const handleChangeNumeroLicence = (e) => {
        setNumeroLicence(e.target.value)
    }

    const handleClickSuivant = async (adherent) => {
        const recherche = {
            'nom': nom,
            'prenom': prenom,
            'numeroLicence': numeroLicence
        }

        let idAdherent = null
        let responsablesAPI = {}
        let responsables = []

        if (adherent) {
            idAdherent = adherent.id
            const {prenom, nom} = splitName(adherent.name)
            adherent = {
                nom: nom,
                prenom: prenom,
                dateDeNaissance: convertTimestampToDate(adherent.array_options.options_datedenaissance),
                rue: adherent.address,
                codePostal: adherent.zip,
                ville: adherent.town,
                numeroTelephone: adherent.phone,
                adresseEmail: adherent.email,
                couleurCeinture: adherent.array_options.options_couleurdelaceinture,
                poids: adherent.array_options.options_poidsenkilogramme,
                genre: adherent.array_options.options_genre,
                droitImage: adherent.array_options.options_droitimage
            }
            responsablesAPI = await getResponsablesByIdAdherent(idAdherent)
            if (responsablesAPI.length > 0){
                responsablesAPI.forEach((responsable) => {
                    let responsableData = {}
                    responsableData = {
                        id : responsable.id,
                        prenom : responsable.firstname,
                        nom : responsable.lastname,
                        rue: responsable.address,
                        codePostal: responsable.zip,
                        ville: responsable.town,
                        numeroTelephone: [responsable.phone_perso, responsable.phone_mobile],
                        adresseEmail: responsable.mail,
                        informations: informationsRecevoirParMailToObject(responsable.array_options.options_recevoirparmail)
                    }
                    responsables.push(responsableData)
                })
            }
        }
        onSuivant({idAdherent, recherche, adherent, responsables})
    }

    return (
        <div>
            <Navigation
                partieActuelle={1}
                afficherPartie={1}
                lienVersPagePrecedente={'/'}
            />
            <h2>Recherche Adhérent</h2>
            <input
                type="text"
                value={prenom}
                onChange={handleChangePrenom}
                placeholder="Prénom"
            />
            <br/>
            <input
                type="text"
                value={nom}
                onChange={handleChangeNom}
                placeholder="Nom"
            />
            <br/>
            <input
                type="text"
                value={numeroLicence}
                onChange={handleChangeNumeroLicence}
                placeholder="Numero de licence"
            />
            <h3>Résultats de la recherche :</h3>

            {loading
                ? <p>Recherche en cours...</p>
                : (
                    <>
                        {resultats.length > 0 && (
                            <div>
                                <ul>
                                    {resultats.map((adherent) => (
                                        <li key={adherent.id}>
                                            {adherent.name} - {adherent.array_options.options_numroadhrent}
                                            <button onClick={() => handleClickSuivant(adherent)}>Sélectionner</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {(resultats.length === undefined && (nom !== '' || prenom !== '')) && (
                            <p>Aucun adhérent trouvé au nom de {nom} {prenom}</p>
                        )}
                        {(resultats.length === undefined && (numeroLicence !== '')) && (
                            <p>Aucun adhérent trouvé avec le numéro de licence : {numeroLicence}</p>
                        )}
                    </>
                )
            }
            <br/>
            <button onClick={() => handleClickSuivant(null)}>Nouvel Adhérent</button>
        </div>
    )
}

export default RechercheAdherent
