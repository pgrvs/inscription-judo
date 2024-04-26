const convertTimestampToDate = (timestamp) => {
    if (timestamp) {
        const date = new Date(timestamp * 1000)
        return date.toISOString().split('T')[0]
    }
}

const capitalize = (string) => {
    return string.replace(/\b\w/g, (char) => char.toUpperCase())
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
    convertTimestampToDate,
    capitalize,
    isAdherentMajeur,
    validatePhoneNumber,
    validateEmail,
    validateCodePostal
}