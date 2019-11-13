import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
//import uuidv4 from 'uuid/v4';
//import { eventToDisplay, displayToEvent } from '../utilities/events';
import styles from '../styles/Events.module.css';
import Modal from './Modal';
import ScrollBox from './ScrollBox';

function Events({
  events,
  //updateEvents,
  isModalShown,
  //showModal,
  closeModal,
}) {
  const [activeEvent, setActiveEvent] = useState(createDefaultEvent());

  function createDefaultEvent() {
    const now = Date.now();

    return {
      text: '',
      start: now,
      end: now,
    };
  }

  function buildModal() {
    if (!isModalShown) {
      return null;
    }

    return (
      <Modal
        close={closeModal}
      >
        {'Stuff in the events modal'}
      </Modal>
    );
  }

  function buildEvents() {
    return events.map((event) => {
      //const display = eventToDisplay(event);

      return (
        <li
          key={event.guid}
          id={event.guid}
          className={styles.event}
        >
          {event.text}
        </li>
      );
    });
  }

  return (
    <Fragment>
      <section className={styles.main}>
        <ScrollBox>
          <ul>
            <li>{JSON.stringify(events)}</li>
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
