import React, { useEffect, useRef, useState } from 'react';

import styles from './MenuBurgerButton.module.css';

const MenuBurgerButton = () => {
  const [windowWidth, setWindowWidth] = useState(window.screen.width);
  const ref = useRef(null);

  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.screen.width);
    };

    if (ref.current && windowWidth >= 375 && windowWidth <= 768) {
      ref.current.parentNode.style.display = 'flex';
    } else {
      ref.current.parentNode.style.display = 'none';
    }

    return () => {
      window.onresize = false;
    };
  }, [windowWidth]);

  return (
    <div ref={ref} className={styles.burger}>
      {[...new Array(3)].map((_, index) => (
        <span key={index}></span>
      ))}
    </div>
  );
};

export default MenuBurgerButton;
