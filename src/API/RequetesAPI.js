import ConnexionAPI from "./ConnexionAPI"
import {
    informationsRecevoirParMailToString,
    calculeAnneeLicenciee, calculeDerniereAnneeLicenciee, categoryForDolibarr
} from "../common/utils"

const rechercheAdherents = async (prenom, nom, numeroLicence) => {
    const api = new ConnexionAPI()

    let filter = `sqlfilters=(t.nom:like:'%25${nom}%25${prenom}%25')`

    if (numeroLicence) {
        filter = `sqlfilters=(ef.numroadhrent:like:'${numeroLicence}%25')`
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

    const certificatmedicale = etatSante ? 2 : 1

    const adherent = {
        'name' : adherentData.nom + ' ' + adherentData.prenom,
        'array_options' : {
            'options_datedenaissance' : adherentData.dateDeNaissance,
            'options_couleurdelaceinture' : adherentData.couleurCeinture,
            'options_poidsenkilogramme' : adherentData.poids,
            'options_genre' : adherentData.genre,
            'options_certificatmdicale' : certificatmedicale,
            'options_droitimage' : true,
            'options_derniereanneelicenciee' : calculeAnneeLicenciee(),
            'options_datedinscription' : new Date(),
            'options_categorie': categoryForDolibarr(cotisation.categorie.label)
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

    const certificatmedicale = etatSante ? 2 : 1
    const droitImage = adherentData.droitImage ? true : false

    const adherent = {
        'name' : adherentData.nom + ' ' + adherentData.prenom,
        'array_options' : {
            'options_datedenaissance' : adherentData.dateDeNaissance,
            'options_couleurdelaceinture' : adherentData.couleurCeinture,
            'options_poidsenkilogramme' : adherentData.poids,
            'options_genre' : adherentData.genre,
            'options_certificatmdicale' : certificatmedicale,
            'options_droitimage' : droitImage,
            'options_derniereanneelicenciee' : calculeAnneeLicenciee(),
            'options_datedinscription' : new Date(),
            'options_categorie': categoryForDolibarr(cotisation.categorie.label)
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
        'phone_perso' : responsableData.numeroTelephone[0],
        'phone_mobile' : responsableData.numeroTelephone[1],
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

const updateResponsableToAdherent = async (idAdherent, responsableData) => {
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
        'phone_perso' : responsableData.numeroTelephone[0],
        'phone_mobile' : responsableData.numeroTelephone[1],
        'email' : responsableData.adresseEmail,
        'mail' : responsableData.adresseEmail,
        'socid' : idAdherent
    }

    try {
        const response = await api.callAPI(
            'PUT',
            'contacts/' + responsableData.id,
            responsable
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête updateResponsableToAdherent :', error)
    }
}

const createFacture = async (idAdherent, cotisation) => {
    const api = new ConnexionAPI()

    let description = cotisation.categorie.description + ' ' + calculeAnneeLicenciee() + "<br/>"
        + 'Paiement en ' + cotisation.paiement + ' fois'

    const facture = {
        "socid" : idAdherent,
        "date_lim_reglement" : new Date(),
        "lines" : [
            {
                "ref" : cotisation.categorie.ref,
                "desc" : description,
                "product_ref" : cotisation.categorie.ref,
                "fk_produit" : cotisation.categorie.id,
                "tva_tx" : cotisation.categorie.tva_tx,
                "subprice" : cotisation.categorie.price_ttc,
                "qty" : "1"
            }
        ],
        "array_options": {
            "options_combiendepaiement": cotisation.paiement
        },
    }

    try {
        const response = await api.callAPI(
            'POST',
            'invoices',
            facture
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête createFacture :', error)
    }
}

const validateFacture = async (idFacture) => {
    const api = new ConnexionAPI()

    const tierParam = {'notrigger' : 0}

    try {
        const response = await api.callAPI(
            'POST',
            'invoices/' + idFacture + '/validate',
            tierParam
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête createFacture :', error)
    }
}

const createPdfFacture = async (ref) => {
    const api = new ConnexionAPI()

    const tierParam = {
        'modulepart' : 'invoice',
        'original_file' : ref + '/' + ref + '.pdf',
        'langcode' : 'fr_FR'
    }

    try {
        const response = await api.callAPI(
            'PUT',
            'documents/builddoc',
            tierParam
        )
        return  await response.json()

    } catch (error) {
        console.error('Erreur lors de la requête createPdfFacture :', error)
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
    updateResponsableToAdherent,
    createFacture,
    validateFacture,
    createPdfFacture
}