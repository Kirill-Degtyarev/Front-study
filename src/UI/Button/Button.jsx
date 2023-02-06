import React from 'react';

import styles from './Button.module.css';

const Button = ({ children, onClickHandler, color, type }) => {
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
      defaultValue={children}
    />
  );
};

export default Button;
