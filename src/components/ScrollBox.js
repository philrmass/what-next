import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ScrollBox.module.css';

function ScrollBox({
  children,
}) {
  const [top, setTop] = useState(0);
  //const [start, setStart] = useState(null);
  const [last, setLast] = useState(null);

  function handleStart(e) {
    //const yOffsetMin = box.clientHeight - box.scrollHeight;
    console.log('d', Math.round(e.touches[0].clientX), Math.round(e.touches[0].clientY));
    console.log('DE', e.currentTarget.clientHeight, e.currentTarget.scrollHeight);
    const pos = [e.touches[0].clientX, e.touches[0].clientY];
    //setStart(pos);
    setLast(pos);
  }

  function handleEnd() {
    //console.log('u');
    //setTop(0);
  }

  function handleMove(e) {
    const pos = [e.touches[0].clientX, e.touches[0].clientY];
    const diffY = pos[1] - last[1];
    setTop((top) => {
      const val = top + diffY;
      if (val > 0) {
        return 0;
      }
      return val;
    });
    console.log('m', Math.round(top));
    const p = e.currentTarget.parentNode;
    console.log('e', e.currentTarget.offsetHeight, e.currentTarget.clientHeight, e.currentTarget.scrollHeight);
    console.log('p', p.offsetHeight, p.clientHeight, p.scrollHeight);
    //console.log(`m (${Math.round(pos[0] - start[0])}, ${Math.round(pos[1] - start[1])}) <${Math.round(pos[0] - last[0])}, ${Math.round(pos[1] - last[1])}>`);
    setLast(pos);
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
