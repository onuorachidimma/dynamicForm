import React from 'react';
import '../components/styles.css'

const ModalComponent = ({ isOpen, onRequestClose, name, email }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Form Submitted</h2>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <button className='closeModal' onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalComponent;
