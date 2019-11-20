import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { eventToDisplay } from '../utilities/events';
import { nextMinute, timeToDate } from '../utilities/time';
import styles from '../styles/Events.module.css';
import EventEditor from './EventEditor';
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
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let timeout = null;
    function update() {
      setNow(Date.now());
      timeout = setTimeout(update, nextMinute());
    }
    update();

    return (() => {
      clearTimeout(timeout);
      timeout = null;
    });
  }, []);

  useEffect(() => {
    if (isModalShown && !activeEvent.start) {
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const start = Date.now() + oneWeek;
      const date = timeToDate(start);
      setActiveEvent({ ...activeEvent, date, start });
    }
  }, [isModalShown]);

  function save() {
    const filtered = events.filter((event) => event.guid !== activeEvent.guid);
    const i = filtered.findIndex((event) => {
      const eventTime = event.start || event.date;
      const activeEventTime = activeEvent.start || activeEvent.date;
      return eventTime > activeEventTime;
    });
    const event = { ...activeEvent, guid: uuidv4() };

    if (i >= 0) {
      updateEvents([...filtered.slice(0, i), event, ...filtered.slice(i)]);
    } else {
      updateEvents([...filtered, event]);
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
      text: '',
      date: null,
      start: null,
      end: null,
    };
  }

  function buildModalButtons() {
    const isEditing = Boolean(activeEvent.guid);
    return (
      <Fragment>
        <button onClick={save}>Save</button>
        { isEditing && (
          <button onClick={remove}>Delete</button>
        )}
      </Fragment>
    );
  }

  function buildModal() {
    if (!isModalShown) {
      return null;
    }

    return (
      <Modal
        buttons={buildModalButtons()}
        close={cancel}
      >
        <EventEditor
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
        />
      </Modal>
    );
  }

  function buildEvents() {
    return events.map((event) => {
      const { date, start, end, until, code } = eventToDisplay(event, now);
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
                { start && (
                  <span>{start}</span>
                )}
                { end && (
                  <span> - {end}</span>
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
  now: PropTypes.number,
  events: PropTypes.arrayOf(PropTypes.object),
  updateEvents: PropTypes.func,
  isModalShown: PropTypes.bool,
  showModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default Events;
