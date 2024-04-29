import Navigation from "./Navigation"
import Message from "./Message"
import React, {useState} from "react"
import questionnaire_medical from '../assets/questionnaire_medical.png'
import certificat_medical_barre from '../assets/certificat_medical_barre.png'
import certificat_medical from '../assets/certificat_medical.png'

const FormulaireEtatSante = ({onSuivant}) => {
    const [partieAffichee, setPartieAffichee] = useState(1)
    const [etatSante, setEtatSante] = useState(false)

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
            <Navigation
                partieActuelle={partieAffichee}
                afficherPartie={afficherPartie}
                lienVersPagePrecedente={'/nouvelAdherent/etat-sante'}
            />
            {partieAffichee === 1 && (
                <>
                    <Message
                        message={{text: 'Donner le questionnaire de santé'}}
                        image={{
                            url: questionnaire_medical,
                            alt: 'Une image de questionnaire de santé'}}/>
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
                            message={{text: 'L’adhérent a besoin d’un certificat médical, à remettre avant la première séance.'}}
                            image={{
                                url: certificat_medical,
                                alt: 'Une image de certificat medical',}}/>
                        :
                        <Message
                            message={{text: 'L’adhérent n\'a besoin d’aucun certificat médical, à remettre avant la première séance.'}}
                            image={{
                                url: certificat_medical_barre,
                                alt: 'Une image de certificat medical barré',}}/>
                    }
                    <button type="button" onClick={() => handleSuivant()}>Suivant</button>
                </div>
            )}
        </div>
    )
}

export default FormulaireEtatSante