import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ScrollBox.module.css';

function ScrollBox({
  selectElement,
  children,
}) {
  const container = useRef(null);
  const [top, setTop] = useState(0);
  const [startY, setStartY] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);

  useEffect(() => {
    const yMin = container.current.clientHeight - container.current.scrollHeight;
    if (top < yMin) {
      setTop(yMin);
    }
  }, [children]);

  function handleStart(e) {
    const y = getY(e);
    setStartY(y);
    setLastY(y);

    const { id, touch } = findElementId(e);
    if (touch) {
      console.log('TOUCH', id);
    } else {
      const longPressMs = 750;
      setPressTimer(setTimeout(() => selectElement(id), longPressMs));
    }
  }

  function findElementId(e) {
    let element = e.target;
    let id;
    let touch = false;
    do {
      id = element.id;
      touch = touch || element.className === 'touch';
      element = element.parentNode;
    } while (!id && element);

    return {
      id,
      touch,
    };
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
    if (pressTimer && Math.abs(totalY) > totalMax) {
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

  return (
    <section
      className={styles.container}
      ref={container}
    >
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
  selectElement: PropTypes.func,
  children: PropTypes.object,
};

export default ScrollBox;
