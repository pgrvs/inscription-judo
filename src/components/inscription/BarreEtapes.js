import React from 'react'
import { useLocation } from 'react-router-dom'
import style from '../../styles/inscription/BarreEtapes.module.scss'

const BarreEtapes = ({ isMajeur }) => {
    const location = useLocation()

    const etapes = isMajeur
        ? ['Adhérent', 'État de santé', 'Cotisation', 'Fin']
        : ['Adhérent', 'Responsable', 'État de santé', 'Cotisation', 'Fin']

    const urlPath = location.pathname
    let currentStepIndex = 0

    if (urlPath.includes('responsable')) {
        currentStepIndex = 1
    } else if (urlPath.includes('etat-sante')) {
        currentStepIndex = 2
    } else if (urlPath.includes('cotisation')) {
        currentStepIndex = isMajeur ? 2 : 3
    } else if (urlPath.includes('fin')) {
        currentStepIndex = isMajeur ? 3 : 4
    }

    return (
        <div className={style.barreEtapes}>
            {etapes.map((etape, index) => {
                return (
                    <div
                        className={index < currentStepIndex ? style.etapeFaite :
                        index === currentStepIndex ? style.etapeEnCours :
                            style.etapeNonFaite}
                        key={etape}>
                        <span className={
                            index < currentStepIndex ? style.chiffreEtapeFaite :
                                index === currentStepIndex ? style.chiffreEtapeEnCours :
                                    style.chiffreEtapeNonFaite
                        }>
                          {index + 1}
                        </span>
                        <span className={
                            index < currentStepIndex ? style.texteEtapeFaite :
                                index === currentStepIndex ? style.texteEtapeEnCours :
                                    style.texteEtapeNonFaite
                        }>
                          {etape}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default BarreEtapes
