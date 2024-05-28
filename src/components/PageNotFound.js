import { useNavigate } from 'react-router-dom'
import style from "../styles/PageNotFound.module.scss"
import RetourAccueil from "../assets/RetourAccueil"
import React from "react"

const PageNotFound = () => {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }

    return(
        <div className={style.divPageNotFound}>
            <h2>La page que vous cherchez n'existe pas ...</h2>
            <button className={style.retourAccueil} onClick={handleHome}>
                <RetourAccueil width="27" height="27"/>
                <p>Retourne à l'accueil</p>
            </button>
        </div>
    )
}

export default PageNotFound