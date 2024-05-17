import React from 'react'
import { Link } from 'react-router-dom'
import AjoutAdherent from "../assets/AjoutAdherent"
import VerifierCertificatsMedicaux from "../assets/VerifierCertificatsMedicaux"
import '../styles/globale.scss'
import '../styles/accueil.scss'

const Accueil = () => {
    return (
        <div className="container">
            <h1>Bienvenue</h1>
            <div className="navigation-accueil">
                <Link to="/nouvel-adherent">
                    <button className="button-accueil">
                        <AjoutAdherent className="image image-trop-a-droite" width="50" height="50"/>
                        <p className="text-accueil">Nouvelle  <br/>inscription <br/></p>
                    </button>
                </Link>
                <Link to="/verification-certificats-medicals">
                    <button className="button-accueil">
                        <VerifierCertificatsMedicaux className="image" width="50" height="50"/>
                        <p className="text-accueil">Vérification <br/>certificats <br/>médicaux</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Accueil