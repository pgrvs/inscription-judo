import React from "react"
import Message from "./inscription/Message"
import NavigationAccueil from "./NavigationAccueil";

const ErreurEmail = () => {
    return(
        <>
            <NavigationAccueil/>
            <div className="container">
                <h1>Erreur lors de l'envoie des emails</h1>
                <Message
                    message={"Les emails automatiques ne se sont pas envoyé, veuillez le faire manuellement."}
                />
            </div>
        </>
    )
}

export default ErreurEmail