class ConnexionAPI {
    constructor() {
        this.apikey = process.env.REACT_APP_API_KEY
        this.baseUrl = process.env.REACT_APP_API_URL
    }

    async callAPI(method, path, data = null) {
        let url = this.baseUrl + path

        const headers = {
            'DOLAPIKEY': this.apikey
        }

        let options = {
            method: method,
            headers: headers
        }

        if (method === 'POST' || method === 'PUT') {
            headers['Content-Type'] = 'application/json'
            options.body = data ? JSON.stringify(data) : null
        } else if (method === 'DELETE') {
            options.method = 'DELETE'
        } else if (data) {
            url += '?' + new URLSearchParams(data).toString()
        }

        try {
            console.log('appel API ok')
            return await fetch(url, options)
        } catch (error) {
            console.log('appel API pas ok')
            console.error('Error fetching data:', error)
            throw error
        }
    }
}

export default ConnexionAPI