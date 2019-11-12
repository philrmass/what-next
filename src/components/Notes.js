import React, { Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../utilities/storage';
import uuidv4 from 'uuid/v4';
import styles from '../styles/Notes.module.css';
import ColorSelector from './ColorSelector';
import Modal from './Modal';
import ScrollBox from './ScrollBox';

function Notes({
  notes,
  updateNotes,
  isModalShown,
  showModal,
  closeModal,
}) {
  const container = useRef(null);
  const [lastColor, setLastColor] = useLocalStorage('whatNextLastColor', 0);
  const [activeNote, setActiveNote] = useState(createDefaultNote());
  const [dragStart, setDragStart] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  function handleTextChange(text) {
    setActiveNote((note) => ({
      ...note,
      text,
    }));
  }

  function handleColorChange(colorCode) {
    setLastColor(colorCode);
    setActiveNote((note) => ({
      ...note,
      colorCode,
    }));
  }

  function handleDragStart(guid) {
    setDragStart(guid);
    console.log('START', guid); // eslint-disable-line no-console
  }

  function handleDragOver(x, y) {
    setDragOver((guid) => {
      if (!guid) {
        guid = dragStart;
      }
      //console.log('OVER cont', container.current.childNodes[0].getBoundingClientRect());
      //console.log('OVER', x.toFixed(2), y.toFixed(2), '\n ', guid); // eslint-disable-line no-console
      return findElementId(container.current, guid, x, y);
    });
  }

  function handleDragStop() {
    console.log('STOP'); // eslint-disable-line no-console
  }

  function findElementId(parent, id, x, y) {
    const children = [...parent.childNodes];
    //console.log('FIND', parent.childNodes.length, '\n ', id);
    let index = children.findIndex((child) => child.id === id);
    const child = children[index];
    const last = children[index - 1];
    const next = children[index + 1];
    if (elementContains(child, x, y)) {
      console.log('SAME', child.id.slice(0, 4));
      return child.id;
    } else if (elementContains(last, x, y)) {
      console.log('MINUS', last.id.slice(0, 4));
      return last.id;
    } else if (elementContains(next, x, y)) {
      console.log('PLUS', next.id.slice(0, 4));
      return next.id;
    }
    for (const child of children) {
      if (elementContains(child, x, y)) {
        console.log('FOUND', child.id.slice(0, 4));
        return child.id;
      }
    }
    console.log('OTHER', id.slice(0, 4));
    return id;
  }

  function elementContains(elem, x, y) {
    if (!elem) {
      return false;
    }
    const rect = elem.getBoundingClientRect();
    const containsX = x > rect.left && x < rect.right;
    const containsY = y > rect.top && y < rect.bottom;

    return containsX && containsY;
  }

  function save() {
    const i = notes.findIndex((note) => note.guid === activeNote.guid);
    if (i >= 0) {
      updateNotes([...notes.slice(0, i), activeNote, ...notes.slice(i + 1)]);
    } else {
      const i = notes.findIndex((note) => activeNote.colorCode <= note.colorCode);
      const note = { ...activeNote, guid: uuidv4() };
      if (i >= 0) {
        updateNotes([...notes.slice(0, i), note, ...notes.slice(i)]);
      } else {
        updateNotes([...notes, note]);
      }
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
      colorCode: lastColor,
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
        <Fragment>
          <ColorSelector
            color={activeNote.colorCode}
            setColor={(code) => handleColorChange(code)}
          />
          <textarea
            rows='3'
            cols='24'
            autoFocus={true}
            className={`${styles.textInput} color${activeNote.colorCode}`}
            value={activeNote.text}
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </Fragment>
      </Modal>
    );
  }

  function buildNotes() {
    return notes.map((note) => (
      <li
        key={note.guid}
        id={note.guid}
        className={`${styles.note} color${note.colorCode}`}
        draggable='true'
      >
        <div className={styles.text}>
          {note.text}
        </div>
        <div className={styles.touch}>
          <div className={'touch'}>
          </div>
        </div>
      </li>
    ));
  }

  return (
    <Fragment>
      <section className={styles.main}>
        <ScrollBox
          selectElement={edit}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragStop={handleDragStop}
        >
          <ul ref={container}>
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
