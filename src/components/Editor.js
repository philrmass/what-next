import React from 'react';
import { dateToEdit, editToDate, editToTime, timeToEdit } from '../utilities/events';
import { moveTimeToDate } from '../utilities/time';
import styles from './Editor.module.css';

export default function Editor({
  activeEvent,
  setActiveEvent,
}) {
  function handleTextChange(text) {
    setActiveEvent((event) => ({
      ...event,
      text,
    }));
  }

  function handleDateChange(text) {
    const date = editToDate(text, event.date);
    setActiveEvent((event) => ({
      ...event,
      date,
      start: moveTimeToDate(event.start, date),
      end: moveTimeToDate(event.end, date),
    }));
  }

  function handleStartChange(text) {
    setActiveEvent((event) => ({
      ...event,
      start: editToTime(text, event.date),
    }));
  }

  function handleEndChange(text) {
    setActiveEvent((event) => ({
      ...event,
      end: editToTime(text, event.date),
    }));
  }

  return (
    <section className={styles.main}>
      <textarea
        rows='2'
        cols='24'
        autoFocus={true}
        className={styles.textInput}
        value={activeEvent.text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <div>
        <input
          type='date'
          value={dateToEdit(activeEvent.date)}
          onChange={(e) => handleDateChange(e.target.value)}
          className={styles.dateInput}
        />
      </div>
      <div className={styles.times}>
        <div>
          <label htmlFor='start'>Start</label>
        </div>
        <div>
          { activeEvent.start &&
            <label htmlFor='end'>End</label>
          }
        </div>
        <div>
          <input
            type='time'
            value={timeToEdit(activeEvent.start)}
            onChange={(e) => handleStartChange(e.target.value)}
            className={styles.timeInput}
          />
        </div>
        <div>
          { activeEvent.start &&
            <input
              type='time'
              value={timeToEdit(activeEvent.end)}
              onChange={(e) => handleEndChange(e.target.value)}
              className={styles.timeInput}
            />
          }
        </div>
      </div>
    </section>
  );
}
