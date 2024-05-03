import React from 'react'

const GestionnaireResponsables = ({responsables, indexResponsbale}) => {
    const handleClickResponsable = (index) => {
        indexResponsbale(index)
    }

    return(
        <ul>
            { (responsables.length > 0) ?
                <>
                    {responsables.map((responsable, index) => (
                        <li key={index}>
                            <h3>{responsable.nom} {responsable.prenom}</h3>
                            <p>{responsable.adresseEmail}</p>
                            <button onClick={() => handleClickResponsable(index)}>Sélectionner</button>
                        </li>
                    ))}
                </>
            :
                <p>
                    Pas encore de responsable
                </p>
            }

        </ul>
    )
}

export default GestionnaireResponsables