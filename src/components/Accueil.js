import React from 'react'
import { Link } from 'react-router-dom'
import AjoutAdherent from "../assets/AjoutAdherent"
import VerifierCertificatsMedicaux from "../assets/VerifierCertificatsMedicaux"
import styleAccueil from '../styles/Accueil.module.scss'

const Accueil = () => {
    return (
        <div className={"container"}>
            <div>
                <h1>Bienvenue</h1>
                <div className={styleAccueil.navigationAccueil}>
                    <Link to="/nouvel-adherent">
                        <button className={styleAccueil.buttonAccueil}>
                            <AjoutAdherent className={`${styleAccueil.image} ${styleAccueil.imageTropaDroite}`} width="50" height="50"/>
                            <p className={styleAccueil.textAccueil}>Nouvelle <br/>inscription <br/></p>
                        </button>
                    </Link>
                    <Link to="/verification-certificats-medicals">
                        <button className={styleAccueil.buttonAccueil}>
                            <VerifierCertificatsMedicaux className={styleAccueil.image} width="50" height="50"/>
                            <p className={styleAccueil.textAccueil}>Vérification <br/>certificats <br/>médicaux</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Accueil