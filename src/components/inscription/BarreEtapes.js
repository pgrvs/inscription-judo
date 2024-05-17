import React from 'react'
import { useLocation } from 'react-router-dom'

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
        <div className="barreEtapes">
            {etapes.map((etape, index) => {
                // Déterminer la classe à appliquer à chaque étape
                let stepClass = 'barreEtapeNonFaite'

                if (index < currentStepIndex) {
                    stepClass = 'barreEtapeFaite'
                } else if (index === currentStepIndex) {
                    stepClass = 'barreEtapeEnCours'
                }

                return (
                    <div key={etape}>
                        <span className={'chiffre' + stepClass}>
                            {index + 1}
                        </span>
                        <span className={stepClass}>
                            {etape}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default BarreEtapes
