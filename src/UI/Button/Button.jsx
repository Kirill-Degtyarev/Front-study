import React from 'react';

import styles from './Button.module.css';

const Button = ({ children, onClickHandler, color, type, disabled }) => {
  return (
    <input
      type={type}
      className={`${styles.button} ${styles[color]}`}
      onClick={
        onClickHandler
          ? () => {
              onClickHandler();
            }
          : () => {}
      }
      value={children}
      disabled={disabled}
    />
  );
};

export default Button;
