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
  //showModal,
  closeModal,
}) {
  const [activeEvent, setActiveEvent] = useState(createDefaultEvent());
  //??? set default event when modal shown

  useEffect(() => {
    if (isModalShown) {
      setActiveEvent(createDefaultEvent);
      console.log('MODAL');
    }
  }, [isModalShown]);

  function createDefaultEvent() {
    const now = Date.now();

    return {
      text: 'yo',
      start: now,
      end: now + 3600000,
    };
  }

  function remove() {
    console.log('REMOVE');
  }

  function save() {
    const i = events.findIndex((event) => event.guid === activeEvent.guid);
    if (i >= 0) {
      updateEvents([...events.slice(0, i), activeEvent, ...events.slice(i + 1)]);
    } else {
      const i = events.findIndex((event) => event.start > activeEvent.start);
      const event = { ...activeEvent, guid: uuidv4() };
      console.log('SAVE es', events);
      console.log('index', i);
      console.log('SAVE e', event);
      if (i >= 0) {
        updateEvents([...events.slice(0, i), event, ...events.slice(i)]);
      } else {
        updateEvents([...events, event]);
      }
    }
    closeModal();
  }

  function buildModalButtons() {
    const isEditing = false;
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

    return (
      <Modal
        buttons={buildModalButtons()}
        close={closeModal}
      >
        <Fragment>
          <div>
            {'Event Controls Here'}
          </div>
        </Fragment>
      </Modal>
    );
  }

  function buildEvents() {
    return events.map((event) => {
      const { date, start, end, until } = eventToDisplay(event);

      return (
        <li
          key={event.guid}
          id={event.guid}
          className={styles.event}
        >
          <div className={styles.text}>
            {event.text}
          </div>
          <div className={styles.dateTime}>
            {start}
          </div>
        </li>
      );
    });
  }

  return (
    <Fragment>
      <section className={styles.main}>
        <ScrollBox>
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
