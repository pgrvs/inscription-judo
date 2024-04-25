import React, { useState, useEffect } from 'react'
import ConnexionAPI from '../API/ConnexionAPI'

const ExampleComponent = () => {
    const [apiResponse, setAPIResponse] = useState('')

    useEffect(() => {
        const api = new ConnexionAPI()
        const fetchData = async () => {
            try {
                const response = await api.callAPI('GET', 'thirdparties')
                const data = await  response.json()
                setAPIResponse(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };
        fetchData()
    }, [])

    return (
        <div>
            <h1>API Response:</h1>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
    )
}

export default ExampleComponent
