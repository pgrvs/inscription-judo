import React, {useEffect, useState} from 'react'
import ConnexionAPI from "../API/ConnexionAPI"
import {Link} from "react-router-dom";

const RechercheAdherent = ({ onSuivant }) => {
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [numeroLicence, setNumeroLicence] = useState('')
    const [resultats, setResultats] = useState([])
    const [loading, setLoading] = useState(false)
    const api = new ConnexionAPI()

    useEffect(() => {
        if (nom || prenom || numeroLicence) {
            rechercheAdherents()
        } else {
            setResultats([])
        }
    }, [nom, prenom, numeroLicence])

    const handleChangeNom = (e) => {
        setNom(e.target.value)
    }

    const handleChangePrenom = (e) => {
        setPrenom(e.target.value)
    }

    const handleChangeNumeroLicence = (e) => {
        setNumeroLicence(e.target.value)
    }

    const rechercheAdherents = async () => {
        setLoading(true)

        let filter = `sqlfilters=(t.nom:like:'%${prenom}% %${nom}%')`

        if (numeroLicence) {
            filter = `sqlfilters=(ef.numroadhrent:like:'${numeroLicence}%')`
        }

        try {
            const response = await api.callAPI(
                'GET',
                'thirdparties',
                filter
            )

            const data = await response.json()
            setResultats(data)
            setLoading(false)

        } catch (error) {
            console.error('Erreur lors de la recherche', error)
            setLoading(false)
        }
    }

    const handleClickSuivant = (adherent) => {
        const recherche = {
            'nom' : nom,
            'prenom' : prenom,
            'numeroLicence' : numeroLicence
        }

        let idAdherent = null

        const convertTimestampToDate = (timestamp) => {
            const date = new Date(timestamp * 1000)
            return date.toISOString().split('T')[0]
        }

        if (adherent){
            idAdherent = adherent.id
            adherent = {
                nom: adherent.name,
                prenom: '',
                dateDeNaissance: convertTimestampToDate(adherent.array_options.options_datedenaissance),
                rue: adherent.address,
                codePostal: adherent.zip,
                ville: adherent.town,
                numeroTelephone: adherent.phone,
                adresseEmail: adherent.email,
                couleurCeinture: adherent.array_options.options_couleurdelaceinture,
                poids: adherent.array_options.options_poidsenkilogramme,
                genre: adherent.array_options.options_genre
            }
        }

        onSuivant({ idAdherent, recherche, adherent })
    }

    return (
        <div>
            <button><Link to="/">Accueil</Link></button>
            <h2>Recherche Adhérent</h2>
            <input
                type="text"
                value={prenom}
                onChange={handleChangePrenom}
                placeholder="Prénom"
            />
            <br/>
            <input
                type="text"
                value={nom}
                onChange={handleChangeNom}
                placeholder="Nom"
            />
            <br/>
            <input
                type="text"
                value={numeroLicence}
                onChange={handleChangeNumeroLicence}
                placeholder="Numero de licence"
            />

            {loading && <p>Recherche en cours...</p>}

            {resultats.length > 0 && (
                <div>
                    <h3>Résultats de la recherche :</h3>
                    <ul>
                        {resultats.map((adherent) => (
                            <li key={adherent.id}>
                                {adherent.name} - {adherent.array_options.options_numroadhrent}
                                <button onClick={() => handleClickSuivant(adherent)}>Sélectionner</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <br/>
            <button onClick={() => handleClickSuivant(null)}>Nouvel Adhérent</button>
        </div>
    )
}

export default RechercheAdherent
