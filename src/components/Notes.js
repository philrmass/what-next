import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Notes.module.css';

function Notes({ notes }) {
  return (
    <section className={styles.main}>
      <div>
        {JSON.stringify(notes)}
      </div>
    </section>
  );
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  addNote: PropTypes.func,
};

export default Notes;
