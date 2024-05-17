import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Accueil from "./components/Accueil"
import GestionnaireFormulairesAdherent from "./components/inscription/GestionnaireFormulairesAdherent"
import VerificationCertificatsMedicals from "./components/VerificationCertificatsMedicals"
import LogoBlanc from "./assets/LogoBlanc"
import './styles/App.scss'
import './styles/globale.scss'

const App = () => {
    return (
        <div>
            <LogoBlanc className="App-logo" width="170" height="69"/>
            <Router>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/nouvel-adherent/*" element={<GestionnaireFormulairesAdherent />} />
                    <Route path="/verification-certificats-medicals" element={<VerificationCertificatsMedicals />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App