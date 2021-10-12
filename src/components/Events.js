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

  const add = () => {
    setEditing(getDefaultEvent());
  };

  //??? fix app name, add app icon
  //??? redo colors each minute
  return (
    <>
      <div className={styles.appName}>
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
      <button className={styles.button} onClick={add}>
        <svg id="plus" viewBox="0 0 100 100">
          <path d="M53 53 v14 h-6 v-14 h-14 v-6 h14 v-14 h6 v14 h14 v6 h-14" />
        </svg>
      </button>
      <Editor
        event={editing}
        setEvent={setEditing}
        update={update}
        remove={remove}
        close={() => setEditing(null)}
      />
    </>
  );
}

const getEndTime = (event) => {
  if (event.duration > 0) {
    return `- ${getDisplayTime(event.at + event.duration)}`;
  }
};
