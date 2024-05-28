import React, {useContext, useEffect, useState} from 'react'
import {capitalize, isAdherentMajeur, validatePhoneNumber, validateEmail, validateCodePostal} from "../../common/utils"
import Navigation from "../Navigation"
import { RouteContext } from '../RouteProvider'
import BarreEtapes from "./BarreEtapes"
import ButtonSuivant from '../ButtonSuivant'
import Cleave from "cleave.js/react"
import style from "../../styles/inscription/FormulaireAdherent.module.scss"

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
        if (previousRoute === '/nouvel-adherent/responsable' || previousRoute === '/nouvel-adherent/etat-sante') {
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
                droitImage: donnees.adherent.droitImage,
                numroAdhrent : donnees.adherent.numroAdhrent
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

    const onCodePostalChange = (e) =>{
        const { name, value } = e.target
        const codePostalSansEspace = value.replace(/ /g, "")
        setAdherentData({ ...adherentData, codePostal: codePostalSansEspace })
        if (erreurs[name]) {
            // Efface l'erreur pour ce champ si valide
            setErreurs({ ...erreurs, [name]: '' })
        }
    }

    const onPhoneChange = (e) => {
        const { name, value } = e.target
        const numTelephoneSansEspace = value.replace(/ /g, "")
        setAdherentData({ ...adherentData, numeroTelephone: numTelephoneSansEspace })
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
                lienVersPagePrecedente={'/nouvel-adherent'}
            />
            <div className="container">
                <div>
                    <BarreEtapes isMajeur={donnees.isAdherentMajeur}/>
                    <div className={"encadrementPrincipal"}>
                        <div className={"containerForm"}>
                            {partieAffichee === 1 && (
                                <>
                                    <legend>Informations personnelles</legend>
                                    <label>Nom :</label>
                                    <input type="text" name="nom" value={adherentData.nom} onChange={handleChangeNom} placeholder={"Entrer le nom"}/>
                                    {erreurs.nom && <span className={"erreur"}>{erreurs.nom}</span>}

                                    <label>Prénom :</label>
                                    <input type="text" name="prenom" value={adherentData.prenom} onChange={handleChangePrenom} placeholder={"Entrer le prénom"}/>
                                    {erreurs.prenom && <span className={"erreur"}>{erreurs.prenom}</span>}

                                    <label>Date de naissance :</label>
                                    <input type="date" name="dateDeNaissance" value={adherentData.dateDeNaissance} onChange={handleChange}/>
                                    {erreurs.dateDeNaissance && <span className={"erreur"}>{erreurs.dateDeNaissance}</span>}

                                    <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(2)} />
                                </>
                            )}

                            {partieAffichee === 2 && (
                                <>
                                    <legend>Adresse</legend>
                                    <label>Rue :</label>
                                    <input type="text" name="rue" value={adherentData.rue} onChange={handleChange} placeholder={"Entrer le n° et la nom de rue"}/>
                                    {erreurs.rue && <span className={"erreur"}>{erreurs.rue}</span>}

                                    <label>Code Postal :</label>
                                    <Cleave
                                        placeholder="Entrer le code postal"
                                        options={{
                                            blocks: [2, 3],
                                            delimiter: " ",
                                        }}
                                        onChange={onCodePostalChange}
                                        className="form-field"
                                        name="codePostal"
                                        value={adherentData.codePostal}
                                    />
                                    {erreurs.codePostal && <span className={"erreur"}>{erreurs.codePostal}</span>}

                                    <label>Ville :</label>
                                    <input type="text" name="ville" value={adherentData.ville} onChange={handleChange} placeholder={"Entrer la Ville"}/>
                                    {erreurs.ville && <span className={"erreur"}>{erreurs.ville}</span>}

                                    <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(3)} />
                                </>
                            )}

                            {partieAffichee === 3 && (
                                <>
                                    <legend>Coordonnées</legend>
                                    <label>Numéro de téléphone :</label>
                                    <Cleave
                                        placeholder="06 00 00 00 00"
                                        options={{
                                            blocks: [2, 2, 2, 2, 2],
                                            delimiter: " ",
                                        }}
                                        onChange={onPhoneChange}
                                        className="form-field"
                                        name="numeroTelephone"
                                        value={adherentData.numeroTelephone}
                                    />
                                    {erreurs.numeroTelephone && <span className={"erreur"}>{erreurs.numeroTelephone}</span>}

                                    <label>Adresse email :</label>
                                    <input type="email" name="adresseEmail" value={adherentData.adresseEmail} onChange={handleChange} placeholder={"exemple@email.com"}/>
                                    {erreurs.adresseEmail && <span className={"erreur"}>{erreurs.adresseEmail}</span>}

                                    <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(4)} />
                                </>
                            )}

                            {partieAffichee === 4 && (
                                <>
                                    <legend>Informations supplémentaires</legend>
                                    <label>Couleur de ceinture :</label>
                                    <input type="text" name="couleurCeinture" value={adherentData.couleurCeinture} onChange={handleChange} placeholder={"Entrer la couleur de la ceinture actuelle"}/>
                                    {erreurs.couleurCeinture && <span className={"erreur"}>{erreurs.couleurCeinture}</span>}

                                    <label>Poids :</label>
                                    <div className={style.divPoids}>
                                        <input type="text" name="poids" value={adherentData.poids} onChange={handleChange} placeholder={"Entrer le poids en kilogrammes"}/>
                                        <p>Kg</p>
                                    </div>
                                    {erreurs.poids && <span className={"erreur"}>{erreurs.poids}</span>}
                                    <label>Genre:</label>
                                    <div className={style.divGenre}>
                                        <div className={"divInputRadio"}>
                                            <input
                                                className={"inputRadio"}
                                                type="radio"
                                                id="masculin"
                                                name="genre"
                                                value="1"
                                                checked={adherentData.genre === "1"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="masculin">Masculin</label>
                                        </div>
                                        <div className={"divInputRadio"}>
                                            <input
                                                className={"inputRadio"}
                                                type="radio"
                                                id="feminin"
                                                name="genre"
                                                value="2"
                                                checked={adherentData.genre === "2"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="feminin">Féminin</label>
                                        </div>
                                    </div>

                                    {erreurs.genre && <span className={"erreur"}>{erreurs.genre}</span>}

                                    <ButtonSuivant text={"Suivant"} onClick={() => handleClickSuivant()} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormulaireAdherent
