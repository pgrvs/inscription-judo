import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Accueil from "./components/Accueil"
import GestionnaireFormulairesAdherent from "./components/inscription/GestionnaireFormulairesAdherent"
import VerificationCertificatsMedicals from "./components/VerificationCertificatsMedicals"
import PageNotFound from "./components/PageNotFound"
import ErreurEmail from "./components/ErreurEmail"
import LogoBlanc from "./assets/LogoBlanc"
import styleApp from './styles/App.module.scss'
import './styles/globale.scss'
import './styles/modules/_colors.scss'
import './styles/modules/_fonts.scss'

const App = () => {
    return (
        <div>
            <LogoBlanc className={styleApp.AppLogo} width="170" height="69"/>
            <Router>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/nouvel-adherent/*" element={<GestionnaireFormulairesAdherent />} />
                    <Route path="/verification-certificats-medicals" element={<VerificationCertificatsMedicals />} />
                    <Route path="/erreur-email" element={<ErreurEmail />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App