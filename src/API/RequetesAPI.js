import ConnexionAPI from "./ConnexionAPI"
import {informationsRecevoirParMailToString, calculeDerniereAnneeLicenciee} from "../common/utils"

const rechercheAdherents = async (prenom, nom, numeroLicence) => {
    const api = new ConnexionAPI()

    let filter = `sqlfilters=(t.nom:like:'%${prenom}%${nom}%')`
    console.log(numeroLicence)
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
        return (data)

    } catch (error) {
        console.error('Erreur lors de la recherche', error)
    }
}

const getResponsablesByIdAdherent = async (idAdherent) => {
    const api = new ConnexionAPI()

    let filter = `sqlfilters=(t.fk_soc:like:'${idAdherent}')`

    try {
        const response = await api.callAPI(
            'GET',
            'contacts',
            filter
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête getResponsablesByIdAdherent :', error)
    }
}

const getCategorieLicence = async () => {
    const api = new ConnexionAPI()

    let filter = `category=2` // 2 représente d'id du tag 'Licence'

    try {
        const response = await api.callAPI(
            'GET',
            'products',
            filter
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête getCategorieLicence :', error)
    }
}

const addAdherent = async (adherentData, etatSante, cotisation) => {
    const api = new ConnexionAPI()

    const certificatmedicale = etatSante ? 1 : 2

    const derniereAnneeLicenciee = calculeDerniereAnneeLicenciee(cotisation.categorie.label)

    const adherent = {
        'name' : adherentData.nom + ' ' + adherentData.prenom,
        'array_options' : {
            'options_datedenaissance' : adherentData.dateDeNaissance,
            'options_couleurdelaceinture' : adherentData.couleurCeinture,
            'options_poidsenkilogramme' : adherentData.poids,
            'options_genre' : adherentData.genre,
            'options_certificatmdicale': certificatmedicale,
            'options_droitimage': true,
            'options_derniereanneelicenciee': derniereAnneeLicenciee,
        },
        'address' : adherentData.rue,
        'zip' : adherentData.codePostal,
        'town' : adherentData.ville,
        'phone' : adherentData.numeroTelephone,
        'email' : adherentData.adresseEmail,
        "client" : "1",
        "code_client" : "-1"
    }

    try {
        const response = await api.callAPI(
            'POST',
            'thirdparties',
            adherent
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête addAdherent :', error)
    }
}

const updateAdherent = async (idAdherent, adherentData, etatSante, cotisation) => {
    const api = new ConnexionAPI()

    const certificatmedicale = etatSante ? 1 : 2

    const derniereAnneeLicenciee = calculeDerniereAnneeLicenciee(cotisation.categorie.label)

    const adherent = {
        'name' : adherentData.nom + ' ' + adherentData.prenom,
        'array_options' : {
            'options_datedenaissance' : adherentData.dateDeNaissance,
            'options_couleurdelaceinture' : adherentData.couleurCeinture,
            'options_poidsenkilogramme' : adherentData.poids,
            'options_genre' : adherentData.genre,
            'options_certificatmdicale': certificatmedicale,
            'options_derniereanneelicenciee': derniereAnneeLicenciee,
        },
        'address' : adherentData.rue,
        'zip' : adherentData.codePostal,
        'town' : adherentData.ville,
        'phone' : adherentData.numeroTelephone,
        'email' : adherentData.adresseEmail,
        "client": "1",
    }

    try {
        const response = await api.callAPI(
            'PUT',
            'thirdparties/' + idAdherent,
            adherent
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête updateAdherent :', error)
    }
}

const addCategorieToAdherent = async (idAdherent) => {
    const api = new ConnexionAPI()

    try {
        const response = await api.callAPI(
            'POST',
            'categories/1/objects/customer/' + idAdherent
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête addCategorieToAdherent :', error)
    }
}

const addResponsableToAdherent = async (idAdherent, responsableData) => {
    const api = new ConnexionAPI()

    const responsable = {
        'lastname' : responsableData.nom,
        'firstname' : responsableData.prenom,
        'array_options' : {
            'options_recevoirparmail' : informationsRecevoirParMailToString(responsableData.informations),
        },
        'address' : responsableData.rue,
        'zip' : responsableData.codePostal,
        'town' : responsableData.ville,
        'phone_perso' : responsableData.numeroTelephone,
        'phone_mobile' : responsableData.numeroTelephone,
        'email' : responsableData.adresseEmail,
        'mail' : responsableData.adresseEmail,
        'socid' : idAdherent
    }

    try {
        const response = await api.callAPI(
            'POST',
            'contacts',
            responsable
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête addResponsableToAdherent :', error)
    }
}

const updateResponsableToAdherent = async (idAdherent, responsableData, idResponsable) => {
    const api = new ConnexionAPI()

    const responsable = {
        'lastname' : responsableData.nom,
        'firstname' : responsableData.prenom,
        'array_options' : {
            'options_recevoirparmail' : informationsRecevoirParMailToString(responsableData.informations),
        },
        'address' : responsableData.rue,
        'zip' : responsableData.codePostal,
        'town' : responsableData.ville,
        'phone_perso' : responsableData.numeroTelephone,
        'phone_mobile' : responsableData.numeroTelephone,
        'email' : responsableData.adresseEmail,
        'mail' : responsableData.adresseEmail,
        'socid' : idAdherent
    }

    try {
        const response = await api.callAPI(
            'POST',
            'contacts/' + idResponsable,
            responsable
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête updateResponsableToAdherent :', error)
    }
}

export {
    rechercheAdherents,
    getResponsablesByIdAdherent,
    getCategorieLicence,
    addAdherent,
    updateAdherent,
    addCategorieToAdherent,
    addResponsableToAdherent,
    updateResponsableToAdherent
}