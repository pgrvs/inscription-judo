import React from 'react'
import { useNavigate } from 'react-router-dom'
import RetourAccueil from "../assets/RetourAccueil"
import FlecheRetour from "../assets/FlecheRetour"
import './../styles/navigation.scss'
import './../styles/globale.scss'

const Navigation = ({ partieActuelle, afficherPartie, lienVersPagePrecedente }) => {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }
    const handleRetour = () => {
        if (partieActuelle === 1) {
            navigate(lienVersPagePrecedente)
        } else {
            afficherPartie(partieActuelle - 1)
        }
    }

    return (
        <>
            <button className="button-retour accueil" onClick={handleHome}><RetourAccueil width="35" height="35"/></button>
            <button className="button-retour fleche-retour" onClick={handleRetour}><FlecheRetour width="35" height="35"/></button>
        </>
    )
}

export default Navigation
