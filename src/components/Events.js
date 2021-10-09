import React, { Fragment, useEffect, useState } from 'react';
import uuidv4 from 'uuid/v4';
import { eventToDisplay } from '../utilities/events';
import { nextMinute, timeToDate } from '../utilities/time';
import styles from './Events.module.css';
import Editor from './Editor';
import Modal from './Modal';
import ScrollBox from './ScrollBox';

export default function Events({
  events,
  order,
  updateEvent,
}) {
  const all = getAll(events, order);
  const isModalShown = false;
  const showModal = () => {};
  const closeModal = () => {};
  const onSwipe = () => {};
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
    console.log('save');
    /*
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
    */
    closeModal();
  }

  function edit(guid) {
    console.log('edit');
    /*
    const event = events.find((event) => event.guid === guid);
    setActiveEvent({ ...event });
    showModal();
    */
  }

  function remove() {
    console.log('remove');
    /*
    const i = events.findIndex((event) => event.guid === activeEvent.guid);
    if (i >= 0) {
      updateEvents([...events.slice(0, i), ...events.slice(i + 1)]);
    }
    setActiveEvent(createDefaultEvent());
    closeModal();
    */
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
        <Editor
          activeEvent={activeEvent}
          setActiveEvent={setActiveEvent}
        />
      </Modal>
    );
  }

  const editEvent = (guid) => {
    console.log('EDIT', guid);
  };

  function buildEvents() {
    return all.map((event) => {
      const { date, start, end, until, code } = eventToDisplay(event, now);
      const eventStyles = `${styles.event} event${code}`;

      return (
        <li
          key={event.guid}
          id={event.guid}
          className={eventStyles}
          onClick={() => editEvent(event.guid)}
        >
          <div className={styles.until}>
          </div>
          <div className={styles.untilText}>
            {until}
          </div>
          <div className={styles.eventContent}>
            <div className={styles.dateTimeBox}>
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
            </div>
            <div className={styles.textBox}>
              <div className={styles.text}>
                {event.text}
              </div>
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <Fragment>
      <div>{`ARRAY [${Array.isArray(events)}]`}</div>
      <section className={styles.main}>
        <ul>
          {buildEvents()}
        </ul>
      </section>
      <button
        className={styles.addButton}
        onClick={() => console.log('addEvent')}
      >
        +
      </button>
      { buildModal() }
    </Fragment>
  );
}

function getAll(events, order) {
  if (Array.isArray(events)) {
    return events;
  }

  return order.map(guid => events[guid]);
}
