import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationAccueil from "./NavigationAccueil"
import FlecheRetour from "../assets/FlecheRetour"
import style from '../styles/Navigation.module.scss'

const Navigation = ({ partieActuelle, afficherPartie, lienVersPagePrecedente }) => {
    const navigate = useNavigate()

    const handleRetour = () => {
        if (partieActuelle === 1) {
            navigate(lienVersPagePrecedente)
        } else {
            afficherPartie(partieActuelle - 1)
        }
    }

    return (
        <>
            <NavigationAccueil/>
            <button className={`buttonRetour ${style.flecheRetour}`} onClick={handleRetour}><FlecheRetour width="27" height="27"/></button>
        </>
    )
}

export default Navigation
