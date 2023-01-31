import React, { useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './PageNews.module.css';
import NewsItem from '../NewsItem/NewsItem';
import Button from '../../UI/Button';

const PageNews = ({ data, itemType, setPathName }) => {
  const [counterItem, setCounterItem] = useState(5);
  const menuList = useRef(null);

  const handleActiveTab = (e) => {
    if (menuList.current) {
      [...menuList.current.childNodes].forEach((el) => {
        if (el.classList.contains(styles['menu-list__item-active'])) {
          el.classList.remove(styles['menu-list__item-active']);
        }
      });
      setPathName(e.target.id);
      setCounterItem(5);
      e.target.classList.add(styles['menu-list__item-active']);
    }
  };

  const sortNews =
    data &&
    data
      .sort((a, b) => {
        return new Date(Number(a.pubDate)) - new Date(Number(b.pubDate));
      })
      .slice(0, counterItem)
      .map((item, index) => (
        <NewsItem
          key={item.id}
          id={item.id}
          title={item.title}
          bgImg={(index + 1) % 3 === 0}
          itemType={itemType}
          subtitle={item.previewtext}
          imgUrl={item.image ? item.image : item.link}
          date={item.pubDate}
        />
      ));

  const handleChangeCounterItem = () => {
    setCounterItem((prev) => prev + 5);
  };

  return (
    <section className={styles.page__news}>
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
        <div className={styles.news__main}>
          <div className={styles['news-main__menu']}>
            <ul className={styles['news-main__menu-list']} ref={menuList}>
              <li
                className={
                  styles['menu-list__item'] +
                  ' ' +
                  styles['menu-list__item-active']
                }
                id="news"
                onClick={(e) => {
                  handleActiveTab(e);
                }}>
                Новости
              </li>
              <li
                className={styles['menu-list__item']}
                id="promotions"
                onClick={(e) => {
                  handleActiveTab(e);
                }}>
                Акции
              </li>
            </ul>
          </div>
          <div className={styles['news-main__body']}>
            <ul className={styles['news-list']}>{sortNews}</ul>
          </div>
          {data && counterItem !== data.length && (
            <div className={styles['news-main__button']}>
              <Button onClickHandler={handleChangeCounterItem}>
                Смотреть ещё
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageNews;
