import React from 'react'
import { Link } from 'react-router-dom'

const Accueil = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/nouvelAdherent">Adhérent</Link></li>
                <li><Link to="/example">Exemple</Link></li>
            </ul>
        </nav>
    )
}

export default Accueil