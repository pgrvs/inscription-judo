import React, {useEffect, useState} from 'react'
import {capitalize, validatePhoneNumber, validateEmail, validateCodePostal} from "../common/utils"
import Navigation from './Navigation'
import GestionnaireResponsables from "./GestionnaireResponsables"

const FormulaireResponsable = ({ donnees, onSuivant }) => {
    const [indexResponsableActif, setIndexResponsableActif] = useState(0)
    const [partieAffichee, setPartieAffichee] = useState(1)
    const [responsables, setResponsables] = useState([
        {
            nom: '',
            prenom: '',
            rue: donnees.adherent.rue,
            codePostal: donnees.adherent.codePostal,
            ville: donnees.adherent.ville,
            numeroTelephone: ['', ''],
            adresseEmail: '',
            informations: {
                factures: false,
                legales: false,
                sportives: false,
            },
        },
    ])

    const [erreurs, setErreurs] = useState({
        nom: '',
        prenom: '',
        rue: '',
        codePostal: '',
        ville: '',
        numeroTelephone1: '',
        numeroTelephone2: '',
        adresseEmail: '',
        responsable: ''
    })

    useEffect(() => {
        if(donnees.idAdherent){
            setResponsables(donnees.responsables)
        }
    }, [donnees.idAdherent, donnees.responsables])

    const ajouterResponsable = () => {
        const nouveauResponsable = {
            nom: '',
            prenom: '',
            rue: donnees.adherent.rue,
            codePostal: donnees.adherent.codePostal,
            ville: donnees.adherent.ville,
            numeroTelephone: ['', ''],
            adresseEmail: '',
            informations: {
                factures: false,
                legales: false,
                sportives: false,
            },
        }
        setResponsables([...responsables, nouveauResponsable])
        setIndexResponsableActif(responsables.length)
        setPartieAffichee(2)
    }

    const formGestionnaireResponsbale = (index) => {
        setIndexResponsableActif(index)
        setPartieAffichee(2)
    }

    const responsableActif = responsables[indexResponsableActif]

    const handleChange = (e) => {
        const { name, value, checked } = e.target
        const updatedResponsables = [...responsables]
        if (name.includes('factures') || name.includes('legales')  || name.includes('sportives') ) {
            updatedResponsables[indexResponsableActif].informations[name] = checked
        }
        else if (name.includes('numeroTelephone')) {
            const telephoneIndex = parseInt(name.split('_')[1])
            updatedResponsables[indexResponsableActif].numeroTelephone[telephoneIndex] = value
        }
        else if (name.includes('prenom')) {
            updatedResponsables[indexResponsableActif].prenom = capitalize(e.target.value)
        }
        else if (name.includes('nom')) {
            updatedResponsables[indexResponsableActif].nom = e.target.value.toUpperCase()
        }
        else {
            updatedResponsables[indexResponsableActif][name] = value
        }
        setResponsables(updatedResponsables)
        if (erreurs[name]) {
            // Efface l'erreur pour ce champ si valide
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

    const handleSuivant = () => {
        if (validerPartie(1)){
            onSuivant({ responsables })
        }
    }

    const validerPartie = (partie) => {
        const erreurs = {}

        if (partie === 1) {
            if(responsables.length < 1 || !responsables[0].nom){
                erreurs.responsable = 'Il faut avoir un responsable au minimun'
            }
        }

        if (partie === 2) {
            if (!responsableActif.nom) {
                erreurs.nom = 'Le nom est obligatoire'
            }
            if (!responsableActif.prenom) {
                erreurs.prenom = 'Le prénom est obligatoire'
            }
        }

        if (partie === 3) {
            if (!responsableActif.rue) {
                erreurs.rue = 'La rue est obligatoire'
            }
            const codePostalError = validateCodePostal(responsableActif.codePostal)
            if (codePostalError) {
                erreurs.codePostal = codePostalError
            }
            if (!responsableActif.ville) {
                erreurs.ville = 'La ville est obligatoire'
            }
        }

        if (partie === 4) {
            const numeroTelephoneError = validatePhoneNumber(responsableActif.numeroTelephone[0])
            if (numeroTelephoneError) {
                erreurs.numeroTelephone1 = numeroTelephoneError
            }
            if (responsableActif.numeroTelephone[1]) {
                if (!/[0-9]{10}/.test(responsableActif.numeroTelephone[1])) {
                    erreurs.numeroTelephone2 = 'Le numéro de téléphone doit être valide'
                }
            }
            const emailError = validateEmail(responsableActif.adresseEmail)
            if (emailError) {
                erreurs.adresseEmail = emailError
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
                lienVersPagePrecedente={'/nouvelAdherent/adherent/4'}
            />
            {partieAffichee === 1 && (
                <>
                    <GestionnaireResponsables responsables={responsables} indexResponsbale={formGestionnaireResponsbale}/>
                    <button onClick={ajouterResponsable}>Ajouter un responsable</button>
                    <button type="button" onClick={handleSuivant}>Non, passé à la suite</button>
                    {erreurs.responsable && <span style={{ color: 'red' }}>{erreurs.responsable}</span>}
                </>
            )}
            {partieAffichee === 2 && (
                <fieldset>
                    <legend>Responsable #{indexResponsableActif + 1}</legend>
                    <label>
                        Nom:
                        <input type="text" name="nom" value={responsableActif.nom} onChange={handleChange}/>
                        {erreurs.nom && <span style={{ color: 'red' }}>{erreurs.nom}</span>}
                    </label>
                    <label>
                        Prénom:
                        <input type="text" name="prenom" value={responsableActif.prenom} onChange={handleChange}/>
                        {erreurs.prenom && <span style={{ color: 'red' }}>{erreurs.prenom}</span>}
                    </label>
                    <button type="button" onClick={() => afficherPartie(3)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 3 && (
                <fieldset>
                    <label>
                        Rue:
                        <input type="text" name="rue" value={responsableActif.rue} onChange={handleChange}/>
                        {erreurs.rue && <span style={{ color: 'red' }}>{erreurs.rue}</span>}
                    </label>
                    <label>
                        Code Postal:
                        <input type="text" name="codePostal" value={responsableActif.codePostal}
                               onChange={handleChange}/>
                        {erreurs.codePostal && <span style={{ color: 'red' }}>{erreurs.codePostal}</span>}
                    </label>
                    <label>
                        Ville:
                        <input type="text" name="ville" onChange={handleChange} value={responsableActif.ville}/>
                        {erreurs.ville && <span style={{ color: 'red' }}>{erreurs.ville}</span>}
                    </label>
                    <button type="button" onClick={() => afficherPartie(2)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(4)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 4 && (
                <fieldset>
                    <label>
                        Téléphone 1:
                        <input type="text" name="numeroTelephone_0" value={responsableActif.numeroTelephone[0]}
                               onChange={handleChange}/>
                        {erreurs.numeroTelephone1 && <span style={{ color: 'red' }}>{erreurs.numeroTelephone1}</span>}
                    </label>
                    <label>
                        Téléphone 2:
                        <input type="text" name="numeroTelephone_1" value={responsableActif.numeroTelephone[1]}
                               onChange={handleChange}/>
                        {erreurs.numeroTelephone2 && <span style={{ color: 'red' }}>{erreurs.numeroTelephone2}</span>}
                    </label>
                    <label>
                        Adresse email:
                        <input type="email" name="adresseEmail" value={responsableActif.adresseEmail}
                               onChange={handleChange}/>
                        {erreurs.adresseEmail && <span style={{color: 'red'}}>{erreurs.adresseEmail}</span>}
                    </label>
                    <button type="button" onClick={() => afficherPartie(3)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(5)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 5 && (
                <fieldset>
                    <label>
                        Informations à envoyer par email:
                        <br/>
                        <input type="checkbox" name="factures" checked={responsableActif.informations.factures}
                               onChange={handleChange}/>
                        Factures
                    </label>
                        <br/>
                    <label>
                        <input type="checkbox" name="legales" checked={responsableActif.informations.legales}
                               onChange={handleChange}/>
                        Informations légales
                        <br/>
                    </label>
                    <label>
                        <input type="checkbox" name="sportives" checked={responsableActif.informations.sportives}
                               onChange={handleChange}/>
                        Informations sportives
                    </label>
                    <br/>
                    <button type="button" onClick={() => afficherPartie(4)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(1)}>Suivant</button>
                </fieldset>
            )}
        </div>
    )
}

export default FormulaireResponsable
