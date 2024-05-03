import BarreEtapes from "./BarreEtapes"
import React, {useEffect} from "react"
import Navigation from "../Navigation"
import { useNavigate } from 'react-router-dom'
import {addAdherent, addCategorieToAdherent, updateAdherent} from "../../API/RequetesAPI"

const FormulaireFin = ({donnees}) => {
    const navigate = useNavigate()

    const postAdherent = async () => {
        try {
            return await addAdherent(donnees.adherent, donnees.etatSante)
        } catch (error) {
            console.error('Erreur lors de la requete addAdherent:', error)
        }
    }

    const putAdherent = async () => {
        try {
            return await updateAdherent(donnees.idAdherent, donnees.adherent, donnees.etatSante)
        } catch (error) {
            console.error('Erreur lors de la requete updateAdherent:', error)
        }
    }

    const postCategorieToAdherent = async () => {
        try {
            return await addCategorieToAdherent()
        } catch (error) {
            console.error('Erreur lors de la requete updateAdherent:', error)
        }
    }

    const handleHome = async () => {
        let id
        if (!donnees.idAdherent){
            id =  await addAdherent(donnees.adherent, donnees.etatSante, donnees.cotisation)
        } else {
            const response = await updateAdherent(donnees.idAdherent, donnees.adherent, donnees.etatSante, donnees.cotisation)
            id = response.id
        }
        addCategorieToAdherent(id)

        donnees.responsables.map((responsable) => {

        })

        console.log(id)
        navigate('/')
    }

    return(
        <div>
            <Navigation
                partieActuelle={1}
                afficherPartie={1}
                lienVersPagePrecedente={'/cotisation'}
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