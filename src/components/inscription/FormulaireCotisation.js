import React, { useEffect, useState } from 'react'
import { getCategorieLicence } from '../../API/RequetesAPI'
import {calculerAge} from "../../common/utils"
import Navigation from "../Navigation"
import ConfirmationModal from "../ConfiramtionModal"
import BarreEtapes from "./BarreEtapes"
import style from "../../styles/inscription/FormulaireCotisation.module.scss"

const getDefaultCategory = (age, categories) => {
    if (age === 5) return categories.find((cat) => cat.label === 'Moustique')
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
    const [paiement, setPaiement] = useState(donnees.cotisation.paiement ? donnees.cotisation.paiement : null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newCategory, setNewCategory] = useState(null)
    const [loading, setLoading] = useState(false)
    const [erreurs, setErreurs] = useState({
        categorie: '',
        paiement: ''
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const results = await getCategorieLicence()
            setCategories(results)

            const age = calculerAge(donnees.adherent.dateDeNaissance)
            const defaultCategory = getDefaultCategory(age, results)
            setSelectedCategorie(defaultCategory)
        } catch (error) {
            console.error('Erreur lors de la recherche des catégories:', error)
        }
        setLoading(false)
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
        console.log(e.target.name)
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
                lienVersPagePrecedente={'/nouvel-adherent/etat-sante'}
            />
            <div className="container">
                <BarreEtapes isMajeur={donnees.isAdherentMajeur}/>
                <div className={"encadrementPrincipal"}>
                    <div className={"containerForm"}>
                        { loading
                            ? <div className={"loader"}></div>
                            : <>
                                <div id={style.idDivCategorie} >
                                    <label htmlFor="category">{adherentName} est dans la catégorie :</label>
                                    <select
                                        id="category"
                                        name="categorie"
                                        className={style.selectCategorie}
                                        onChange={handleCategoryChange}
                                        value={selectedCategorie ? selectedCategorie.id : ''}
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {erreurs.categorie && <span className={"erreur"}>{erreurs.categorie}</span>}

                                {selectedCategorie && (
                                    <>
                                        <div>
                                            <p className={style.pragrapheCotisation}>Montant de la cotisation
                                                : <span>{parseFloat(selectedCategorie.price).toFixed(2)}</span> €</p>
                                        </div>
                                        <label>Nombre de paiements :</label>
                                        <div className={style.divPaiement}>
                                            <div>
                                                <input type="radio" name="paiement" value="1" checked={paiement === 1}
                                                       onChange={handlePaiementChange}/>
                                                <label>1 fois</label>
                                            </div>
                                            <div>
                                                <input type="radio" name="paiement" value="2" checked={paiement === 2}
                                                       onChange={handlePaiementChange}/>
                                                <label>2 fois</label>
                                            </div>
                                            <div>
                                                <input type="radio" name="paiement" value="3" checked={paiement === 3}
                                                       onChange={handlePaiementChange}/>
                                                <label>3 fois</label>
                                            </div>

                                            {erreurs.paiement && <span className={"erreur"}>{erreurs.paiement}</span>}
                                        </div>
                                    </>
                                )}

                                <button className={"buttonSuivant"} onClick={() => handleClickSuivant(selectedCategorie, paiement)}>
                                    Suivant
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmChange}
                onClose={handleCancelChange}
                message={`Êtes-vous sûr de vouloir changer <span>${adherentName} </span>
                dans la catégorie <span>${categoryLabel}</span> ?`}
            />
        </div>
    )
}

export default FormulaireCotisation
