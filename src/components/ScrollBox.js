import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ScrollBox.module.css';

function ScrollBox({
  selectElement,
  children,
}) {
  const intervalMs = 33;
  const container = useRef(null);
  const [top, setTop] = useState(0);
  const [startY, setStartY] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [lastT, setLastT] = useState(null);
  const [velocityY, setVelocityY] = useState(0);
  const [pressTimer, setPressTimer] = useState(null);
  const [momentumInterval, setMomentumInterval] = useState(null);

  useEffect(() => {
    const yMin = getYMin();
    if (top < yMin) {
      setTop(yMin);
    }
  }, [children]);

  function handleStart(event) {
    const y = getY(event);
    setStartY(y);
    setLastY(y);

    const { id, touch } = findElementId(event);
    if (touch) {
      //??? add drag and drop
    } else {
      const longPressMs = 750;
      setPressTimer(setTimeout(() => selectElement(id), longPressMs));
    }

    setMomentumInterval((interval) => {
      clearInterval(interval);
      return setInterval(applyVelocity, intervalMs);
    });
  }

  function handleEnd() {
    clearTimer();
    clearY();
  }

  function handleMove(event) {
    const y = getY(event);
    const t = Date.now();
    const deltaY = getDeltaY(y);
    const deltaT = getDeltaT(t);

    setOffsetY(deltaY);
    updateVelocity(deltaY, deltaT);

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

  function getDeltaT(t) {
    if (lastT) {
      return t - lastT;
    }
    return 1;
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

  function updateVelocity(deltaY, deltaT) {
    const fraction = 0.5;
    const velocity = deltaY / deltaT;
    setVelocityY((vy) => fraction * velocity + (1.0 - fraction) * vy);
  }

  function applyVelocity() {
    const ratio = 0.95;
    const epsilon = 0.01;
    const off = -velocityY * intervalMs;
    setOffsetY(off);
    setVelocityY((vy) => {
      if (Math.abs(vy) < epsilon) {
        setMomentumInterval((interval) => {
          clearInterval(interval);
          return null;
        });
      }
      return ratio * vy;
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
