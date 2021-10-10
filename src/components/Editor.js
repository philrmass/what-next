//import { dateToEdit, editToDate, editToTime, timeToEdit } from '../utilities/events';
import { dateToEdit, timeToEdit } from '../utilities/events';
//import { moveTimeToDate } from '../utilities/time';
import styles from './Editor.module.css';

import Dialog from './Dialog';

export default function Editor({
  event,
  close,
  //update,
  //remove,
}) {
  /*
  function handleTextChange(text) {
    setActiveEvent((event) => ({
      ...event,
      text,
    }));
  }

*/
  const handleDateChange = (text) => {
    console.log('handleDateChange', text);
    /*
    const date = editToDate(text, event.date);
    setActiveEvent((event) => ({
      ...event,
      date,
      start: moveTimeToDate(event.start, date),
      end: moveTimeToDate(event.end, date),
    }));
    */
  };

  function handleStartChange(text) {
    console.log('handleStartChange', text);
    /*
    setActiveEvent((event) => ({
      ...event,
      start: editToTime(text, event.date),
    }));
    */
  }

  /*
  function handleEndChange(text) {
    setActiveEvent((event) => ({
      ...event,
      end: editToTime(text, event.date),
    }));
  }
  */

  return (
    <Dialog isOpen={Boolean(event)}>
      <input
        id='date'
        type='date'
        value={dateToEdit(event?.at)}
        onChange={(e) => handleDateChange(e.target.value)}
        className={styles.dateInput}
      />
      <div>
        <label htmlFor='date'>Date</label>
      </div>
      <input
        id='start'
        type='time'
        value={timeToEdit(event?.at)}
        onChange={(e) => handleStartChange(e.target.value)}
        className={styles.timeInput}
      />
      <div>
        <label htmlFor='start'>Start</label>
      </div>
      <div>{event?.text}</div>
      <button className={styles.button} onClick={close}>Close</button>
    </Dialog>
  );
  /*
    <section className={styles.main}>
      <textarea
        rows='2'
        cols='24'
        autoFocus={true}
        className={styles.textInput}
        value={event.text}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <div className={styles.times}>
        <div>
          <label htmlFor='start'>Start</label>
        </div>
        <div>
          { event.start &&
            <label htmlFor='end'>End</label>
          }
        </div>
        <div>
          <input
            type='time'
            value={timeToEdit(event.start)}
            onChange={(e) => handleStartChange(e.target.value)}
            className={styles.timeInput}
          />
        </div>
        <div>
          { event.start &&
            <input
              type='time'
              value={timeToEdit(event.end)}
              onChange={(e) => handleEndChange(e.target.value)}
              className={styles.timeInput}
            />
          }
        </div>
      </div>
    </section>
  */
}
