import React from 'react'
import Modal from 'react-modal'
import style from '../styles/ConfirmationModal.module.scss'

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
                <button className={"buttonSuivant"} onClick={onConfirm}>Oui, je suis sûr</button>
                <button className={"buttonSuivant"} onClick={onClose}>Non</button>
            </div>
        </Modal>
    )
}

export default ConfirmationModal
