import { useState } from 'react';

import {
  getColor,
  getDefaultEvent,
  getDisplayDate,
  getDisplayTime,
  getUntil,
} from '../utilities/events';
import styles from './Events.module.css';

import Editor from './Editor';

export default function Events({
  events,
  order,
  update,
  remove,
}) {
  const [editing, setEditing] = useState(null);
  const [showColors, setShowColors] = useState(false); //??? remove after testing

  const add = () => {
    setEditing(getDefaultEvent());
  };

  //??? fix app name, add app icon
  //??? redo colors each minute
  return (
    <>
      <div className={styles.appName} onClick={() => setShowColors(true)}>
        {'WhatNext'}
      </div>
      <ul>
        {order.map(id => {
          const event = events[id];
          const now = Date.now();
          const until = getUntil(now, event.at);
          const date = getDisplayDate(event.at);
          const start = getDisplayTime(event.at);
          const end = getEndTime(event);
          const background = getColor(now, event.at);
          const style = { background };

          return (
            <li
              key={event.id}
              className={styles.event}
              style={style}
              onClick={() => setEditing({ ...event })}
            >
              <div className={styles.untilText}>{until}</div>
              <div className={styles.layout}>
                <div className={styles.until}></div>
                <div className={styles.content}>
                  <div className={styles.when}>
                    <div>
                      <div>{date}</div>
                      <div className={styles.time}>
                        <div>{start}</div>
                        <div>{end}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.what}>
                    <div className={styles.text}>{event.text}</div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <button className={styles.button} onClick={add}>+</button>
      <Editor
        event={editing}
        setEvent={setEditing}
        update={update}
        remove={remove}
        close={() => setEditing(null)}
      />
      {showColors &&
      <div className={styles.colors} onClick={() => setShowColors(false)}></div>
      }
    </>
  );
}

const getEndTime = (event) => {
  if (event.duration > 0) {
    return `- ${getDisplayTime(event.at + event.duration)}`;
  }
};
