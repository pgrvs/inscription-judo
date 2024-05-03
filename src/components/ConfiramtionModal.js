import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Confirmer</h2>
            <p>{message}</p>
            <button onClick={onConfirm}>Oui, je suis sûr</button>
            <button onClick={onClose}>Non</button>
        </Modal>
    )
}

export default ConfirmationModal
