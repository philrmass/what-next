import { getDisplayDate, getDisplayTime } from '../utilities/time';
import { getUntilz } from '../utilities/events';
import styles from './Eventz.module.css';

export default function Eventz({
  events,
  order,
  update,
  remove,
}) {
  return (
    <>
      <div className={styles.appName}>
        {'WhatNext'}
      </div>
      <ul>
        {order.map(id => {
          const event = events[id];
          const now = Date.now();
          const until = getUntilz(now, event.at);
          const date = getDisplayDate(event.at);
          const start = getDisplayTime(event.at);
          const end = getEndTime(event);
          const background = '#bdf';
          const style = { background };

          return (
            <li key={event.id} className={styles.event} style={style}>
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
    </>
  );
}

const getEndTime = (event) => {
  if (event.duration >= 0) {
    return `- ${getDisplayTime(event.at + event.duration)}`;
  }
};
