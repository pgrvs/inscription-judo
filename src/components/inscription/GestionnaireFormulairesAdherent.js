import {useState} from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'
import RechercheAdherent from './RechercheAdherent'
import FormulaireAdherent from './FormulaireAdherent'
import FormulaireResponsable from './FormulaireResponsable'
import FormulaireEtatSante from './FormulaireEtatSante'
import FormulaireCotisation from './FormulaireCotisation'
import FormulaireFin from './FormulaireFin'
import RouteProvider from '../RouteProvider'

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
        navigate(nextRoute(data.isAdherentMajeur) || donnees.isAdherentMajeur)
    }

    const nextRoute = (isAdherentMajeur) => {
        let steps = []
        if(isAdherentMajeur){
            steps = [
                '/nouvelAdherent',
                '/nouvelAdherent/adherent',
                '/nouvelAdherent/etat-sante',
                '/nouvelAdherent/cotisation',
                '/nouvelAdherent/fin',
            ]
        } else {
            steps = [
                '/nouvelAdherent',
                '/nouvelAdherent/adherent',
                '/nouvelAdherent/responsable',
                '/nouvelAdherent/etat-sante',
                '/nouvelAdherent/cotisation',
                '/nouvelAdherent/fin',
            ]
        }

        const currentStep = steps.indexOf(window.location.pathname)
        return currentStep < steps.length - 1 ? steps[currentStep + 1] : '/'
    }

    return (
        <div>
            {console.log(donnees)}
            <RouteProvider>
                <Routes>
                    <Route path="/"
                           element={<RechercheAdherent
                               donneesRecherche={donnees.recherche}
                               onSuivant={handleSuivant} />} />
                    <Route path="adherent"
                           element={<FormulaireAdherent
                               donnees={donnees}
                               onSuivant={handleSuivant} />} />
                    <Route path="responsable"
                           element={<FormulaireResponsable
                               donnees={donnees}
                               onSuivant={handleSuivant} />} />
                    <Route path="etat-sante"
                           element={<FormulaireEtatSante
                               isAdherentMajeur={donnees.isAdherentMajeur}
                               onSuivant={handleSuivant} />} />
                    <Route path="cotisation"
                           element={<FormulaireCotisation
                               donnees={donnees}
                               onSuivant={handleSuivant} />} />
                    <Route path="fin"
                           element={<FormulaireFin
                               donnees={donnees}/>} />
                </Routes>
            </RouteProvider>
        </div>
    )
}

export default GestionnaireFormulairesAdherent
