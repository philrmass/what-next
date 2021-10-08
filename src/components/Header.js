import styles from '../styles/Header.module.css';

export default function Header({ addEvent }) {
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
        </div>
      </div>
    </main>
  );
}
