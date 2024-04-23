import React, { useState } from 'react'
import RechercheAdherent from './RechercheAdherent'
import FormulaireAdherent from './FormulaireAdherent'
import FormulaireResponsable from './FormulaireResponsable'
import FormulaireEtatSante from './FormulaireEtatSante'
import FormulaireCotisation from './FormulaireCotisation'
import FormulaireFin from './FormulaireFin'

const GestionnaireFormulairesAdherent = () => {
    const [etape, setEtape] = useState(1)
    const [donnees, setDonnees] = useState({
        idAdherent : null, // Permet de savoir si l'adhérent est récupéré du Dolibarr
        recherche: {},
        adherent: {},
        responsable: {},
        etatSante: {},
        cotisation: {},
        fin: {}
    })

    const handleSuivant = (data) => {
        setDonnees({ ...donnees, ...data })
        setEtape(etape + 1)
    }

    const handlePrecedent = () => {
        setEtape(etape - 1)
    }

    const renderFormulaire = () => {
        console.log(donnees)
        switch (etape) {
            case 1:
                return <RechercheAdherent onSuivant={handleSuivant} />
            case 2:
                return <FormulaireAdherent
                    donnees = {donnees}
                    onSuivant={handleSuivant}
                    onPrecedent={handlePrecedent} />
            case 3:
                return <FormulaireResponsable onSuivant={handleSuivant} onPrecedent={handlePrecedent} />
            case 4:
                return <FormulaireEtatSante onSuivant={handleSuivant} onPrecedent={handlePrecedent} />
            case 5:
                return <FormulaireCotisation onSuivant={handleSuivant} onPrecedent={handlePrecedent} />
            case 6:
                return <FormulaireFin donnees={donnees} onPrecedent={handlePrecedent} />
            default:
                return null;
        }
    };

    return (
        <div>
            {renderFormulaire()}
        </div>
    );
}

export default GestionnaireFormulairesAdherent
