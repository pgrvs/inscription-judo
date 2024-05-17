
const textEmailInscription = (prenom, nom, text) => {
    return `Bienvenue dans notre club de Judo!
    \nNous sommes ravis de vous avoir avec nous.
    \nVotre inscription au nom de ${prenom} ${nom} a bien été enregistré !
    \n\n ${text}
    \n\nLe cercle du Judo`
}

const textEmailCertificatMedical = (prenom, nom) => {
    return`Demande du certificat medical.
    \n${prenom} ${nom} a besoin d'apporter un certificat médical avant la première séance
    \n\nLe cercle du Judo`
}

const textEmailResponsable = (prenom, nom) => {
    return`Informations pour le Responsable de ${prenom} ${nom}
    \nL'inscription a bien été enregistré.
    \n\nLe cercle du Judo`
}

export {
    textEmailInscription,
    textEmailCertificatMedical,
    textEmailResponsable
}