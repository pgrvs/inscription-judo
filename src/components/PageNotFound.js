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
            <p>La page que vous cherchez n'existe pas ...</p>
            <button className={style.retourAccueil} onClick={handleHome}>
                <RetourAccueil width="27" height="27"/>
                <p>Retourner à l'accueil</p>
            </button>
        </div>
    )
}

export default PageNotFound