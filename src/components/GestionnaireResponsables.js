import React from 'react'

const GestionnaireResponsables = ({responsables, indexResponsbale}) => {
    const handleClickResponsable = (index) => {
        indexResponsbale(index)
    }

    return(
        <ul>
            {responsables.map((responsable, index) => (
                <li key={index}>
                    <h3>{responsable.nom} {responsable.prenom}</h3>
                    <p>{responsable.adresseEmail}</p>
                    <button onClick={() => handleClickResponsable(index)}>Sélectionner</button>
                </li>
            ))}
        </ul>
    )
}

export default GestionnaireResponsables