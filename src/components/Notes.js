import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Notes.module.css';
import Modal from './Modal';

function Notes({
  notes,
  updateNotes,
  isModalShown,
  //showModal,
  closeModal,
}) {
  const [text, setText] = useState('');

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function save() {
    const note = {
      text,
      guid: 'yo',
      colorCode: 0,
    };
    updateNotes([...notes, note]);
    closeModal();
    setText('');
  }

  function buildModal() {
    if (!isModalShown) {
      return null;
    }

    return (
      <Modal
        button={<button onClick={save}>Save</button>}
        close={closeModal}
      >
        <textarea
          rows='3'
          cols='45'
          autoFocus={true}
          className={styles.textInput}
          value={text}
          onChange={handleTextChange}
        />
      </Modal>
    );
  }

  return (
    <Fragment>
      <section className={styles.main}>
        <div>
          {JSON.stringify(notes)}
        </div>
      </section>
      { buildModal() }
    </Fragment>
  );
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  updateNotes: PropTypes.func,
  isModalShown: PropTypes.bool,
  showModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default Notes;
