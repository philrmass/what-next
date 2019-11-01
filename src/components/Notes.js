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
  showModal,
  closeModal,
}) {
  const [activeNote, setActiveNote] = useState(createDefaultNote());

  function handleTextChange(text) {
    setActiveNote((note) => ({
      ...note,
      text,
    }));
  }

  function save() {
    const i = notes.findIndex((note) => note.guid === activeNote.guid);
    if (i >= 0) {
      updateNotes([...notes.slice(0, i), activeNote, ...notes.slice(i + 1)]);
    } else {
      const note = { ...activeNote, guid: uuidv4() };
      updateNotes([...notes, note]);
    }
    setActiveNote(createDefaultNote());
    closeModal();
  }

  function edit(guid) {
    const note = notes.find((note) => note.guid === guid);
    setActiveNote({ ...note });
    showModal();
  }

  function remove() {
    const i = notes.findIndex((note) => note.guid === activeNote.guid);
    if (i >= 0) {
      updateNotes([...notes.slice(0, i), ...notes.slice(i + 1)]);
    }
    setActiveNote(createDefaultNote());
    closeModal();
  }

  function cancel() {
    setActiveNote(createDefaultNote());
    closeModal();
  }

  function createDefaultNote() {
    return {
      text: '',
      guid: null,
      colorCode: 0,
    };
  }

  function buildModalButtons() {
    const isEditing = Boolean(activeNote.guid);
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
        close={cancel}
      >
        <textarea
          rows='3'
          cols='30'
          autoFocus={true}
          className={styles.textInput}
          value={activeNote.text}
          onChange={(e) => handleTextChange(e.target.value)}
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
        <ScrollBox
          selectElement={edit}
        >
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
