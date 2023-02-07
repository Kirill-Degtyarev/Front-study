import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Menu from '../Menu/Menu';

import styles from './PageDetailed.module.css';

const PageDetailed = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const menu = document.getElementById('burgerMenu');
    if (window.screen.width >= 375 && window.screen.width <= 1280) {
      menu.parentNode.children[2].classList.add('user-info__burger');
      menu.style.display = 'flex';
    }
    return () => {
      menu.parentNode.children[2].classList.remove('user-info__burger');
      menu.style.display = 'none';
    };
  }, []);

  return (
    <section className={styles['page__detailed']}>
      <div className={styles['detailed-body']}>
        <div className={styles['detailed-body__menu']}>
          <Menu />
        </div>
        <div className={styles['detailed-body__outlet']}>
          <h1 className={styles.outlet__title}>
            {
              pathname === '/profile'
                ? 'Редактировать профиль'
                : // <>Редактировать профиль</>
                  'Заголовок страницы'
              // <>Заголовок страницы</>
            }
          </h1>
          <div className={styles.outlet__body}>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageDetailed;
