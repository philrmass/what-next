import { useState } from 'react';
import cln from 'classnames';

import {
  getColor,
  getDefaultEvent,
  getDisplayDate,
  getDisplayTime,
  getUntil,
} from '../utilities/events';
import styles from './Events.module.css';

import Editor from './Editor';
import Icon from './Icon';

export default function Events({
  events,
  order,
  update,
  remove,
}) {
  const now = Date.now();
  const [editing, setEditing] = useState(null);

  const add = () => {
    setEditing(getDefaultEvent());
  };

  const removeEvent = (e, id) => {
    e.stopPropagation();
    remove(id);
  };

  const buildWhen = (event) => {
    const isPast = now > event.at;
    const date = getDisplayDate(event.at);
    const start = getDisplayTime(event.at);
    const end = getEndTime(event);

    if (isPast) {
      return (
        <button className={styles.remove} onClick={(e) => removeEvent(e, event.id)}>
          <Icon name='cross' />
        </button>
      );
    }

    return (
      <div>
        <div>{date}</div>
        <div className={styles.time}>
          <div>{start}</div>
          <div>{end}</div>
        </div>
      </div>
    );
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
          const until = getUntil(now, event.at);
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
                    {buildWhen(event)}
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
      <button className={cln('iconButton', styles.add)} onClick={add}>
        <Icon name='plus' />
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
