import React from 'react'
import Valider from "./../assets/Valider"
import style from "./../styles/ButtonSuivant.module.scss"

const ButtonSuivant = ({ onClick, text, className = "" }) => {
    return (
        <button className={style.buttonSuivant} type="button" onClick={onClick}>
            { text === "Suivant" &&
                <Valider />
            }
            <p>{text}</p>
        </button>
    )
}

export default ButtonSuivant
