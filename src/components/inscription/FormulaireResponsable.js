import React, {useEffect, useState} from 'react'
import {capitalize, validatePhoneNumber, validateEmail, validateCodePostal} from "../../common/utils"
import Navigation from '../Navigation'
import GestionnaireResponsables from "./GestionnaireResponsables"
import BarreEtapes from "./BarreEtapes"
import Cleave from "cleave.js/react"
import style from "../../styles/inscription/FormulaireResponsable.module.scss"
import AjoutAdherent from "../../assets/AjoutAdherent";

const FormulaireResponsable = ({ donnees, onSuivant }) => {
    const [indexResponsableActif, setIndexResponsableActif] = useState(0)
    const [partieAffichee, setPartieAffichee] = useState(1)
    const [responsables, setResponsables] = useState(donnees.responsables)

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
            const numTelephoneSansEspace = value.replace(/ /g, "")
            updatedResponsables[indexResponsableActif].numeroTelephone[telephoneIndex] = numTelephoneSansEspace
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
                lienVersPagePrecedente={'/nouvel-adherent/adherent'}
            />
            <div className="container">
                <div>
                    <BarreEtapes isMajeur={donnees.isAdherentMajeur}/>
                    <div className={"encadrementPrincipal"}>
                        {partieAffichee === 1 && (
                            <>
                                <h2>{donnees.responsables.length > 1 ? 'Responsables' : 'Responsable'} de {donnees.adherent.prenom} :</h2>
                                <GestionnaireResponsables responsables={responsables} indexResponsbale={formGestionnaireResponsbale}/>
                                {erreurs.responsable && <span className={"erreur"}>{erreurs.responsable}</span>}
                                <div className={style.buttonResponsable}>
                                    <button className={"buttonNoir"} onClick={ajouterResponsable}>
                                        <AjoutAdherent className={"iconeAjout"} alt="Ajout adherent"/>
                                        <p>Créer un nouveau responsable</p>
                                    </button>
                                    <button className={"buttonNoir"} type="button" onClick={handleSuivant}>
                                        <p>Passer à la suite</p>
                                    </button>
                                </div>
                            </>
                        )}
                        <div className={"containerForm"}>
                            {partieAffichee === 2 && (
                                <>
                                    <legend>Responsable n°{indexResponsableActif + 1}</legend>
                                    <label>Nom </label>
                                        <input type="text" name="nom" value={responsableActif.nom} onChange={handleChange}/>
                                        {erreurs.nom && <span className={"erreur"}>{erreurs.nom}</span>}
                                    <label>Prénom :</label>
                                    <input type="text" name="prenom" value={responsableActif.prenom} onChange={handleChange}/>
                                    {erreurs.prenom && <span className={"erreur"}>{erreurs.prenom}</span>}

                                    <button className={"buttonSuivant"} type="button" onClick={() => afficherPartie(3)}>Suivant</button>
                                </>
                            )}

                            {partieAffichee === 3 && (
                                <>
                                    <label>Rue :</label>
                                    <input type="text" name="rue" value={responsableActif.rue} onChange={handleChange}/>
                                    {erreurs.rue && <span className={"erreur"}>{erreurs.rue}</span>}
                                    <label>Code Postal :</label>
                                    <input type="text" name="codePostal" value={responsableActif.codePostal} onChange={handleChange}/>
                                    {erreurs.codePostal && <span className={"erreur"}>{erreurs.codePostal}</span>}
                                    <label>Ville :</label>
                                    <input type="text" name="ville" onChange={handleChange} value={responsableActif.ville}/>
                                    {erreurs.ville && <span className={"erreur"}>{erreurs.ville}</span>}

                                    <button className={"buttonSuivant"} type="button" onClick={() => afficherPartie(4)}>Suivant</button>
                                </>
                            )}

                            {partieAffichee === 4 && (
                                <>
                                    <label>Téléphone 1 :</label>
                                    <Cleave
                                        placeholder="09 08 76 54 32"
                                        options={{
                                            blocks: [2, 2, 2, 2, 2],
                                            delimiter: " ",
                                        }}
                                        onChange={handleChange}
                                        className="form-field"
                                        name="numeroTelephone_0"
                                        value={responsableActif.numeroTelephone[0]}
                                    />
                                    {/*<input type="text" name="numeroTelephone_0" value={responsableActif.numeroTelephone[0]}
                           onChange={handleChange}/>*/}
                                    {erreurs.numeroTelephone1 && <span className={"erreur"}>{erreurs.numeroTelephone1}</span>}

                                    <label>Téléphone 2 :</label>
                                    <Cleave
                                        placeholder="09 08 76 54 32"
                                        options={{
                                            blocks: [2, 2, 2, 2, 2],
                                            delimiter: " ",
                                        }}
                                        onChange={handleChange}
                                        className="form-field"
                                        name="numeroTelephone_1"
                                        value={responsableActif.numeroTelephone[1]}
                                    />
                                    {/*<input type="text" name="numeroTelephone_1" value={responsableActif.numeroTelephone[1]}
                           onChange={handleChange}/>*/}
                                    {erreurs.numeroTelephone2 && <span className={"erreur"}>{erreurs.numeroTelephone2}</span>}
                                    <label>Adresse email :</label>
                                    <input type="email" name="adresseEmail" value={responsableActif.adresseEmail} onChange={handleChange}/>
                                    {erreurs.adresseEmail && <span className={"erreur"}>{erreurs.adresseEmail}</span>}

                                    <button className={"buttonSuivant"} type="button" onClick={() => afficherPartie(5)}>Suivant</button>
                                </>
                            )}

                            {partieAffichee === 5 && (
                                <>
                                    <legend>Informations à envoyer par email :</legend>
                                    <div className={style.divCheckbox}>
                                        <input type="checkbox" name="factures"
                                               checked={responsableActif.informations.factures}
                                               onChange={handleChange}/>
                                        <label>Factures</label>
                                    </div>
                                    <div className={style.divCheckbox}>
                                        <input type="checkbox" name="legales"
                                               checked={responsableActif.informations.legales} onChange={handleChange}/>
                                        <label>Informations légales</label>
                                    </div>
                                    <div className={style.divCheckbox}>
                                        <input type="checkbox" name="sportives"
                                               checked={responsableActif.informations.sportives}
                                               onChange={handleChange}/>
                                        <label>Informations sportives</label>
                                    </div>

                                    <button className={"buttonSuivant"} type="button" onClick={() => afficherPartie(1)}>
                                        Suivant
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormulaireResponsable
