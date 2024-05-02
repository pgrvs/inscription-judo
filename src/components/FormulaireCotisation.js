import React, { useEffect, useState } from 'react'
import { getCategorieLicence } from '../API/RequetesAPI'
import {calculerAge} from "../common/utils"
import Navigation from "./Navigation";

const getDefaultCategory = (age, categories) => {
    if (age >= 6 && age <= 7) {
        return categories.find((cat) => cat.label === 'Mini-poussins')
    } else if (age >= 8 && age <= 9) {
        return categories.find((cat) => cat.label === 'Poussins')
    } else if (age >= 10 && age <= 11) {
        return categories.find((cat) => cat.label === 'Benjamins')
    } else if (age >= 12 && age <= 14) {
        return categories.find((cat) => cat.label === 'Minimes')
    } else if (age >= 15 && age <= 17) {
        return categories.find((cat) => cat.label === 'Cadets')
    } else if (age >= 18 && age <= 20) {
        return categories.find((cat) => cat.label === 'Junior')
    } else if (age >= 21 && age <= 34) {
        return categories.find((cat) => cat.label === 'Senior')
    } else if (age >= 35) {
        return categories.find((cat) => cat.label === 'Veterans')
    }
    return null
}

const FormulaireCotisation = ({ donnees, onSuivant }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const [paiement, setPaiement] = useState(null)
    const [erreurs, setErreurs] = useState({
        categorie: '',
        paiement: ''
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const results = await getCategorieLicence()
            setCategories(results)

            const age = calculerAge(donnees.adherent.dateDeNaissance)
            const defaultCategory = getDefaultCategory(age, results)
            setSelectedCategorie(defaultCategory)
        } catch (error) {
            console.error('Erreur lors de la recherche des catégories:', error)
        }
    }

    const valider = () => {
        const erreurs = {}

        if (!selectedCategorie) {
            erreurs.categorie = 'La catégorie est obligatoire'
        }
        if (!paiement) {
            erreurs.paiement = 'La sélection du nombre de paiement est obligatoire'
        }

        setErreurs(erreurs)
        // Renvoie true si pas d'erreurs
        return Object.keys(erreurs).length === 0
    }

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value
        const category = categories.find((cat) => cat.id === categoryId)
        setSelectedCategorie(category)
        if (erreurs[e.target.name]) {
            // Efface l'erreur pour ce champ
            setErreurs({ ...erreurs, [e.target.name]: '' })
        }
    }

    const handlePaiementChange = (e) => {
        setPaiement(parseInt(e.target.value, 10))
        if (erreurs[e.target.name]) {
            // Efface l'erreur pour ce champ
            setErreurs({ ...erreurs, [e.target.name]: '' })
        }
    }

    const handleClickSuivant = async (selectedCategorie, paiement) => {
        const cotisation ={
            'selectedCategorie' : selectedCategorie,
            'paiement' :paiement,
        }
        if (valider()) {
            onSuivant({cotisation})
        }
    }

    return (
        <div>
            <Navigation
                partieActuelle={1}
                afficherPartie={1}
                lienVersPagePrecedente={'/nouvelAdherent/etat-sante'}
            />
            <h2>Formulaire de Cotisation</h2>
            <div>
                <label htmlFor="category">Catégorie :</label>
                <select
                    id="category"
                    onChange={handleCategoryChange}
                    value={selectedCategorie ? selectedCategorie.id : ''}
                >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.label}
                        </option>
                    ))}
                </select>
                {erreurs.categorie && <span style={{ color: 'red' }}>{erreurs.categorie}</span>}
            </div>

            {selectedCategorie && (
                <>
                    <div>
                        <p>Montant de la cotisation : {parseFloat(selectedCategorie.price).toFixed(2)} €</p>
                    </div>
                    <div>
                        <label>Nombre de paiements :</label>
                        <label>
                            <input type="radio" name="paiement" value="1" checked={paiement === 1} onChange={handlePaiementChange}/>
                            1 fois
                        </label>
                        <label>
                            <input type="radio" name="paiement" value="2" checked={paiement === 2} onChange={handlePaiementChange}/>
                            2 fois
                        </label>
                        <label>
                            <input type="radio" name="paiement" value="3" checked={paiement === 3} onChange={handlePaiementChange}/>
                            3 fois
                        </label>
                        {erreurs.paiement && <span style={{ color: 'red' }}>{erreurs.paiement}</span>}
                    </div>
                </>
            )}

            <button onClick={() => handleClickSuivant(selectedCategorie, paiement)}>
                Suivant
            </button>
        </div>
    )
}

export default FormulaireCotisation
