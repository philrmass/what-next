import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Events.module.css';

function Events({ events }) {
  return (
    <section className={styles.main}>
      <div>
        {JSON.stringify(events)}
      </div>
    </section>
  );
}

Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  addEvent: PropTypes.func,
};

export default Events;
