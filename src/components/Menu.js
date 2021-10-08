import { useState } from 'react';

import styles from './Menu.module.css';

function Menu({ save, load, copy, status }) {
  const [isOpen, setIsOpen] = useState(false);

  const buildMenu = () => {
    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.page}>
        <div className={styles.dialog}>
          <div className={styles.content}>
            <div className={styles.buttons}>
              <button className={styles.button} onClick={save}>Save</button>
              <button className={styles.button} onClick={load}>Load</button>
              <button className={styles.button} onClick={copy}>Copy</button>
              <div className={styles.status}>{status}</div>
            </div>
            <button className={styles.button} onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  //??? make Dialog
  //??? use big buttons (save, load, copy, close)
  return (
    <>
      {buildMenu()}
      <button className={styles.menuButton} onClick={() => setIsOpen(true)} >? </button>
    </>
  );
}

export default Menu;
