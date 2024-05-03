import moment from 'moment'

const splitName = (fullName) => {
    const words = fullName.trim().split(' ')

    let prenom = ''
    let nom = ''

    words.forEach((word) => {
        if (word === word.toUpperCase()) {
            if (nom) {
                nom += ' ' + word
            } else {
                nom = word
            }
        } else {
            if (prenom) {
                prenom += ' ' + word
            } else {
                prenom = word
            }
        }
    })
    return { prenom, nom }
}


const convertTimestampToDate = (timestamp) => {
    if (timestamp) {
        const date = new Date(timestamp * 1000)
        return date.toISOString().split('T')[0]
    }
}

const capitalize = (string) => {
    if (!string || typeof string !== 'string') {
        return '' // Gérer les cas où l'entrée n'est pas une chaîne ou est vide
    }

    return string
        .split(' ') // Divise la chaîne en mots
        .map((word) => {
            if (word) {
                // Prendre la première lettre et la capitaliser, puis ajouter le reste du mot
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            }
            return '' // Gérer les cas où il y a des espaces supplémentaires
        })
        .join(' ') // Rejoindre les mots capitalisés en une seule chaîne
}

const isAdherentMajeur = (dateDeNaissance) => {
    if (dateDeNaissance) {
        const dateNaissance = new Date(dateDeNaissance)
        const today = new Date()
        const age = today.getFullYear() - dateNaissance.getFullYear()
        return age >= 18
    }
    return false
}

const calculerAge = (birthDate) => {
    const birthMoment = moment(birthDate, 'YYYY-MM-DD')
    return moment().diff(birthMoment, 'years')
}

const informationsRecevoirParMailToString = (informations) => {
    if (!informations || typeof informations !== 'object') {
        return '' // Gérer les cas où l'entrée n'est pas un objet
    }

    // Obtenir les clés et valeurs de l'objet
    const entries = Object.entries(informations)

    // Filtrer les clés avec des valeurs 'true'
    const trueEntries = entries.filter(([key, value]) => value === true)

    // Obtenir les indices des clés filtrées
    const indices = trueEntries.map(([key], index) => entries.indexOf([key, true]) + 1)

    // Transformer les indices en chaîne de caractères séparée par des virgules
    return indices.join(',')
}

const calculeDerniereAnneeLicenciee = (categorieCotisation) => {
    const annee = new Date().getFullYear()

    return annee + '-' + (annee+1) + ' ' + categorieCotisation
}

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
        return 'Le numéro de téléphone est obligatoire'
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
        return 'Le numéro de téléphone doit contenir 10 chiffres'
    }
    return ''
}

const validateEmail = (email) => {
    if (!email) {
        return 'L\'adresse e-mail est obligatoire'
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'L\'adresse e-mail doit être valide'
    }
    return ''
}

const validateCodePostal = (codePostal) => {
    if (!codePostal) {
        return 'Le code postal est obligatoire'
    }
    if (!/[0-9]{5}/.test(codePostal)) {
        return 'Le code postal doit être valide'
    }
    return ''
}

export {
    splitName,
    convertTimestampToDate,
    capitalize,
    isAdherentMajeur,
    calculerAge,
    informationsRecevoirParMailToString,
    calculeDerniereAnneeLicenciee,
    validatePhoneNumber,
    validateEmail,
    validateCodePostal
}