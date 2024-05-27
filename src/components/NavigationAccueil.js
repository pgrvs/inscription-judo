import React from 'react'
import { useNavigate } from 'react-router-dom'
import RetourAccueil from "../assets/RetourAccueil"
import style from '../styles/NavigationAccueil.module.scss'

const NavigationAccueil = () => {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }

    return (
        <button className={`buttonRetour ${style.accueil}`} onClick={handleHome}><RetourAccueil width="27" height="27"/></button>
    )
}

export default NavigationAccueil
