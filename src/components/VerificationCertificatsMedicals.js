import React, { useState, useEffect } from 'react'
import { getAdherentsByDateInscriptionByCategorie, getCategorieLicence } from "../API/RequetesAPI"
import NavigationAccueil from "./NavigationAccueil"
import style from "./../styles/VerificationCertificatsMedicals.module.scss"

const VerificationCertificatsMedicals = () => {
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [loadingAdherents, setLoadingAdherents] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const [adherents, setAdherents] = useState([])

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (selectedCategorie !== null && selectedCategorie !== undefined) {
            fetchAdherents()
        }
    }, [selectedCategorie])

    const fetchCategories = async () => {
        setLoadingCategories(true)
        try {
            const results = await getCategorieLicence()
            setCategories(results)
        } catch (error) {
            console.error('Erreur lors de la recherche des catégories:', error)
        }
        setLoadingCategories(false)
    }

    const fetchAdherents = async () => {
        setLoadingAdherents(true)
        try {
            const results = await getAdherentsByDateInscriptionByCategorie(selectedCategorie)
            setAdherents(results)
        } catch (error) {
            console.error('Erreur lors de la recherche des adhérents:', error)
        }
        setLoadingAdherents(false)
    }

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value
        const category = categories.find((cat) => cat.id === categoryId)
        setSelectedCategorie(category)
    }

    return (
        <>
            <NavigationAccueil/>
            <div className="container">
                <h1>Vérification des certificats médicaux</h1>
                <div className={style.containerVerifCertificat}>
                    {loadingCategories ? (
                        <div className={"loader"}></div>
                    ) : (
                        <div className={style.divLabelSelect}>
                            <label htmlFor="category">Choisir la catégorie :</label>
                            <select
                                id="category"
                                className={"selectCategorie"}
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
                    )}
                    {loadingAdherents ? (
                        <>
                            <div className={"loader"}></div>
                            <p>Recherche des adhérents en cours</p>
                        </>
                    ) : adherents.length > 0 ? (
                        <table>
                        <thead>
                            <tr>
                                <th scope="col">Nom Prenom</th>
                                <th scope="col">Statut</th>
                            </tr>
                            </thead>
                            <tbody>
                            {adherents.map((adherent) => (
                                <tr key={adherent.id}>
                                    <td>{adherent.name}</td>
                                    <td>
                                        <span className={adherent.array_options.options_certificatmdicale === '2' ? style.pastilleOrange : style.pastilleVerte}></span>
                                        {adherent.array_options.options_certificatmdicale === '2' ? 'En attente' : 'Valide'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (adherents.length === undefined && selectedCategorie !== null && selectedCategorie !== undefined) ? (
                        <p>Aucun adhérent n'a besoin d'un certificat médical</p>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    )
}

export default VerificationCertificatsMedicals