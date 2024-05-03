import React, { useEffect, useState } from 'react'
import { getCategorieLicence } from '../../API/RequetesAPI'
import {calculerAge} from "../../common/utils"
import Navigation from "../Navigation"
import ConfirmationModal from "../ConfiramtionModal"
import BarreEtapes from "./BarreEtapes"

const getDefaultCategory = (age, categories) => {
    if (age >= 6 && age <= 7) return categories.find((cat) => cat.label === 'Mini-poussins')
    if (age >= 8 && age <= 9) return categories.find((cat) => cat.label === 'Poussins')
    if (age >= 10 && age <= 11) return categories.find((cat) => cat.label === 'Benjamins')
    if (age >= 12 && age <= 14) return categories.find((cat) => cat.label === 'Minimes')
    if (age >= 15 && age <= 17) return categories.find((cat) => cat.label === 'Cadets')
    if (age >= 18 && age <= 20) return categories.find((cat) => cat.label === 'Junior')
    if (age >= 21 && age <= 34) return categories.find((cat) => cat.label === 'Sénior')
    if (age >= 35) return categories.find((cat) => cat.label === 'Vétérans')
    return null
}

const FormulaireCotisation = ({ donnees, onSuivant }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const [paiement, setPaiement] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newCategory, setNewCategory] = useState(null)
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
        setNewCategory(category)
        setIsModalOpen(true)
        if (erreurs[e.target.name]) {
            // Efface l'erreur pour ce champ
            setErreurs({ ...erreurs, [e.target.name]: '' })
        }
    }

    const handleConfirmChange = () => {
        setSelectedCategorie(newCategory)
        setIsModalOpen(false)
    }

    const handleCancelChange = () => {
        setNewCategory(null)
        setIsModalOpen(false)
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
            'categorie' : selectedCategorie,
            'paiement' :paiement,
        }
        if (valider()) {
            onSuivant({cotisation})
        }
    }

    const adherentName = `${donnees.adherent?.prenom ?? ''} ${donnees.adherent?.nom ?? ''}`
    const categoryLabel = newCategory?.label ?? ''

    return (
        <div>
            <Navigation
                partieActuelle={1}
                afficherPartie={1}
                lienVersPagePrecedente={'/nouvelAdherent/etat-sante'}
            />
            <BarreEtapes isMajeur={donnees.isAdherentMajeur}/>
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

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmChange}
                onClose={handleCancelChange}
                message={`Êtes-vous sûr de vouloir changer ${adherentName} 
                dans catégorie ${categoryLabel} ?`}
            />
        </div>
    )
}

export default FormulaireCotisation
