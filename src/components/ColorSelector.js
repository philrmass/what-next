import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ColorSelector.module.css';

function ColorSelector({
  color,
  setColor,
}) {
  const colorCount = 12;

  return (
    <section className={styles.main}>
      <div className={styles.colors}>
        {[...Array(colorCount).keys()].map((code) => (
          <button
            key={code}
            className={`${styles.color} color${code}`}
            onClick={() => setColor(code)}
          >
          </button>
        ))}
      </div>
    </section>
  );
}

ColorSelector.propTypes = {
  color: PropTypes.number,
  setColor: PropTypes.func,
};

export default ColorSelector;
