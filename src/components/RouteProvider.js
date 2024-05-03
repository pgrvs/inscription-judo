import React, { useEffect, useState, createContext } from 'react'
import { useLocation } from 'react-router-dom'
export const RouteContext = createContext()

const RouteProvider = ({ children }) => {
    const location = useLocation() // Obtenir l'objet de localisation de React Router
    const [previousRoute, setPreviousRoute] = useState(null) // État pour stocker la route précédente

    useEffect(() => {
        setPreviousRoute(location.pathname) // Mettre à jour la route précédente quand le chemin change
    }, [location.pathname]) // Dépendance sur le changement de chemin

    return (
        <RouteContext.Provider value={previousRoute}>
            {children} {/* Fournir le contexte aux enfants */}
        </RouteContext.Provider>
    )
}

export default RouteProvider
