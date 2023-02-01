import React, { useRef, useState } from 'react';

import CardItem from '../CardItem/CardItem';
import Button from '../../UI/Button';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

import styles from './PageNews.module.css';

const PageNews = ({ isLoaded, data, itemType, setPathName }) => {
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

  const sortCard =
    data &&
    data
      .sort((a, b) => {
        return new Date(Number(a.pubDate)) - new Date(Number(b.pubDate));
      })
      .slice(0, counterItem)
      .map((item, index) => (
        <CardItem
          key={item.id}
          indexId={index}
          dataItem={item}
          bgImg={(index + 1) % 3 === 0}
          isReversed={itemType === 'promotions' && (index + 1) % 2 === 0}
          itemType={itemType}
        />
      ));

  const skeleton = [...new Array(5)].map((_, index) => (
    <li className={styles.skeleton__body} key={index}>
      <CardSkeleton />
    </li>
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
          <p
            className={
              'fz15-regent-gray' + ' ' + styles['news__top-description']
            }>
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
                  'fz15-regent-gray' +
                  ' ' +
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
                className={'fz15-regent-gray' + ' ' + styles['menu-list__item']}
                id="promotions"
                onClick={(e) => {
                  handleActiveTab(e);
                }}>
                Акции
              </li>
            </ul>
          </div>
          <div className={styles['news-main__body']}>
            <ul className={styles['card-list']}>
              {isLoaded ? sortCard : skeleton}
            </ul>
          </div>
          {data && counterItem < data.length && (
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