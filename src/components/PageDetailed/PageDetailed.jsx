import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../Menu/Menu';

import styles from './PageDetailed.module.css';

const PageDetailed = () => {
  return (
    <section className={styles['page-detailed']}>
      <div className={styles['page-detailed__body']}>
        <div className={styles['detailed-body__menu']}>
          <Menu />
        </div>
        <div className={styles['detailed-body__outlet']}>
          <h1 className={styles.outlet__title}>Заголовок&nbsp;страницы</h1>
          <div className={styles.outlet__body}>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageDetailed;
