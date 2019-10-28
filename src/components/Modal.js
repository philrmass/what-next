import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Modal.module.css';

function Modal({ button, close, children }) {
  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.content}>
          { children }
        </div>
        <div className={styles.buttonContainer}>
          {button}
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
  button: PropTypes.object,
  close: PropTypes.func,
  children: PropTypes.object,
};

export default Modal;
