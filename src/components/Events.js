import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { eventToDisplay } from '../utilities/events';
import styles from '../styles/Events.module.css';
import Modal from './Modal';
import ScrollBox from './ScrollBox';

function Events({
  events,
  updateEvents,
  isModalShown,
  showModal,
  closeModal,
}) {
  const [activeEvent, setActiveEvent] = useState(createDefaultEvent());

  useEffect(() => {
    if (isModalShown && !activeEvent.start) {
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const start = Date.now() + oneWeek;
      setActiveEvent({ ...activeEvent, start });
    }
  }, [isModalShown]);

  /*
  function handleTextChange(text) {
    setActiveNote((note) => ({
      ...note,
      text,
    }));
  }

*/
  function save() {
    const i = events.findIndex((event) => event.guid === activeEvent.guid);
    if (i >= 0) {
      updateEvents([...events.slice(0, i), activeEvent, ...events.slice(i + 1)]);
    } else {
      const i = events.findIndex((event) => event.start > activeEvent.start);
      const event = { ...activeEvent, guid: uuidv4() };
      if (i >= 0) {
        updateEvents([...events.slice(0, i), event, ...events.slice(i)]);
      } else {
        updateEvents([...events, event]);
      }
    }
    setActiveEvent(createDefaultEvent());
    closeModal();
  }

  function edit(guid) {
    const event = events.find((event) => event.guid === guid);
    setActiveEvent({ ...event });
    showModal();
  }

  function remove() {
    const i = events.findIndex((event) => event.guid === activeEvent.guid);
    if (i >= 0) {
      updateEvents([...events.slice(0, i), ...events.slice(i + 1)]);
    }
    setActiveEvent(createDefaultEvent());
    closeModal();
  }

  function cancel() {
    setActiveEvent(createDefaultEvent());
    closeModal();
  }

  function createDefaultEvent() {
    return {
      text: 'yo',
      start: null,
      end: null,
    };
  }

  function buildModalButtons() {
    const isEditing = Boolean(activeEvent.guid);
    return (
      <Fragment>
        { isEditing && (
          <button onClick={remove}>Delete</button>
        )}
        <button onClick={save}>Save</button>
      </Fragment>
    );
  }

  function buildModal() {
    if (!isModalShown) {
      return null;
    }

    const { date, start, end } = eventToDisplay(activeEvent);

    return (
      <Modal
        buttons={buildModalButtons()}
        close={cancel}
      >
        <Fragment>
          <div>
            {'Event Controls Here'}
            <div>
              {date}
            </div>
            <div>
              { start && end && (
                <span>{start}</span>
              )}
              { end && (
                <span> - {end}</span>
              )}
            </div>
            <div>
            </div>
          </div>
        </Fragment>
      </Modal>
    );
  }

  function buildEvents() {
    return events.map((event) => {
      const { date, start, end, until, code } = eventToDisplay(event);
      const eventStyles = `${styles.event} event${code}`;

      return (
        <li
          key={event.guid}
          id={event.guid}
          className={eventStyles}
        >
          <div className={styles.until}>
          </div>
          <div className={styles.untilText}>
            <div>
              {until}
            </div>
          </div>
          <div className={styles.eventContent}>
            <div className={styles.dateTime}>
              <div className={styles.dateText}>
                {date}
              </div>
              <div className={styles.timeText}>
                { start && end && (
                  <span>{start}</span>
                )}
                { end && (
                  <span> - {end}</span>
                )}
                { start && !end && (
                  <div className={styles.temp}>{start} - {end}</div>
                )}
              </div>
            </div>
            <div className={styles.textBox}>
              <span className={styles.text}>
                {event.text}
              </span>
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <Fragment>
      <section className={styles.main}>
        <ScrollBox
          selectElement={edit}
        >
          <ul>
            {buildEvents()}
          </ul>
        </ScrollBox>
      </section>
      { buildModal() }
    </Fragment>
  );
}

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  updateEvents: PropTypes.func,
  isModalShown: PropTypes.bool,
  showModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default Events;
