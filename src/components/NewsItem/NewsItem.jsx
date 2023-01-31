import React from 'react';
import classNames from 'classnames';
// import Dotdotdot from 'react-dotdotdot';
import SvgGenerator from '../../SvgGenerator/SvgGenerator';

import styles from './NewsItem.module.css';

const NewsItem = ({ id, title, bgImg, itemType, subtitle, imgUrl, date }) => {
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

  const itemClass = classNames(styles['news-list__item'], {
    [styles['bg-img']]: bgImg && itemType === 'news',
  });

  return (
    <li className={itemClass} id={id} data-imgurl={bgImg ? imgUrl : null}>
      <div className={styles['news-list__item-img']}>
        <img src={imgUrl} alt="images" />
      </div>
      <div className={styles['news-list__item-body']}>
        <div className={styles['item-body__star']}>
          <SvgGenerator id="star" />
        </div>
        <div className={styles['item-body__info']}>
          <h2 className={styles['item-body__info-title']}>{title}</h2>
          {/* <Dotdotdot clamp={2}> */}
          <p className={styles['item-body__info-subtitle']}>{subtitle}</p>
          {/* </Dotdotdot> */}
        </div>
        <div className={styles['item-body__footer']}>
          <span
            className={
              styles['item-body__footer-date'] +
              ' ' +
              styles['fz13-regent-gray']
            }>
            {getDate(date)}
          </span>
          <div className={styles['item-body__footer-action']}>
            <div
              className={
                styles['footer-action__like'] + ' ' + styles['action-icon']
              }>
              <SvgGenerator id="like" />
              <span className={styles['fz13-regent-gray']}>18</span>
            </div>
            {itemType === 'news' && (
              <div
                className={
                  styles['footer-action__comments'] +
                  ' ' +
                  styles['action-icon']
                }>
                <SvgGenerator id="comments" />
                <span className={styles['fz13-regent-gray']}>35</span>
              </div>
            )}
            <div
              className={
                styles['footer-action__view'] + ' ' + styles['action-icon']
              }>
              <SvgGenerator id="view" />
              <span className={styles['fz13-regent-gray']}>50</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
