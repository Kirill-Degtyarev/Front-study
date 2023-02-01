import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import Dotdotdot from 'react-dotdotdot';
import SvgGenerator from '../../SvgGenerator/SvgGenerator';

import styles from './CardItem.module.css';

const CardItem = ({ id, indexId, dataItem, bgImg, isReversed, itemType }) => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const bodyInfoRef = useRef(null);

  const getDate = (date) => {
    const newDate = new Date(Number(date));
    const day =
      newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
    const month =
      newDate.getMonth() < 10
        ? '0' + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const fullDate = day + '.' + month + '.' + year;
    return fullDate;
  };

  const getStatus = (date) => {
    const currentDate = new Date();
    if (new Date(Number(date)) < currentDate) return 'Завершено';
    if (new Date(Number(date)) > currentDate) return 'Предложение активно';
  };

  // const getCountString = (num) => {
  //   if (bodyInfoRef.current) {
  //     const currentEl = bodyInfoRef.current;
  //     const currentElHeight = bodyInfoRef.current.clientHeight;
  //     const childrenElHeight =
  //       currentEl.childNodes[0].clientHeight +
  //       currentEl.childNodes[1].clientHeight;
  //     const differenceHeight = currentElHeight - childrenElHeight;
  //     // const lineHeight = currentEl.childNodes[1].styles.lineHeight;
  //     console.log(currentEl.childNodes[1]);
  //   }
  // };

  // getCountString();

  const itemClass = classNames(styles['card-list__item'], {
    [styles['bg-img']]: bgImg && itemType === 'news',
    [styles['card-promotions']]: itemType === 'promotions',
    [styles['card-promotions__reversed']]: isReversed,
    [styles['card-grid__1']]: (indexId + 1) % 10 === 1 && itemType === 'news',
    [styles['card-grid__2']]: (indexId + 1) % 10 === 2 && itemType === 'news',
    [styles['card-grid__3']]: (indexId + 1) % 10 === 3 && itemType === 'news',
    [styles['card-grid__4']]: (indexId + 1) % 10 === 4 && itemType === 'news',
    [styles['card-grid__5']]: (indexId + 1) % 10 === 5 && itemType === 'news',
    [styles['card-grid__6']]: (indexId + 1) % 10 === 6 && itemType === 'news',
    [styles['card-grid__7']]: (indexId + 1) % 10 === 7 && itemType === 'news',
    [styles['card-grid__8']]: (indexId + 1) % 10 === 8 && itemType === 'news',
    [styles['card-grid__9']]: (indexId + 1) % 10 === 9 && itemType === 'news',
  });

  return (
    <li className={itemClass} id={id}>
      <div className={styles['card-list__item-img']}>
        <img
          src={dataItem.image ? dataItem.image : dataItem.link}
          alt="images"
        />
      </div>
      <div className={styles['card-list__item-body']}>
        <div
          className={`${styles['item-body__star']} ${
            isFavorites ? styles['favorites-card'] : ''
          }`}
          onClick={() => {
            setIsFavorites((prev) => !prev);
          }}>
          <SvgGenerator id="star" />
        </div>
        <div className={styles['item-body__info']} ref={bodyInfoRef}>
          <h2 className={styles['item-body__info-title']}>{dataItem.title}</h2>
          <Dotdotdot clamp={4}>
            <p className={styles['item-body__info-subtitle']}>
              {dataItem.previewtext}
            </p>
          </Dotdotdot>
        </div>
        <div className={styles['item-body__footer']}>
          <span
            className={
              styles['item-body__footer-date'] + ' ' + 'fz13-regent-gray'
            }>
            {getDate(dataItem.pubDate)}
            {itemType === 'promotions' && (
              <span>{getStatus(dataItem.pubDate)}</span>
            )}
          </span>
          <div className={styles['item-body__footer-action']}>
            <div
              className={`${styles['footer-action__like']} ${
                styles['footer-action']
              } ${isLiked ? styles['liked-card'] : ''}`}
              onClick={() => {
                setIsLiked((prev) => !prev);
              }}>
              <SvgGenerator id="like" />
              <span className={'fz13-regent-gray'}>18</span>
            </div>
            {itemType === 'news' && (
              <div
                className={
                  styles['footer-action__comments'] +
                  ' ' +
                  styles['footer-action']
                }>
                <SvgGenerator id="comments" />
                <span className={'fz13-regent-gray'}>35</span>
              </div>
            )}
            <div
              className={
                styles['footer-action__view'] + ' ' + styles['footer-action']
              }>
              <SvgGenerator id="view" />
              <span className={'fz13-regent-gray'}>50</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardItem;
