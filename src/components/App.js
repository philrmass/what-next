import React, { useState } from 'react';
import { saveData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import Footer from './Footer';
import Events from './Events';
import Header from './Header';
import Menu from './Menu';
import Notes from './Notes';
import styles from '../styles/App.module.css';
import { version } from '../version';

function App() {
  const [events, setEvents] = useLocalStorage('whatNextEvents', []);
  const [notes, setNotes] = useLocalStorage('whatNextNotes', []);
  const [notesShown, setNotesShown] = useLocalStorage('whatNextNotesShown', false);
  const [overlayShown, setOverlayShown] = useState('');
  const [message, setMessage] = useState('');

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  }

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

  function addItem() {
    if (notesShown) {
      setOverlayShown('noteModal');
    } else {
      setOverlayShown('eventModal');
    }
  }

  function updateEvents(events) {
    setEvents(events);
  }

  function updateNotes(notes) {
    setNotes(notes);
  }

  function saveBackup() {
    const name = `whatNextData_${Date.now()}.json`;
    saveData({ events, notes}, name);
  }

  function loadBackup() {
    showMessage('load');
  }

  function updateVersion() {
    showMessage('update');
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Header
          setNotesShown={setNotesShown}
          addItem={addItem}
          showMenu={() => toggleOverlayShown('menu')}
        />
      </header>
      <section className={styles.main}>
        { !notesShown &&
          <Events
            events={events}
            updateEvents={updateEvents}
            isModalShown={overlayShown === 'eventModal'}
            showModal={() => setOverlayShown('eventModal')}
            closeModal={() => clearOverlayShown('eventModal')}
          />
        }
        { notesShown &&
          <Notes
            notes={notes}
            updateNotes={updateNotes}
            isModalShown={overlayShown === 'noteModal'}
            showModal={() => setOverlayShown('noteModal')}
            closeModal={() => clearOverlayShown('noteModal')}
          />
        }
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
          message={message}
          version={version}
          update={updateVersion}
        />
      </footer>
    </div>
  );
}

export default App;
