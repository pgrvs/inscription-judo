import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

const FormulaireResponsable = ({ donnees, onSuivant, onPrecedent }) => {
    const [indexResponsableActif, setIndexResponsableActif] = useState(0)
    const [partieAffichee, setPartieAffichee] = useState(1)
    const [responsables, setResponsables] = useState([
        {
            nom: '',
            prenom: '',
            memeAdressePostalAdherent: false,
            rue: '',
            codePostal: '',
            ville: '',
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
        adresseEmail: ''
    })

    const ajouterResponsable = () => {
        const nouveauResponsable = {
            nom: '',
            prenom: '',
            memeAdressePostalAdherent: false,
            rue: '',
            codePostal: '',
            ville: '',
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
        setPartieAffichee(1)
    }

    const responsableActif = responsables[indexResponsableActif]

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target
        const updatedResponsables = [...responsables]
        if (name.includes('factures') || name.includes('legales')  || name.includes('sportives') ) {
            updatedResponsables[indexResponsableActif].informations[name] = checked
        } else if (name.includes('memeAdressePostalAdherent')) {
            updatedResponsables[indexResponsableActif].memeAdressePostalAdherent = checked
            if (updatedResponsables[indexResponsableActif].memeAdressePostalAdherent){
                updatedResponsables[indexResponsableActif].rue = donnees.adherent.rue
                updatedResponsables[indexResponsableActif].codePostal = donnees.adherent.codePostal
                updatedResponsables[indexResponsableActif].ville = donnees.adherent.ville
            }
        } else if (name.includes('numeroTelephone')) {
            const telephoneIndex = parseInt(name.split('_')[1])
            updatedResponsables[indexResponsableActif].numeroTelephone[telephoneIndex] = value
        } else {
            updatedResponsables[indexResponsableActif][name] = value
        }
        setResponsables(updatedResponsables)
        if (erreurs[name]) {
            setErreurs({ ...erreurs, [name]: '' }) // Efface l'erreur pour ce champ si valide
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
        onSuivant({ responsables })
    }

    const validerPartie = (partie) => {
        const erreurs = {}

        if (partie === 1) {
            if (!responsableActif.nom) {
                erreurs.nom = 'Le nom est obligatoire'
            }
            if (!responsableActif.prenom) {
                erreurs.prenom = 'Le prénom est obligatoire'
            }
        }

        if (partie === 2) {
            if (!responsableActif.rue) {
                erreurs.rue = 'La rue est obligatoire'
            }
            if (!/[0-9]{5}/.test(responsableActif.codePostal)) {
                erreurs.codePostal = 'Le code postal doit être valide'
            }
            if (!responsableActif.codePostal) {
                erreurs.codePostal = 'Le code postal est obligatoire'
            }
            if (!responsableActif.ville) {
                erreurs.ville = 'La ville est obligatoire'
            }
        }

        if (partie === 3) {
            if (!/[0-9]{10}/.test(responsableActif.numeroTelephone[0])) {
                erreurs.numeroTelephone1 = 'Le numéro de téléphone doit être valide'
            }
            if (!responsableActif.numeroTelephone[0]) {
                erreurs.numeroTelephone1 = 'Le numéro de téléphone est obligatoire'
            }
            if (responsableActif.numeroTelephone[1]) {
                if (!/[0-9]{10}/.test(responsableActif.numeroTelephone[1])) {
                    erreurs.numeroTelephone2 = 'Le numéro de téléphone doit être valide'
                }
            }
            if (!/\S+@\S+\.\S+/.test(responsableActif.adresseEmail)) {
                erreurs.adresseEmail = 'L\'adresse email doit être valide'
            }
            if (!responsableActif.adresseEmail) {
                erreurs.adresseEmail = 'L\'adresse email est obligatoire'
            }
        }

        setErreurs(erreurs)
        return Object.keys(erreurs).length === 0 // Renvoie true si pas d'erreurs
    }

    return (
        <div>
            <Navigation
                partieActuelle={partieAffichee}
                afficherPartie={afficherPartie}
                lienVersPagePrecedente={'/nouvelAdherent/adherent'}
            />
            {partieAffichee === 1 && (
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
                    <label>
                        <input type="checkbox" name="memeAdressePostalAdherent" checked={responsableActif.memeAdressePostalAdherent}
                               onChange={handleChange}/>
                        Même adresse postal que l'adhérent
                    </label>
                    <button type="button" onClick={() => afficherPartie(2)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 2 && (
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
                    <button type="button" onClick={() => afficherPartie(1)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(3)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 3 && (
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
                    <button type="button" onClick={() => afficherPartie(2)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(4)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 4 && (
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
                    <button type="button" onClick={() => afficherPartie(3)}>Précédent</button>
                    <button type="button" onClick={() => afficherPartie(5)}>Suivant</button>
                </fieldset>
            )}

            {partieAffichee === 5 && (
                <fieldset>
                    <button onClick={ajouterResponsable}>Ajouter un autre responsable</button>
                    <button type="button" onClick={handleSuivant}>Non, passé à la suite</button>
                </fieldset>
            )}
        </div>
    )
}

export default FormulaireResponsable
