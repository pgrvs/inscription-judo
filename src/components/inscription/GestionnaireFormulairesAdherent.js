import {useState} from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'
import RechercheAdherent from './RechercheAdherent'
import FormulaireAdherent from './FormulaireAdherent'
import FormulaireResponsable from './FormulaireResponsable'
import FormulaireEtatSante from './FormulaireEtatSante'
import FormulaireCotisation from './FormulaireCotisation'
import FormulaireFin from './FormulaireFin'
import RouteProvider from '../RouteProvider'
import PageNotFound from "../PageNotFound";

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
                '/nouvel-adherent',
                '/nouvel-adherent/adherent',
                '/nouvel-adherent/etat-sante',
                '/nouvel-adherent/cotisation',
                '/nouvel-adherent/fin',
            ]
        } else {
            steps = [
                '/nouvel-adherent',
                '/nouvel-adherent/adherent',
                '/nouvel-adherent/responsable',
                '/nouvel-adherent/etat-sante',
                '/nouvel-adherent/cotisation',
                '/nouvel-adherent/fin',
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
                    <Route path="*" element={<PageNotFound/>} />
                </Routes>
            </RouteProvider>
        </div>
    )
}

export default GestionnaireFormulairesAdherent
