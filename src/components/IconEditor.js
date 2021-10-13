import { useState } from 'react';

import styles from './IconEditor.module.css';

export default function IconEditor({ children }) {
  const id = 0;
  const [isOpen, setIsOpen] = useState(false);
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
        <svg fill='rgb(98, 98, 98)' viewBox="0 0 100 100">
          <path d="M20 10 h60 v20 h-60 v-20" />
          <path d="M30 32 h60 v20 h-60 v-20" />
          <path fill='rgb(255, 208, 165)' d="M34 36 h52 v12 h-52 v-12" />
          <path d="M25 54 h60 v20 h-60 v-20" />
          <path d="M20 76 h60 v20 h-60 v-20" />
        </svg>
      );
  }
}
