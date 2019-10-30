import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ScrollBox.module.css';

function ScrollBox({
  children,
}) {
  const [top, setTop] = useState(0);
  const [startY, setStartY] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);

  function handleStart(e) {
    const y = getY(e);
    setStartY(y);
    setLastY(y);

    const id = e.target.id;
    const longPressMs = 750;
    setPressTimer(setTimeout(() => selectElement(id), longPressMs));
  }

  function handleEnd() {
    clearTimer();
    clearY();
  }

  function handleMove(e) {
    setOffset(e);
    setLastY(getY(e));
  }

  function clearTimer(totalY = Infinity) {
    const totalMax = 10;
    if (pressTimer && totalY > totalMax) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  }

  function clearY() {
    setStartY(null);
    setLastY(null);
  }

  function getY(event) {
    return event.touches[0].clientY;
  }

  function getDeltaY(event) {
    const y = getY(event);
    if (lastY) {
      return y - lastY;
    }
    return 0;
  }

  function getTotalY(event) {
    const y = getY(event);
    if (startY) {
      return y - startY;
    }
    return 0;
  }

  function getYMin(event) {
    const parent = event.currentTarget.parentNode;
    return parent.clientHeight - parent.scrollHeight;
  }

  function setOffset(event) {
    const deltaY = getDeltaY(event);
    const yMin = getYMin(event);
    const yMax = 0;
    setTop((top) => {
      const value = top + deltaY;
      if (value > yMax) {
        return yMax;
      } else if (value < yMin) {
        return yMin;
      }
      return value;
    });

    clearTimer(getTotalY(event));
  }

  function selectElement(id) {
    console.log('SELECT', id);
  }

  return (
    <section className={styles.container}>
      <div
        className={styles.content}
        style={{ top }}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {children}
      </div>
    </section>
  );
}

ScrollBox.propTypes = {
  children: PropTypes.object,
};

export default ScrollBox;
