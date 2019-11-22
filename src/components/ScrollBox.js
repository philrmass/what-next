import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ScrollBox.module.css';

function ScrollBox({
  selectElement,
  onSwipe,
  onDragStart,
  onDragOver,
  onDragStop,
  children,
}) {
  const container = useRef(null);
  const [top, setTop] = useState(0);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [startT, setStartT] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [lastT, setLastT] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const yMin = getYMin();
    if (top < yMin) {
      setTop(yMin);
    }
  }, [children]);

  function handleStart(event) {
    const x = getX(event);
    const y = getY(event);
    const t = Date.now();
    setStartX(x);
    setStartY(y);
    setStartT(t);
    setLastY(y);
    setLastT(t);

    const { id, touch } = findElementId(event.target);
    if (touch) {
      onDragStart(id);
      setIsDragging(true);
    } else {
      const longPressMs = 750;
      setPressTimer(setTimeout(() => selectElement(id), longPressMs));
    }
  }

  function handleEnd() {
    event.preventDefault();
    if (isDragging) {
      onDragStop();
      setIsDragging(false);
    } else {
      const totalY = getTotalY(lastY);
      const totalT = getTotalT(lastT);
      if (totalT > 0) {
        const velocity = totalY / totalT;
        startMomentum(velocity);
      }

      clearTimer();
      clearY();
    }
  }

  function handleMove(event) {
    if (isDragging) {
      const touch = event.touches[0];
      onDragOver(touch.clientX, touch.clientY);
    } else {
      const x = getX(event);
      const y = getY(event);
      const t = Date.now();
      const deltaY = getDeltaY(y);
      const totalX = getTotalX(x);

      detectSwipe(x, totalX);

      setOffsetY(deltaY);
      clearTimer(totalX, getTotalY(y));
      setLastY(y);
      setLastT(t);
    }
  }

  function findElementId(element) {
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

  function getX(event) {
    return event.touches[0].clientX;
  }

  function getY(event) {
    return event.touches[0].clientY;
  }

  function clearTimer(totalX = Infinity, totalY = Infinity) {
    const totalMax = 10;
    const hasMoved = Math.abs(totalX) > totalMax || Math.abs(totalY) > totalMax;
    if (pressTimer && hasMoved) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  }

  function startMomentum(velocity) {
    const decayMs = 0.997;
    const epsilon = 0.005;
    let lastTimestamp;
    let remainder = 0;

    function updateMomentum(timestamp) {
      let interval = 0;
      if (lastTimestamp) {
        interval = timestamp - lastTimestamp;
      }
      lastTimestamp = timestamp;

      if (Math.abs(velocity) > epsilon) {
        const offset = velocity * interval + remainder;
        const applied = Math.round(offset);
        remainder = offset - applied;
        setOffsetY(applied);

        const decay = Math.pow(decayMs, interval);
        velocity = decay * velocity;

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

  function getTotalX(x) {
    if (startX) {
      return x - startX;
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

  function detectSwipe(x, totalX) {
    const swipeX = 150;
    if (Math.abs(totalX) >= swipeX) {
      onSwipe(Math.sign(totalX));
      setStartX(x);
    }
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
  onSwipe: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragStop: PropTypes.func,
  children: PropTypes.object,
};

export default ScrollBox;
