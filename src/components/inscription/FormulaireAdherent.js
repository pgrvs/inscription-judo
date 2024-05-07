import React, {useContext, useEffect, useState} from 'react'
import {capitalize, isAdherentMajeur, validatePhoneNumber, validateEmail, validateCodePostal} from "../../common/utils"
import Navigation from "../Navigation"
import { RouteContext } from '../RouteProvider'
import BarreEtapes from "./BarreEtapes"

const FormulaireAdherent = ({donnees, onSuivant}) => {
    const [partieAffichee, setPartieAffichee] = useState(1)
    const previousRoute = useContext(RouteContext)
    const [adherentData, setAdherentData] = useState({
        nom: '',
        prenom: '',
        dateDeNaissance: '',
        rue: '',
        codePostal: '',
        ville: '',
        numeroTelephone: '',
        adresseEmail: '',
        couleurCeinture: '',
        poids: '',
        genre: ''
    })
    const [erreurs, setErreurs] = useState({
        nom: '',
        prenom: '',
        dateDeNaissance: '',
        rue: '',
        codePostal: '',
        ville: '',
        numeroTelephone: '',
        adresseEmail: '',
        couleurCeinture: '',
        poids: '',
        genre: '',
        droitImage: null
    })

    useEffect(() => {
        if (previousRoute === '/nouvelAdherent/responsable' || previousRoute === '/nouvelAdherent/etat-sante') {
            setPartieAffichee(4)
        }
    }, [previousRoute]);

    useEffect(() => {
        if (donnees.adherent) {
            setAdherentData({
                nom: donnees.adherent.nom || '',
                prenom: donnees.adherent.prenom || '',
                dateDeNaissance: donnees.adherent.dateDeNaissance || '',
                rue: donnees.adherent.rue || '',
                codePostal: donnees.adherent.codePostal || '',
                ville: donnees.adherent.ville || '',
                numeroTelephone: donnees.adherent.numeroTelephone || '',
                adresseEmail: donnees.adherent.adresseEmail || '',
                couleurCeinture: donnees.adherent.couleurCeinture || '',
                poids: donnees.adherent.poids || '',
                genre: donnees.adherent.genre || '',
                droitImage: donnees.adherent.droitImage
            })
        } else {
            setAdherentData({
                ...adherentData ,
                nom: donnees.recherche.nom,
                prenom: donnees.recherche.prenom
            })
        }
    }, [donnees])

    const handleChangeNom = (e) => {
        const { name, value } = e.target
        const upperCaseNom = value.toUpperCase()
        setAdherentData({ ...adherentData, nom: upperCaseNom })
        if (erreurs[name]) {
            // Efface l'erreur pour ce champ si valide
            setErreurs({ ...erreurs, [name]: '' })
        }
    }

    const handleChangePrenom = (e) => {
        const { name, value } = e.target
        setAdherentData({ ...adherentData, prenom: capitalize(value) })
        if (erreurs[name]) {
            // Efface l'erreur pour ce champ si valide
            setErreurs({ ...erreurs, [name]: '' })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setAdherentData({ ...adherentData, [name]: value })
        if (erreurs[name]) {
            // Efface l'erreur pour ce champ
            setErreurs({ ...erreurs, [name]: '' })
        }
    }

    const afficherPartie = (partie) => {
        if (partie < partieAffichee){
            setPartieAffichee(partie)
        }
        if (validerPartie(partieAffichee)) {
            setPartieAffichee(partie)
        }
    }

    const handleClickSuivant = () => {
        if (validerPartie(partieAffichee)) {
            onSuivant( {adherent: adherentData, isAdherentMajeur: isAdherentMajeur(adherentData.dateDeNaissance)})
        }
    }

    const validerPartie = (partie) => {
        // Vérifications pour chaque champ en fonction de la partie
        const erreurs = {}

        if (partie === 1) {
            if (!adherentData.nom) {
                erreurs.nom = 'Le nom est obligatoire'
            }
            if (!adherentData.prenom) {
                erreurs.prenom = 'Le prénom est obligatoire'
            }
            if (!adherentData.dateDeNaissance) {
                erreurs.dateDeNaissance = 'La date de naissance est obligatoire'
            }
        }

        if (partie === 2) {
            if (!adherentData.rue) {
                erreurs.rue = 'La rue est obligatoire'
            }
            const codePostalError = validateCodePostal(adherentData.codePostal)
            if (codePostalError) {
                erreurs.codePostal = codePostalError
            }
            if (!adherentData.ville) {
                erreurs.ville = 'La ville est obligatoire'
            }
        }

        if (partie === 3) {
            const telephoneError = validatePhoneNumber(adherentData.numeroTelephone)
            if (telephoneError) {
                erreurs.numeroTelephone = telephoneError
            }
            const emailError = validateEmail(adherentData.adresseEmail)
            if (emailError) {
                erreurs.adresseEmail = emailError
            }
        }

        if (partie === 4) {
            if (!adherentData.couleurCeinture) {
                erreurs.couleurCeinture = 'La couleur de ceinture est obligatoire'
            }
            if (!/[0-9]/.test(adherentData.poids)) {
                erreurs.poids = 'Le poids doit être valide'
            }
            if (!adherentData.poids) {
                erreurs.poids = 'Le poids est obligatoire'
            }
            if (!adherentData.genre || adherentData.genre === 'Selectionné un genre') {
                erreurs.genre = 'Le genre est obligatoire'
            }
        }
        setErreurs(erreurs)
        // Renvoie true si pas d'erreurs
        return Object.keys(erreurs).length === 0
    }

    return (
        <div>
            <Navigation
                partieActuelle={partieAffichee}
                afficherPartie={afficherPartie}
                lienVersPagePrecedente={'/nouvelAdherent'}
            />
            <BarreEtapes isMajeur={donnees.isAdherentMajeur}/>
            {partieAffichee === 1 && (
                <fieldset>
                    <legend>Informations personnelles</legend>
                    <label>
                        Nom :
                        <input type="text" name="nom" value={adherentData.nom} onChange={handleChangeNom}/>
                        {erreurs.nom && <span style={{ color: 'red' }}>{erreurs.nom}</span>}
                    </label>
                    <label>
                        Prénom:
                        <input type="text" name="prenom" value={adherentData.prenom} onChange={handleChangePrenom}/>
                        {erreurs.prenom && <span style={{ color: 'red' }}>{erreurs.prenom}</span>}
                    </label>
                    <label>
                        Date de naissance:
                        <input type="date" name="dateDeNaissance" value={adherentData.dateDeNaissance} onChange={handleChange} />
                        {erreurs.dateDeNaissance && <span style={{ color: 'red' }}>{erreurs.dateDeNaissance}</span>}
                    </label>
                    <button type="button" onClick={() => afficherPartie(2)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 2 && (
                <fieldset>
                    <legend>Adresse</legend>
                    <label>
                        Rue:
                        <input type="text" name="rue" value={adherentData.rue} onChange={handleChange} />
                        {erreurs.rue && <span style={{ color: 'red' }}>{erreurs.rue}</span>}
                    </label>
                    <label>
                        Code Postal:
                        <input type="text" name="codePostal" value={adherentData.codePostal} onChange={handleChange} />
                        {erreurs.codePostal && <span style={{ color: 'red' }}>{erreurs.codePostal}</span>}
                    </label>
                    <label>
                        Ville:
                        <input type="text" name="ville" value={adherentData.ville} onChange={handleChange} />
                        {erreurs.ville && <span style={{ color: 'red' }}>{erreurs.ville}</span>}
                    </label>
                    <button type="button" onClick={() => afficherPartie(1)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(3)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 3 && (
                <fieldset>
                    <legend>Coordonnées</legend>
                    <label>
                        Numéro de téléphone:
                        <input type="text" name="numeroTelephone" value={adherentData.numeroTelephone} onChange={handleChange} />
                        {erreurs.numeroTelephone && <span style={{ color: 'red' }}>{erreurs.numeroTelephone}</span>}
                    </label>
                    <label>
                        Adresse email:
                        <input type="email" name="adresseEmail" value={adherentData.adresseEmail} onChange={handleChange} />
                        {erreurs.adresseEmail && <span style={{ color: 'red' }}>{erreurs.adresseEmail}</span>}
                    </label>
                    <button type="button" onClick={() => afficherPartie(2)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(4)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 4 && (
                <fieldset>
                    <legend>Informations supplémentaires</legend>
                    <label>
                        Couleur de ceinture:
                        <input type="text" name="couleurCeinture" value={adherentData.couleurCeinture}
                               onChange={handleChange}/>
                        {erreurs.couleurCeinture && <span style={{ color: 'red' }}>{erreurs.couleurCeinture}</span>}
                    </label>
                    <label>
                        Poids:
                        <input type="text" name="poids" value={adherentData.poids} onChange={handleChange}/>
                        {erreurs.poids && <span style={{ color: 'red' }}>{erreurs.poids}</span>}
                    </label>
                    <label>
                        Genre:
                        <select name="genre" value={adherentData.genre} onChange={handleChange}>
                            <option value={null}>Selectionné un genre</option>
                            <option value="1">Masculin</option>
                            <option value="2">Féminin</option>
                        </select>
                        {erreurs.genre && <span style={{ color: 'red' }}>{erreurs.genre}</span>}
                    </label>
                    <button type="button" onClick={() => afficherPartie(3)}>Précédent</button>
                    <button type="button" onClick={() => handleClickSuivant()}>Enregistrer</button>
                </fieldset>
            )}
        </div>
    )
}

export default FormulaireAdherent
