import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

function Header({ setNotesShown, addItem, showMenu }) {
  return (
    <main className={styles.main}>
      {/*
      <div className={styles.title}>
        What Next
      </div>
      */}
      <div className={styles.controls}>
        <div className={styles.linkContainer}>
          <div className={styles.logo}>
            logo
          </div>
          <button
            className={styles.link}
            onClick={() => setNotesShown(false)}
          >
            Events
          </button>
          <button
            className={styles.link}
            onClick={() => setNotesShown(true)}
          >
            Notes
          </button>
        </div>
        <div>
          <button
            className={styles.infoButton}
            onClick={addItem}
          >
            +
          </button>
          <button
            className={styles.infoButton}
            onClick={showMenu}
          >
            ?
          </button>
        </div>
      </div>
    </main>
  );
}

Header.propTypes = {
  setNotesShown: PropTypes.func,
  addItem: PropTypes.func,
  showMenu: PropTypes.func,
};

export default Header;
