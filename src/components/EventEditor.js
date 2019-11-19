import React from 'react';
import PropTypes from 'prop-types';
import { editToTime, timeToEdit } from '../utilities/events';
import styles from '../styles/EventEditor.module.css';

function EventEditor({
  activeEvent,
  setActiveEvent,
}) {
  function handleTextChange(text) {
    setActiveEvent((event) => ({
      ...event,
      text,
    }));
  }

  function handleStartChange(text) {
    setActiveEvent((event) => ({
      ...event,
      start: editToTime(text, event.start),
    }));
  }

  function handleEndChange(text) {
    setActiveEvent((event) => ({
      ...event,
      end: editToTime(text, event.start),
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
        <div>
          <label htmlFor='start'>Start</label>
        </div>
        <input
          type='time'
          id='start'
          value={timeToEdit(activeEvent.start)}
          onChange={(e) => handleStartChange(e.target.value)}
          className={styles.test}
        />
        <div>
          <label htmlFor='end'>End</label>
        </div>
        <input
          type='time'
          id='end'
          value={timeToEdit(activeEvent.end)}
          onChange={(e) => handleEndChange(e.target.value)}
          className={styles.test}
        />
      </div>
    </section>
  );
}

EventEditor.propTypes = {
  activeEvent: PropTypes.object,
  setActiveEvent: PropTypes.func,
};

export default EventEditor;
