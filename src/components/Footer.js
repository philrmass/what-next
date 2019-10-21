import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Footer.module.css';

function Footer({ version, update }) {
  return (
    <footer className={styles.main}>
      <button
        className={styles.updateButton}
        onClick={update}
      >
      </button>
      <span className={styles.version}>
        version {version}
      </span>
    </footer>
  );
}

Footer.propTypes = {
  version: PropTypes.string,
  update: PropTypes.func,
};

export default Footer;
