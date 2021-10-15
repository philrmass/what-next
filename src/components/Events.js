import { useState } from 'react';
import cln from 'classnames';

import {
  getColor,
  getDefaultEvent,
  getDisplayDate,
  getDisplayTime,
  getUntil,
} from '../utilities/events';
import { useInterval } from '../utilities/hooks';
import styles from './Events.module.css';

import Editor from './Editor';
import Icon from './Icon';

export default function Events({
  events,
  order,
  update,
  remove,
}) {
  const oneMinute = 60000;
  const [now, setNow] = useState(Date.now());
  const [editing, setEditing] = useState(null);

  useInterval(() => setNow(Date.now()), oneMinute);

  const add = () => {
    setEditing(getDefaultEvent());
  };

  const removeEvent = (e, id) => {
    e.stopPropagation();
    remove(id);
  };

  const buildLogo = () => (
    <div className={styles.logo}>
      <svg viewBox='0 0 100 100' xmlns="http://www.w3.org/2000/svg">
        <path d="M17 7 h60 v20 h-60 v-20" />
        <path d="M27 29 h60 v20 h-60 v-20" />
        <path fill='rgb(128, 128, 128)' d="M31 33 h52 v12 h-52 v-12" />
        <path d="M22 51 h60 v20 h-60 v-20" />
        <path d="M17 73 h60 v20 h-60 v-20" />
      </svg>
      {/*
      */}
    </div>
  );

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

  return (
    <>
      <div className={styles.appName}>
        {buildLogo()}
        {'What Next'}
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
