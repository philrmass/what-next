import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

function Header({ setShowNotes }) {
  return (
    <header className={styles.main}>
      <div className={styles.title}>
        What Next
      </div>
      <div className={styles.links}>
        <button
          className={styles.link}
          onClick={() => setShowNotes(false)}
        >
          Events
        </button>
        <button
          className={styles.link}
          onClick={() => setShowNotes(true)}
        >
          Notes
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  setShowNotes: PropTypes.func,
};

export default Header;
