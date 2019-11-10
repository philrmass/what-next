import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ScrollBox.module.css';

function ScrollBox({
  selectElement,
  children,
}) {
  //const intervalMs = 20;
  const container = useRef(null);
  const [top, setTop] = useState(0);
  const [startY, setStartY] = useState(null);
  const [startT, setStartT] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [lastT, setLastT] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);
  //const [, setMomentumInterval] = useState(null);

  useEffect(() => {
    const yMin = getYMin();
    if (top < yMin) {
      setTop(yMin);
    }
  }, [children]);

  function handleStart(event) {
    const y = getY(event);
    const t = Date.now();
    setStartY(y);
    setStartT(t);
    setLastY(y);
    setLastT(t);

    const { id, touch } = findElementId(event);
    if (touch) {
      //??? add drag and drop
    } else {
      const longPressMs = 750;
      setPressTimer(setTimeout(() => selectElement(id), longPressMs));
    }
  }

  function handleEnd() {
    const totalY = getTotalY(lastY);
    const totalT = getTotalT(lastT);
    if (totalT > 0) {
      const velocity = totalY / totalT;
      startMomentum(velocity);
    }

    clearTimer();
    clearY();
  }

  function handleMove(event) {
    const y = getY(event);
    const t = Date.now();
    const deltaY = getDeltaY(y);

    setOffsetY(deltaY);
    clearTimer(getTotalY(y));
    setLastY(y);
    setLastT(t);
  }

  function findElementId(event) {
    let element = event.target;
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

  function getY(event) {
    return event.touches[0].clientY;
  }

  function clearTimer(totalY = Infinity) {
    const totalMax = 10;
    if (pressTimer && Math.abs(totalY) > totalMax) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  }

  function startMomentum(velocity) {
    const ratio = 0.92;
    const epsilon = 0.005;
    let remainder = 0;
    let lastTimestamp;

    function updateMomentum(timestamp) {
      let interval = 0;
      if (lastTimestamp) {
        interval = timestamp - lastTimestamp;
      }
      lastTimestamp = timestamp;

      if (Math.abs(velocity) > epsilon) {
        const offset = velocity * interval + remainder;
        remainder = 0;
        velocity = ratio * velocity;
        const applied = Math.round(offset);
        remainder += offset - applied;
        setOffsetY(applied);
        window.requestAnimationFrame(updateMomentum);
      }
    }

    window.requestAnimationFrame(updateMomentum);
  }

  function getYMin() {
    if (container.current) {
      return container.current.clientHeight - container.current.scrollHeight;
    }
    return 0;
  }

  function clearY() {
    setStartY(null);
    setLastY(null);
  }

  function getDeltaY(y) {
    if (lastY) {
      return y - lastY;
    }
    return 0;
  }

  function getTotalY(y) {
    if (startY) {
      return y - startY;
    }
    return 0;
  }

  function getTotalT(t) {
    if (startT) {
      return t - startT;
    }
    return 0;
  }

  function setOffsetY(deltaY) {
    const yMin = getYMin();
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
