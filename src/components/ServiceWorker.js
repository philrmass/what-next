import { useEffect, useState } from 'react';

import styles from './ServiceWorker.module.css';

import Dialog from './Dialog';

export default function ServiceWorker({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => navigator.serviceWorker.addEventListener('message', event => {
    setMessages(msgs => [...msgs, event.data]);
  }), []);

  const checkNotificationPromise = () => {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  };

  const send = () => {
    console.log('send', typeof navigator.serviceWorker.controller.postMessage);
    navigator.serviceWorker.controller.postMessage('yo');
  };

  const check = () => {
    // function to actually ask the permissions
    function handlePermission(permission) {
      // set the button to shown or hidden, depending on what the user answers
      setMessages(msgs => [...msgs, `permission: ${permission}`]);
      console.log('perm', permission);
      if(Notification.permission === 'granted') {
        console.log('granted');
        const notifTitle = 'hello there';
        const notifBody = 'Created by me';
        //const notifImg = `data/img/${games[randomItem].slug}.jpg`;
        const options = {
          body: notifBody,
          //icon: notifImg,
        };
        new Notification(notifTitle, options);
      }
      if(Notification.permission === 'denied' || Notification.permission === 'default') {
        //notificationBtn.style.display = 'block';
        console.log('block');
      } else {
        //notificationBtn.style.display = 'none';
        console.log('none');
      }
    }

    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
    } else {
      if(checkNotificationPromise()) {
        Notification.requestPermission()
          .then((permission) => {
            handlePermission(permission);
          });
      } else {
        Notification.requestPermission((permission) => {
          handlePermission(permission);
        });
      }
    }
  };


  const notify = () => {
    //var img = '/to-do-notifications/img/icon-128.png';
    var text = 'HEY! Your task "' + 'yo' + '" is now overdue.';
    //var notification = new Notification('To do list', { body: text, icon: null });
    var notification = new Notification('To do list', { body: text });
    console.log('not', notification);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Dialog isOpen={isOpen}>
        <div className={styles.content} onClick={() => setIsOpen(false)}>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => send()}>Send</button>
          <button className={styles.button} onClick={() => check()}>Check</button>
          <button className={styles.button} onClick={() => notify()}>Notify</button>
          <button className={styles.button} onClick={() => setMessages([])}>Clear</button>
          <button className={styles.button} onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Dialog>
    </>
  );
}
