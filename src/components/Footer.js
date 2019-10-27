import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Footer.module.css';

function Footer({ message, version, update }) {
  return (
    <footer className={styles.main}>
      <div>{message}</div>
      <div>
        <button
          className={styles.updateButton}
          onClick={update}
        >
        </button>
        <span className={styles.version}>version {version}</span>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  message: PropTypes.string,
  version: PropTypes.string,
  update: PropTypes.func,
};

export default Footer;
