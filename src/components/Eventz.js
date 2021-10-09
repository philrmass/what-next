import { getDisplayDate, getDisplayTime } from '../utilities/time';
import styles from './Eventz.module.css';

export default function Eventz({
  events,
  order,
  updateEvent,
}) {
  const all = getAll(events, order);
  console.log('ALL', all);

  return (
    <>
      <div className={styles.appName}>
        {`ARRAY [${Array.isArray(events)}]`}
      </div>
      <ul>
        {all.map(event => {
          console.log('TEXT', event.text);
          const date = getDisplayDate(event.at);
          const start = getDisplayTime(event.at);
          const end = getDisplayTime(0);
          const background = '#fdb';
          const style = { background };

          return (
            <li key={event.id} className={styles.event} style={style}>
              <div className={styles.until}>
                <div className={styles.untilText}>until</div>
              </div>
              <div className={styles.content}>
                <div className={styles.time}>
                  <div>
                    <div className={styles.date}>{date}</div>
                    <div className={styles.start}>{start}</div>
                    <div className={styles.end}>{end}</div>
                  </div>
                </div>
                <div className={styles.text}>{event.text}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function getAll(events, order) {
  if (Array.isArray(events)) {
    return events;
  }

  return order.map(guid => events[guid]);
}
