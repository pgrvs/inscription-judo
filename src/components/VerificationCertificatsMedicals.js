import React, { useState, useEffect } from 'react'
import { getAdherentsByDateInscriptionByCategorie, getCategorieLicence } from "../API/RequetesAPI"
import { useNavigate } from 'react-router-dom'

const VerificationCertificatsMedicals = () => {
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [loadingAdherents, setLoadingAdherents] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const [adherents, setAdherents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (selectedCategorie !== null && selectedCategorie !== '') {
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

    const handleHome = () => {
        navigate('/')
    }

    return (
        <>
            <button onClick={handleHome}>Home</button>
            <div>
                <h2>Vérification des certificats médicaux</h2>
                {loadingCategories ? (
                    <p>Recherche des catégories en cours</p>
                ) : (
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
                    </div>
                )}
                {loadingAdherents ? (
                    <p>Recherche des adhérents en cours</p>
                ) : adherents.length > 0 ? (
                    <table>
                        <tbody>
                        {adherents.map((adherent) => (
                            <tr key={adherent.id}>
                                <td>{adherent.name}</td>
                                <td>{adherent.array_options.options_certificatmdicale === 2 ? 'en attente' : 'valide'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun adhérent trouvé</p>
                )}
            </div>
        </>
    )
}

export default VerificationCertificatsMedicals