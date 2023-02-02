import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './PageDetailed.module.css';

const PageDetailed = () => {
  return (
    <div className={styles.ddd}>
      <h1>Заголовок&nbsp;страницы</h1>
      <Outlet />
    </div>
  );
};

export default PageDetailed;
