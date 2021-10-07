import styles from '../styles/Header.module.css';

export default function Header({ addEvent, showMenu }) {
  return (
    <main className={styles.main}>
      <div className={styles.controls}>
        <div>
          <button
            className={styles.infoButton}
            onClick={addEvent}
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
