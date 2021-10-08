import { useState } from 'react';
import { saveData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import Footer from './Footer';
import Events from './Events';
import Header from './Header';
import Menu from './Menu';
import styles from '../styles/App.module.css';
import { version } from '../version';

function App() {
  const statusMs = 30000;
  const [events, setEvents] = useLocalStorage('whatNextEvents', []);
  const [overlayShown, setOverlayShown] = useState('');
  const [status, setStatus] = useState('');

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

  const save = () => {
    // events.getFileName(at);
    //const fileName = `whatNextData_${Date.now()}.json`;
    //saveData(fileName, events);
    console.log('SAVE');
    setStatus('save');
    setTimeout(() => setStatus(''), statusMs);
  };

  const load = () => {
    // get data from file
    // events.parseEvents(data)
    // setEvents(parsed);
    console.log('LOAD');
    setStatus('load');
    setTimeout(() => setStatus(''), statusMs);
  };

  const copy = () => {
    // copyData(events);
    console.log('COPY');
    setStatus('copy');
    setTimeout(() => setStatus(''), statusMs);
  };

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
      </section>
      <footer className={styles.footer}>
        <Footer
          version={version}
        />
      </footer>
      <Menu save={save} load={load} copy={copy} status={status} />
    </div>
  );
}

export default App;
