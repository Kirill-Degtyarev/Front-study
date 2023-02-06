import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MenuBurgerButton.module.css';
import styled from '../Menu/Menu.module.css';

const MenuBurgerButton = () => {
  const [windowWidth, setWindowWidth] = useState(window.screen.width);
  const [path, setPath] = useState(window.location.pathname);
  const ref = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.screen.width);
      setPath(window.location.pathname);
    };
    if (ref.current) {
      changeHeader();
    }
    return () => {
      window.onresize = false;
    };
  }, [windowWidth, path]);

  const changeHeader = () => {
    if (ref.current) {
      const userInfoBody = ref.current.parentNode.parentElement.children[2];
      const menu = document.getElementById('menu');

      if (window.location.pathname !== '/') {
        if (windowWidth >= 375 && windowWidth <= 1280) {
          ref.current.parentNode.style.display = 'flex';
          userInfoBody?.classList.add('user-info__burger');
        }
        if (windowWidth > 1280 || window.location.pathname === '/') {
          ref.current.parentNode.style.display = 'none';
          userInfoBody.classList.remove('user-info__burger');
          menu?.classList.remove(styled['menu-mobile']);
        }
      } else {
        ref.current.parentNode.style.display = 'none';
        userInfoBody.classList.remove('user-info__burger');
        menu?.classList.remove(styled['menu-mobile']);
      }
    }
  };

  const openMenu = () => {
    const menu = document.getElementById('menu');
    if (!menu.classList.contains(styled['menu-mobile'])) {
      menu.classList.add(styled['menu-mobile']);
    }
  };

  return (
    <div ref={ref} className={styles.burger} onClick={() => openMenu()}>
      {[...new Array(3)].map((_, index) => (
        <span key={index}></span>
      ))}
    </div>
  );
};

export default MenuBurgerButton;
