import { useState } from 'react';

import styles from './IconEditor.module.css';

export default function IconEditor({ children }) {
  const id = 0;
  const [isOpen, setIsOpen] = useState(true);
  console.log('ie', isOpen);

  const buildEditor = () => {
    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.editor} onClick={() => setIsOpen(false)}>
        <div className={styles.icon}>
          {getSvgSource(id)}
        </div>
      </div>
    );
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      {buildEditor()}
    </>
  );
}

function getSvgSource(id) {
  switch (id) {
    case 0:
    default:
      return (
        <svg fill='rgb(102, 99, 96)' viewBox="-20 -20 140 140">
          <path d="M17 7 h60 v20 h-60 v-20" />
          <path d="M27 29 h60 v20 h-60 v-20" />
          <path fill='rgb(255, 208, 165)' d="M31 33 h52 v12 h-52 v-12" />
          <path d="M22 51 h60 v20 h-60 v-20" />
          <path d="M17 73 h60 v20 h-60 v-20" />
        </svg>
      );
  }
}
