import Navigation from "../Navigation"
import Message from "./Message"
import React, {useState, useEffect, useContext} from "react"
import { RouteContext } from '../RouteProvider'
import BarreEtapes from "./BarreEtapes";

const FormulaireEtatSante = ({isAdherentMajeur, onSuivant}) => {
    const [partieAffichee, setPartieAffichee] = useState(1)
    const [etatSante, setEtatSante] = useState(false)
    const previousRoute = useContext(RouteContext)

    useEffect(() => {
        if (previousRoute === '/nouvelAdherent/cotisation') {
            setPartieAffichee(3)
        }
    }, [previousRoute])

    const afficherPartie = (partie) => {
        setPartieAffichee(partie)
    }

    const reponseQuestionnaireMedicale = (formEtatSante) => {
        setEtatSante(formEtatSante)
        setPartieAffichee(3)
    }

    const handleSuivant = () => {
        onSuivant({ etatSante })
    }

    return (
        <div>
            {isAdherentMajeur ?
                <Navigation
                    partieActuelle={partieAffichee}
                    afficherPartie={afficherPartie}
                    lienVersPagePrecedente={'/nouvelAdherent/adherent'}
                />
                :
                <Navigation
                    partieActuelle={partieAffichee}
                    afficherPartie={afficherPartie}
                    lienVersPagePrecedente={'/nouvelAdherent/responsable'}
                />
            }
            <BarreEtapes isMajeur={isAdherentMajeur}/>
            {partieAffichee === 1 && (
                <>
                    <Message
                        message={'Donner le questionnaire de santé'}
                        image={'questionnaire_medical'}/>
                    <button type="button" onClick={() => afficherPartie(2)}>Suivant</button>
                </>
            )}
            {partieAffichee === 2 && (
                <div>
                   <button type="button" onClick={() => reponseQuestionnaireMedicale(false)}>
                       L'adhérent a répondu <span>non</span> à toutes les questions du formulaire
                   </button>
                   <button type="button" onClick={() => reponseQuestionnaireMedicale(true)}>
                       L'adhérent a répondu <span>oui</span> à une ou plusieurs questions du formulaire
                   </button>
                </div>
            )}
            {partieAffichee === 3 && (
                <div>
                    { etatSante ?
                        <Message
                            message={'L’adhérent a besoin d’un certificat médical, à remettre avant la première séance.'}
                            image={'certificat_medical'}/>
                        :
                        <Message
                            message={'L’adhérent n\'a besoin d’aucun certificat médical, à remettre avant la première séance.'}
                            image={'certificat_medical_barre'}/>
                    }
                    <button type="button" onClick={() => handleSuivant()}>Suivant</button>
                </div>
            )}
        </div>
    )
}

export default FormulaireEtatSante