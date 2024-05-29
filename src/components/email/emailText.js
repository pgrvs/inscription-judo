const textEmailInscription = (prenom, nom, text) => {
    return `Bienvenue dans notre club de Judo!
    \nNous sommes ravis de vous avoir avec nous.
    \nVotre inscription au nom de ${prenom} ${nom} a bien été enregistré !
    \n\n${text}
    \n\nInformations complémentaires:
    \nAutorisation du droit à l’image
    L’ensemble des photos et vidéos sont susceptibles d’être publiées sur nos réseaux sociaux et
    site internet. Par soucis d’efficacité, merci de signaler auprès du professeur principal votre
    opposition à toutes diffusions de votre image ou à celle de votre enfant.
    Sans ce signalement préalable, le Cercle du Judo de Vesoul considérera pouvoir en bénéficier de
    votre droit à l’image dans ces publications non commerciales.
    \nSituation d’accident sportif               
    Nous nous devons d’assurer la sécurité et l’intégrité physique de nos adhérents et nous
    ne sommes pas en mesure d’évaluer l’état clinique du blessé, en conséquence, le Cercle du Judo
    de Vesoul appellera systématiquement les pompiers en cas d’accident sportif le nécessitant.
    Il ne pourra être tenu responsable en cas d’opposition de votre part. 
    \n\nLe cercle du Judo`
}

const textEmailCertificatMedical = (prenom, nom) => {
    return`Demande du certificat médical.
    \n${prenom} ${nom} a besoin d'apporter un certificat médical avant la première séance.
    \n\nLe cercle du Judo`
}

const textEmailResponsable = (prenom, nom) => {
    return`Informations pour le Responsable de ${prenom} ${nom}
    \nL'inscription a bien été enregistré.
    \n\nInformations complémentaires:
    \nAutorisation du droit à l’image
    L’ensemble des photos et vidéos sont susceptibles d’être publiées sur nos réseaux sociaux et
    site internet. Par soucis d’efficacité, merci de signaler auprès du professeur principal votre
    opposition à toutes diffusions de votre image ou à celle de votre enfant.
    Sans ce signalement préalable, le Cercle du Judo de Vesoul considérera pouvoir en bénéficier de
    votre droit à l’image dans ces publications non commerciales.
    \nSituation d’accident sportif               
    Nous nous devons d’assurer la sécurité et l’intégrité physique de nos adhérents et nous
    ne sommes pas en mesure d’évaluer l’état clinique du blessé, en conséquence, le Cercle du Judo
    de Vesoul appellera systématiquement les pompiers en cas d’accident sportif le nécessitant.
    Il ne pourra être tenu responsable en cas d’opposition de votre part. 
    \n\nLe cercle du Judo`
}

export {
    textEmailInscription,
    textEmailCertificatMedical,
    textEmailResponsable
}