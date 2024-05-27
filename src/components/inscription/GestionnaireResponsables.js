import React from 'react'
import style from '../../styles/inscription/GestionnaireResponsables.module.scss'
import ModifierCrayon from "../../assets/ModifierCrayon"

const GestionnaireResponsables = ({responsables, indexResponsbale}) => {
    const handleClickResponsable = (index) => {
        indexResponsbale(index)
    }

    return(
        <ul className={style.ulResponsables}>
            { (responsables.length > 0) ?
                <>
                    {responsables.map((responsable, index) => (
                        <li key={index}>
                            <div className={style.divResponsable1}>
                                <h3>{responsable.nom} {responsable.prenom}</h3>
                                <p>{responsable.adresseEmail}</p>
                                <p>{responsable.numeroTelephone[0]}</p>
                            </div>
                            <div className={style.divResponsable2}>
                                <p>{responsable.rue}</p>
                                <p>{responsable.codePostal} {responsable.ville}</p>
                                <h4>Reçoit par email :</h4>
                                <p>
                                    {responsable.informations.factures && 'Factures'}
                                    {(responsable.informations.factures && (responsable.informations.legales || responsable.informations.sportives)) && ','}
                                    {(responsable.informations.legales || responsable.informations.sportives) && ' Informations '}
                                    {responsable.informations.legales && 'légales '}
                                    {(responsable.informations.legales && responsable.informations.sportives) && 'et '}
                                    {responsable.informations.sportives && 'sportives'}
                                    {(!responsable.informations.factures && !responsable.informations.legales && !responsable.informations.sportives) && 'Aucune informations'}
                                </p>
                            </div>
                            <button onClick={() => handleClickResponsable(index)}>
                                <ModifierCrayon height={'35px'}/>
                            </button>
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