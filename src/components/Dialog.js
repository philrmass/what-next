import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Modal.module.css';

function Modal({ buttons, close, children }) {
  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.content}>
          { children }
        </div>
        <div className={styles.buttonContainer}>
          {buttons}
          <button
            className={styles.button}
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  buttons: PropTypes.object,
  close: PropTypes.func,
  children: PropTypes.object,
};

export default Modal;
