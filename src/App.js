import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ExampleComponent from './components/ExampleComponent'
import Accueil from "./components/Accueil"
import GestionnaireFormulairesAdherent from "./components/GestionnaireFormulairesAdherent"

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/nouvelAdherent/*" element={<GestionnaireFormulairesAdherent />} />
                    <Route path="/example" element={<ExampleComponent />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App