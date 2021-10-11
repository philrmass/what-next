import cln from 'classnames';

import {
  getDateInput,
  getInputDate,
  getInputTime,
  getTimeInput,
} from '../utilities/events';
import { moveTimeToDate } from '../utilities/time';
import styles from './Editor.module.css';

import Dialog from './Dialog';

export default function Editor({
  event,
  setEvent,
  update,
  remove,
  close,
}) {
  const oneMinute = 1000 * 60;

  function handleTextChange(text) {
    setEvent(event => ({
      ...event,
      text,
    }));
  }

  const handleDateChange = (value) => {
    const dateAt = getInputDate(value, event.at);

    setEvent(event => ({
      ...event,
      at: moveTimeToDate(event.at, dateAt),
    }));
  };

  function handleStartChange(value) {
    setEvent(event => ({
      ...event,
      at: getInputTime(value, event.at),
    }));
  }

  const handleDurationChange = (value) => {
    const duration = oneMinute * value;

    setEvent(event => ({
      ...event,
      duration,
    }));
  };

  const handleDelete = () => {
    remove(event.id);
    close();
  };

  const handleSave = () => {
    update(event);
    close();
  };

  const buildDuration = () => {
    const values = [0, 30, 60, 90];

    return (
      <ul className={styles.durations}>
        {values.map(value => {
          const classes = cln({
            [styles.duration]: true,
            [styles.selected]: (oneMinute * value) === event?.duration,
          });

          return (
            <li
              key={value}
              className={classes}
              onClick={() => handleDurationChange(value)}
            >
              {value ? value : 'None'}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Dialog isOpen={Boolean(event)}>
      <div className={styles.content}>
        <div className={styles.input}>
          <input
            id='date'
            type='date'
            value={getDateInput(event?.at)}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <input
            id='start'
            type='time'
            value={getTimeInput(event?.at)}
            onChange={(e) => handleStartChange(e.target.value)}
          />
        </div>
        {buildDuration()}
        <div>
          <textarea
            rows='3'
            autoFocus
            className={styles.text}
            value={event?.text}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleDelete}>Delete</button>
        <button className={styles.button} onClick={handleSave}>Save</button>
        <button className={styles.button} onClick={close}>Cancel</button>
      </div>
    </Dialog>
  );
}
