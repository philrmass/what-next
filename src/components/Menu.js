import { useState } from 'react';

import styles from './Menu.module.css';

import Dialog from './Dialog';

function Menu({ save, load, copy, status }) {
  const [isOpen, setIsOpen] = useState(false);

  //??? use menu icon
  return (
    <>
      <Dialog isOpen={isOpen}>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={save}>Save</button>
            <button className={styles.button} onClick={load}>Load</button>
            <button className={styles.button} onClick={copy}>Copy</button>
            <div className={styles.status}>{status}</div>
          </div>
          <button className={styles.button} onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Dialog>
      <button className={styles.menuButton} onClick={() => setIsOpen(true)} >
        <svg id="menu" viewBox="0 0 100 100">
          <path d="M25 31 h50 v6 h-50 v-6" />
          <path d="M25 47 h50 v6 h-50 v-6" />
          <path d="M25 63 h50 v6 h-50 v-6" />
        </svg>
      </button>
    </>
  );
}

export default Menu;
