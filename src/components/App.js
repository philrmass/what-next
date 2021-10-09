import { useState } from 'react';

import { version } from '../version';
import { getEventOrder } from '../utilities/events';
import { copyData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import styles from './App.module.css';

import Events from './Events';
import Eventz from './Eventz';
import Menu from './Menu';

export default function App() {
  const [events, setEvents] = useLocalStorage('whatNextEvents', []);
  const [order, setOrder] = useLocalStorage('whatNextOrder', []);
  const [status, setStatus] = useState('');

  function updateEvent(event) {
    setEvents(events => ({
      ...events,
      [event.guid]: event,
    }));
    setOrder(getEventOrder(events));
  }

  const save = () => {
    // events.getFileName(at);
    //const fileName = `whatNextData_${Date.now()}.json`;
    //saveData(fileName, events);
    setSummary('Saved');
  };

  const load = () => {
    // get data from file
    // events.parseEvents(data)
    // setEvents(parsed);
    setSummary('Loaded');
  };

  const copy = () => {
    copyData(events);
    setSummary('Copied');
  };

  const redo = () => {
    console.log('REDO');
    if (Array.isArray(events)) {
      console.log('do it', events.length);
      const obj = events.reduce((obj, event) => ({
        ...obj,
        [event.guid]: {
          id: event.guid,
          at: event.start,
          duration: 0,
          text: event.text,
        },
      }), {});
      setEvents(obj);
      setOrder(getEventOrder(obj));
    }
  };

  const setSummary = (verb) => {
    const statusMs = 30000;
    const message = `${verb} ${events.length} events`;

    setStatus(message);
    setTimeout(() => setStatus(''), statusMs);
  };

  return (
    <div className={styles.page}>
      <div className={styles.redo}>
        <button onClick={() => redo()}>REDO</button>
      </div>
      <Eventz events={events} order={order} updateEvent={updateEvent} />
      <Events events={events} order={order} updateEvent={updateEvent} />
      <Menu save={save} load={load} copy={copy} status={status} />
      <div className={styles.version}>{version}</div>
    </div>
  );
}
