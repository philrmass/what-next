import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Menu.module.css';

function Menu({ saveBackup, loadBackup, close }) {
  return (
    <main className={styles.main}>
      <div className={styles.linkContainer}>
        <div>
          <button
            className={styles.link}
            onClick={() => {
              close();
              saveBackup();
            }}
          >
            Save Backup
          </button>
        </div>
        <div>
          <button
            className={styles.link}
            onClick={() => {
              close();
              loadBackup();
            }}
          >
            Load Backup
          </button>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={close}
        >
          +
        </button>
      </div>
    </main>
  );
}

Menu.propTypes = {
  saveBackup: PropTypes.func,
  loadBackup: PropTypes.func,
  close: PropTypes.func,
};

export default Menu;
