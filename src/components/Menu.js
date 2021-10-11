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
      <button className={styles.menuButton} onClick={() => setIsOpen(true)} >? </button>
    </>
  );
}

export default Menu;
