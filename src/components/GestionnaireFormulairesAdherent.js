import {useState} from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'
import RechercheAdherent from './RechercheAdherent'
import FormulaireAdherent from './FormulaireAdherent'
import FormulaireResponsable from './FormulaireResponsable'
import FormulaireEtatSante from './FormulaireEtatSante'
import FormulaireCotisation from './FormulaireCotisation'
import FormulaireFin from './FormulaireFin'

const GestionnaireFormulairesAdherent = () => {
    const navigate = useNavigate()

    const [donnees, setDonnees] = useState({
        idAdherent: null,
        isAdherentMajeur: null,
        recherche: {},
        adherent: {},
        responsables: [],
        etatSante: {},
        cotisation: {},
        fin: {},
    })

    const handleSuivant = (data) => {
        setDonnees({ ...donnees, ...data })
        navigate(nextRoute())
    }

    const handlePrecedent = () => {
        navigate(prevRoute())
    }

    const nextRoute = () => {
        let steps = [
            '/nouvelAdherent',
            '/nouvelAdherent/adherent/1',
            '/nouvelAdherent/responsable',
            '/nouvelAdherent/etat-sante',
            '/nouvelAdherent/cotisation',
            '/nouvelAdherent/fin',
        ]

        if(donnees.isAdherentMajeur){
            steps = [
                '/nouvelAdherent',
                '/nouvelAdherent/adherent/1',
                '/nouvelAdherent/etat-sante',
                '/nouvelAdherent/cotisation',
                '/nouvelAdherent/fin',
            ]
        }

        const currentStep = steps.indexOf(window.location.pathname)
        return currentStep < steps.length - 1 ? steps[currentStep + 1] : '/'
    }

    const prevRoute = () => {
        let steps = [
            '/nouvelAdherent',
            '/nouvelAdherent/adherent',
            '/nouvelAdherent/responsable',
            '/nouvelAdherent/etat-sante',
            '/nouvelAdherent/cotisation',
            '/nouvelAdherent/fin',
        ]

        if(!donnees.isAdherentMajeur){
            steps = [
                '/nouvelAdherent',
                '/nouvelAdherent/adherent',
                '/nouvelAdherent/etat-sante',
                '/nouvelAdherent/cotisation',
                '/nouvelAdherent/fin',
            ]
        }
        const currentStep = steps.indexOf(window.location.pathname)
        return currentStep > 0 ? steps[currentStep - 1] : '/'
    }

    return (
        <div>
            {console.log(donnees)}
            <Routes>
                <Route path="/"
                       element={<RechercheAdherent
                           donneesRecherche={donnees.recherche}
                           onSuivant={handleSuivant} />} />
                <Route path="adherent/:partie"
                       element={<FormulaireAdherent
                           donnees={donnees}
                           onSuivant={handleSuivant}
                           onPrecedent={handlePrecedent} />} />
                <Route path="responsable"
                       element={<FormulaireResponsable
                           donnees={donnees}
                           onSuivant={handleSuivant}
                           onPrecedent={handlePrecedent} />} />
                <Route path="etat-sante"
                       element={<FormulaireEtatSante
                           onSuivant={handleSuivant}
                           onPrecedent={handlePrecedent} />} />
                <Route path="cotisation"
                       element={<FormulaireCotisation
                           donnees={donnees}
                           onSuivant={handleSuivant}
                           onPrecedent={handlePrecedent} />} />
                <Route path="fin"
                       element={<FormulaireFin
                           donnees={donnees}
                           onPrecedent={handlePrecedent} />} />
            </Routes>
        </div>
    )
}

export default GestionnaireFormulairesAdherent
