import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Events.module.css';
import Modal from './Modal';

function Events({
  events,
  //updateEvents,
  isModalShown,
  //showModal,
  closeModal,
}) {
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

  return (
    <Fragment>
      <section className={styles.main}>
        <div>
          {JSON.stringify(events)}
        </div>
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
