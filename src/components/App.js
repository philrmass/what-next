import React, { useState } from 'react';
import { useLocalStorage } from '../utilities/storage';
import Footer from './Footer';
import Events from './Events';
import Header from './Header';
import Menu from './Menu';
import Modal from './Modal';
import Notes from './Notes';
import styles from '../styles/App.module.css';

function App() {
  const [events, setEvents] = useLocalStorage('whatNextEvents', []);
  const [notes, setNotes] = useLocalStorage('whatNextNotes', []);
  const [notesShown, setNotesShown] = useLocalStorage('whatNextNotesShown', false);
  const [menuShown, setShowMenu] = useState(false);
  const [modalShown, setModalShown] = useState('noteModal');
  const [message, setMessage] = useState('');
  const version = '0.0.1';

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  }

  function addItem() {
    if (notesShown) {
      showMessage('add note');
      setModalShown('noteModal');
    } else {
      showMessage('add event');
      setModalShown('eventModal');
    }
  }

  function showMenu(shown) {
    setShowMenu(shown);
  }

  function addEvent(event) {
    setEvents((events) => [...events, event]);
  }

  function addNote(note) {
    setNotes((notes) => [...notes, note]);
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

  function buildModal(name) {
    if (name.length === 0) {
      return null;
    }
    return (
      <Modal
        close={() => setModalShown('')}
      >
        {`Stuff in the modal: ${name}`}
      </Modal>
    );
  }

  return (
    <div className={styles.page}>
      <Header
        setNotesShown={setNotesShown}
        addItem={addItem}
        showMenu={() => showMenu(true)}
      />
      <section className={styles.main}>
        { !notesShown &&
          <Events
            events={events}
            addEvent={addEvent}
          />
        }
        { notesShown &&
          <Notes
            notes={notes}
            addNotes={addNote}
          />
        }
        { menuShown &&
          <Menu
            saveBackup={saveBackup}
            loadBackup={loadBackup}
            close={() => showMenu(false)}
          />
        }
      </section>
      <Footer
        message={message}
        version={version}
        update={update}
      />
      {buildModal(modalShown)}
    </div>
  );
}

export default App;
