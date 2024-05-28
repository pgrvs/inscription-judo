import Navigation from "../Navigation"
import Message from "./Message"
import React, {useState, useEffect, useContext} from "react"
import { RouteContext } from '../RouteProvider'
import BarreEtapes from "./BarreEtapes"
import ButtonSuivant from "../ButtonSuivant"
import style from "../../styles/inscription/FormulaireEtatSante.module.scss"


const FormulaireEtatSante = ({isAdherentMajeur, onSuivant}) => {
    const [partieAffichee, setPartieAffichee] = useState(1)
    const [etatSante, setEtatSante] = useState(false)
    const previousRoute = useContext(RouteContext)

    useEffect(() => {
        if (previousRoute === '/nouvel-adherent/cotisation') {
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
                    lienVersPagePrecedente={'/nouvel-adherent/adherent'}
                />
                :
                <Navigation
                    partieActuelle={partieAffichee}
                    afficherPartie={afficherPartie}
                    lienVersPagePrecedente={'/nouvel-adherent/responsable'}
                />
            }
            <div className="container">
                <BarreEtapes isMajeur={isAdherentMajeur}/>
                {partieAffichee === 1 && (
                    <div>
                        <Message
                            message={'Donner le questionnaire de santé'}
                            image={'questionnaire_medical'}/>
                        <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(2)} />
                    </div>
                )}
                {partieAffichee === 2 && (
                    <div className={"encadrementPrincipal"}>
                        <div className={style.divButtonEtatSante}>
                            <button className={style.buttonNon}type="button" onClick={() => reponseQuestionnaireMedicale(false)}>
                                L'adhérent a répondu <br/><span>non</span> à toutes les questions <br/>du formulaire
                            </button>
                            <button className={style.buttonOui} type="button" onClick={() => reponseQuestionnaireMedicale(true)}>
                                L'adhérent a répondu <br/><span>oui</span> à une ou plusieurs <br/>questions du formulaire
                            </button>
                        </div>
                    </div>
                )}
                {partieAffichee === 3 && (
                    <div>
                        {etatSante ?
                            <Message
                                message={'L’adhérent a <span>besoin</span> d’un <span>certificat médical</span>, à remettre avant la première séance.'}
                                image={'certificat_medical'}/>
                            :
                            <Message
                                message={'L’adhérent n\'a besoin d’<span>aucun certificat médical</span>, à remettre avant la première séance.'}
                                image={'certificat_medical_barre'}/>
                        }
                        <ButtonSuivant text={"Suivant"} onClick={() => handleSuivant()} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormulaireEtatSante