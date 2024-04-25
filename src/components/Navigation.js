import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = ({ partieActuelle, afficherPartie, lienVersPagePrecedente }) => {
    const navigate = useNavigate()

    const handleHome = () => {
        // Redirige vers la page d'accueil
        navigate('/')
    }

    const handleRetour = () => {
        if (partieActuelle === 1) {
            // Si on est à la première partie, rediriger vers la page précédente donnée par la prop
            navigate(lienVersPagePrecedente)
        } else {
            // Sinon, afficher la partie précédente
            afficherPartie(partieActuelle - 1)
        }
    }

    return (
        <div>
            <button onClick={handleHome}>Home</button>
            <button onClick={handleRetour}>Retour</button>
        </div>
    )
}

export default Navigation
