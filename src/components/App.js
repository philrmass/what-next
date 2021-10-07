import React, { useState } from 'react';
import { saveData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import Footer from './Footer';
import Events from './Events';
import Header from './Header';
import Menu from './Menu';
import styles from '../styles/App.module.css';
import { version } from '../version';

function App() {
  const [events, setEvents] = useLocalStorage('whatNextEvents', []);
  const [overlayShown, setOverlayShown] = useState('');

  function toggleOverlayShown(name) {
    setOverlayShown((shown) => {
      if (name === shown) {
        return '';
      }
      return name;
    });
  }

  function clearOverlayShown(name) {
    setOverlayShown((shown) => {
      if (name === shown) {
        return '';
      }
      return shown;
    });
  }

  function addEvent() {
    setOverlayShown('eventModal');
  }

  function updateEvents(events) {
    setEvents(events);
  }

  function saveBackup() {
    const fileName = `whatNextData_${Date.now()}.json`;
    saveData(fileName, events);
  }

  function loadBackup() {
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header
          addEvent={addEvent}
          showMenu={() => toggleOverlayShown('menu')}
        />
      </header>
      <section className={styles.main}>
        <Events
          events={events}
          updateEvents={updateEvents}
          isModalShown={overlayShown === 'eventModal'}
          showModal={() => setOverlayShown('eventModal')}
          closeModal={() => clearOverlayShown('eventModal')}
        />
        { overlayShown === 'menu' &&
          <Menu
            saveBackup={saveBackup}
            loadBackup={loadBackup}
            close={() => clearOverlayShown('menu')}
          />
        }
      </section>
      <footer className={styles.footer}>
        <Footer
          version={version}
        />
      </footer>
    </div>
  );
}

export default App;
