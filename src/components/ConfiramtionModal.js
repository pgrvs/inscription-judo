import React from 'react'
import Modal from 'react-modal'
import style from '../styles/ConfirmationModal.module.scss'
import ButtonSuivant from "./ButtonSuivant"

Modal.setAppElement('#root')

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={style.modal}
            overlayClassName={style.overlay}
        >
            <h2>Confirmer</h2>
            <p className={style.message} dangerouslySetInnerHTML={{ __html: message }}></p>
            <div className={style.buttonModal}>
                <ButtonSuivant text={"Oui, je suis sûr"} onClick={onConfirm} />
                <ButtonSuivant text={"Non"} onClick={onClose} />
            </div>
        </Modal>
    )
}

export default ConfirmationModal
