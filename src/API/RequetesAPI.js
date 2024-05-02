import ConnexionAPI from "./ConnexionAPI"

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
        console.error('Erreur lors de la requête : getResponsablesByIdAdherent', error)
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
        console.error('Erreur lors de la requête : getResponsablesByIdAdherent', error)
    }
}



export {
    rechercheAdherents,
    getResponsablesByIdAdherent,
    getCategorieLicence
}