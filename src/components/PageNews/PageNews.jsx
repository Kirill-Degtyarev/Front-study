import React from 'react';

import styles from './PageNews.module.css';

const PageNews = ({ data }) => {
  return (
    <section className={`${styles.page__news} ${styles.news}`}>
      <div className={styles.news__body}>
        <div className={styles.news__top}>
          <h1 className={styles['news__top-title']}>
            Получите <span>максимум</span> от отдела продаж
          </h1>
          <p className={styles['news__top-description']}>
            amoCRM — это полный набор инструментов, которые раскроют потенциал
            вашего отдела продаж и повысят его эффективность. Считается лучшей
            CRM-системой по версии&nbsp;
            <a href="https://crmrating.ru/" target="_blank">
              crmrating.ru
            </a>
          </p>
        </div>
        <div className={styles.news__main}></div>
      </div>
    </section>
  );
};

export default PageNews;
