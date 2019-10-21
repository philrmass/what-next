import React from 'react';
import { useLocalStorage } from '../utilities/storage';
import Footer from './Footer';
import Events from './Events';
import Header from './Header';
import Notes from './Notes';
import styles from '../styles/App.module.css';

function App() {
  const [events, setEvents] = useLocalStorage('whatNextEvents', []);
  const [notes, setNotes] = useLocalStorage('whatNextNotes', []);
  const [showNotes, setShowNotes] = useLocalStorage('whatNextShowNotes', false);
  const version = '0.0.1';

  function addEvent(event) {
    setEvents((events) => [...events, event]);
  }

  function addNote(note) {
    setNotes((notes) => [...notes, note]);
  }

  function update() {
    console.log('UPDATE');
  }

  return (
    <div className={styles.page}>
      <Header
        setShowNotes={setShowNotes}
      />
      <section className={styles.main}>
        { !showNotes &&
          <Events
            events={events}
            addEvent={addEvent}
          />
        }
        { showNotes &&
          <Notes
            notes={notes}
            addNotes={addNote}
          />
        }
      </section>
      <Footer
        version={version}
        update={update}
      />
    </div>
  );
}

export default App;
