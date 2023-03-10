import React, { useRef, useState } from 'react';

import CardItem from '../CardItem/CardItem';
import Button from '../../UI/Button/Button';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

import styles from './PageNews.module.css';

const PageNews = ({ isLoaded, data, itemType, setPathName }) => {
  const [counterItem, setCounterItem] = useState(5);
  const menuList = useRef(null);

  /**
   * Изменение активных вкладок "Новости"/"Акции"
   **/
  const handleActiveTab = (e) => {
    if (menuList.current) {
      [...menuList.current.childNodes].forEach((el) => {
        if (el.classList.contains(styles['menu-list__item-active'])) {
          el.classList.remove(styles['menu-list__item-active']);
        }
      });
      setPathName('/' + e.target.id);
      setCounterItem(5);
      e.target.classList.add(styles['menu-list__item-active']);
    }
  };

  /**
   * Сортировка данных по времени и колличеству
   */

  const sortCard =
    data &&
    data
      .sort((a, b) => {
        return new Date(Number(a.pubDate)) - new Date(Number(b.pubDate));
      })
      .slice(0, counterItem)
      .map((item) => (
        <CardItem
          key={item.id}
          dataItem={item}
          itemType={itemType}
          path={itemType === 'news' ? `/news/${item.id}` : ''}
          status={itemType === 'promotions'}
          comments={itemType === 'news'}
        />
      ));

  /**
   * Loader для карточек
   */
  const skeleton = [...new Array(5)].map((_, index) => (
    <li className={styles.skeleton__body} key={index}>
      <CardSkeleton />
    </li>
  ));

  /**
   * Увеличение показываемых новостей
   */
  const handleChangeCounterItem = () => {
    if (counterItem < data.length) setCounterItem((prev) => prev + 5);
  };

  return (
    <section className={styles.page__news}>
      <div className={styles.news__body}>
        <div className={styles.news__top}>
          <h1 className={styles['news-top__title']}>
            Получите <span>максимум</span> от отдела продаж
          </h1>
          <p className={styles['news-top__description']}>
            amoCRM — это полный набор инструментов, которые раскроют потенциал
            вашего отдела продаж и повысят его эффективность. Считается лучшей
            CRM-системой по версии&nbsp;
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
          <div className={styles['news-main__cards']}>
            <ul className={styles['card-list']}>
              {isLoaded ? sortCard : skeleton}
            </ul>
          </div>
          {/**
           * Кнопка показывается только когда количество новостей или акций
           * превышает количество показываемых карточек, в ином случае она
           * пропадает. В табе акции кнопка показывается для правильного
           * pixelperfect, но её состояние disabled зависит от количества акций.
           */}
          {data && counterItem < data.length && (
            <div className={styles['news-main__button']}>
              <Button
                onClickHandler={handleChangeCounterItem}
                color="blue"
                type="button"
                disabled={false}>
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
