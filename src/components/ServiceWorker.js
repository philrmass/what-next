import { useState } from 'react';
import cln from 'classnames';

import styles from './ServiceWorker.module.css';

import Dialog from './Dialog';
import Icon from './Icon';

export default function ServiceWorker() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog isOpen={isOpen}>
        <div className={styles.content} onClick={() => setIsOpen(false)}>
          SERVICE WORKER
        </div>
        {/*
        <div className={styles.content}>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={save}>Save</button>
            <button className={styles.button} onClick={load}>Load</button>
            <button className={styles.button} onClick={copy}>Copy</button>
            <div className={styles.status}>{status}</div>
          </div>
          <button className={styles.button} onClick={() => setIsOpen(false)}>Close</button>
        </div>
        */}
      </Dialog>
      <button className={cln('iconButton', styles.button)} onClick={() => setIsOpen(true)} >
        <Icon name='blank' />
      </button>
    </>
  );
}
