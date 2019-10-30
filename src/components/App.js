import React, { useState } from 'react';
import { useLocalStorage } from '../utilities/storage';
import Footer from './Footer';
import Events from './Events';
import Header from './Header';
import Menu from './Menu';
import Notes from './Notes';
import styles from '../styles/App.module.css';

function App() {
  const [events, setEvents] = useLocalStorage('whatNextEvents', []);
  const [notes, setNotes] = useLocalStorage('whatNextNotes', []);
  const [notesShown, setNotesShown] = useLocalStorage('whatNextNotesShown', false);
  const [overlayShown, setOverlayShown] = useState('');
  const [message, setMessage] = useState('');
  const version = '0.0.2';

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

  function updateEvents(event) {
    setEvents((events) => [...events, event]);
  }

  function updateNotes(notes) {
    setNotes(notes);
  }

  function saveBackup() {
    showMessage('save');
  }

  function loadBackup() {
    showMessage('load');
  }

  function update() {
    showMessage('update');
  }

  return (
    <div className={styles.page}>
      <Header
        setNotesShown={setNotesShown}
        addItem={addItem}
        showMenu={() => toggleOverlayShown('menu')}
      />
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
      <Footer
        message={message}
        version={version}
        update={update}
      />
    </div>
  );
}

export default App;
