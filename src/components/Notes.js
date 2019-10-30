import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import styles from '../styles/Notes.module.css';
import Modal from './Modal';
import ScrollBox from './ScrollBox';

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
      guid: uuidv4(),
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
          cols='30'
          autoFocus={true}
          className={styles.textInput}
          value={text}
          onChange={handleTextChange}
        />
      </Modal>
    );
  }

  function buildNotes() {
    return notes.map((note) => (
      <li
        key={note.guid}
        id={note.guid}
        className={`${styles.note} color${note.colorCode}`}
      >
        <div className={styles.text}>
          {note.text}
        </div>
      </li>
    ));
  }

  return (
    <Fragment>
      <section className={styles.main}>
        <ScrollBox>
          <ul>
            {buildNotes()}
          </ul>
        </ScrollBox>
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
