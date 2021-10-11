import { useState } from 'react';

import { version } from '../version';
//import { getEventsOrder } from '../utilities/events';
import { copyData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import styles from './App.module.css';

import Events from './Events';
import Menu from './Menu';

export default function App() {
  const [events, _setEvents] = useLocalStorage('whatNextEvents', []);
  const [order, _setOrder] = useLocalStorage('whatNextOrder', []);
  const [status, setStatus] = useState('');

  const save = () => {
    // events.getFileName(at);
    //const fileName = `whatNextData_${Date.now()}.json`;
    //saveData(fileName, events);
    setSummary('TODO: Saved');
  };

  const load = () => {
    // get data from file
    // events.parseEvents(data)
    // setEvents(parsed);
    setSummary('TODO: Loaded');
  };

  const copy = () => {
    copyData(events);
    setSummary('Copied');
  };

  const update = (event) => {
    console.log('UPDATE', event);
    /*
    setEvents(events => ({
      ...events,
      [event.guid]: event,
    }));
    setOrder(getEventsOrder(events));
    */
  };

  const remove = (id) => {
    console.log('REMOVE', id);
    //??? filter order
  };

  const setSummary = (verb) => {
    const statusMs = 5000;
    const message = `${verb} ${events.length} events`;

    setStatus(message);
    setTimeout(() => setStatus(''), statusMs);
  };

  return (
    <div className={styles.page}>
      <Events events={events} order={order} update={update} remove={remove} />
      <Menu save={save} load={load} copy={copy} status={status} />
      <div className={styles.version}>{version}</div>
    </div>
  );
}
