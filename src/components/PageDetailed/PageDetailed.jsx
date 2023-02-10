import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Menu from '../Menu/Menu';

import styles from './PageDetailed.module.css';

const PageDetailed = () => {
  const { pathname } = useLocation();

  /**
   * При монтировании компонента вычисляется ширина окна и от этого зависит
   * показывается ли кнопка бургер меню. При размонтировании компонента
   * кнопка пропадает, так как она нам нужна только в этом компоненте.
   */
  useEffect(() => {
    const menu = document.getElementById('burgerMenu');
    if (window.screen.width >= 320 && window.screen.width <= 1279) {
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
            {pathname === '/profile'
              ? 'Редактировать профиль'
              : 'Заголовок страницы'}
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
