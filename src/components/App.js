import { useState } from 'react';

import { version } from '../version';
import { getEventsOrder, getSaveFilePath, parseEvents } from '../utilities/events';
import { copyData, loadData, saveData } from '../utilities/file';
import { useLocalStorage } from '../utilities/storage';
import styles from './App.module.css';

import Events from './Events';
import Menu from './Menu';

export default function App() {
  const [events, setEvents] = useLocalStorage('whatNextEvents', {}); 
  const [order, setOrder] = useLocalStorage('whatNextOrder', []);
  const [status, setStatus] = useState('');

  const save = () => {
    const fileName = getSaveFilePath();
    saveData(fileName, events);
    setSummary('Saved', events, fileName);
  };

  const load = async () => {
    const data = await loadData();
    const parsed = parseEvents(data);
    setEvents(parsed);
    setOrder(getEventsOrder(parsed));
    setSummary('Loaded', parsed);
  };

  const copy = () => {
    copyData(events);
    setSummary('Copied', events);
  };

  const update = (event) => {
    const updated = {
      ...events,
      [event.id]: event,
    };
    setEvents(updated);
    setOrder(getEventsOrder(updated));
  };

  const remove = (removeId) => {
    setEvents(events => removeProperty(removeId, events));
    setOrder(order => order.filter(id => id !== removeId));
  };

  const setSummary = (verb, events, to) => {
    const statusMs = 5000;
    const count = Object.keys(events).length;
    const toText = to ? ` to ${to}` : '';
    const message = `${verb} ${count} events${toText}`;

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

function removeProperty(key, obj) {
  const { [key]: _, ...rest } = obj;
  return rest;
}
