import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Modal.module.css';

function Modal({ close }) {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={close}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  shown: PropTypes.string,
  close: PropTypes.func,
};

export default Modal;
