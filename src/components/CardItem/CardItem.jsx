import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Dotdotdot from 'react-dotdotdot';
import SvgGenerator from '../../SvgGenerator/SvgGenerator';

import styles from './CardItem.module.css';
import ActionDate from '../../Action/ActionDate';

const CardItem = ({ indexId, dataItem, bgImg, isReversed, itemType }) => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lines, setLines] = useState(0);
  const bodyInfoRef = useRef(null);

  /**
   * При рендере компонента ведётся рассчёт количества строк description,
   * которые должны быть обрезаны. За основу берётся высота родительского
   * блока из неё вычитается высота description и ведутся расчёты лишних строк
   */
  useEffect(() => {
    if (bodyInfoRef.current) {
      const isElementBg =
        bodyInfoRef.current.parentNode.parentNode.classList.contains(
          styles['bg-img'],
        );
      const infoBodyHeight = bodyInfoRef.current.offsetHeight;
      const descriptionHeight = bodyInfoRef.current.children[1].offsetHeight;
      const titleHeight = bodyInfoRef.current.children[0].offsetHeight;
      const counterLine = isElementBg
        ? Math.round(descriptionHeight / 18)
        : Math.round(descriptionHeight / 22);
      const extraLines = isElementBg
        ? Math.ceil(
            Math.abs((infoBodyHeight - titleHeight - descriptionHeight) / 22),
          ) + 1
        : Math.ceil(
            Math.abs((infoBodyHeight - titleHeight - descriptionHeight) / 22),
          );

      if (
        counterLine - extraLines > 0 &&
        infoBodyHeight - titleHeight - descriptionHeight < 0
      ) {
        setLines(counterLine - extraLines);
      }
    }
  }, []);

  const itemClass = classNames(styles['card-list__item'], {
    [styles['bg-img']]: bgImg && itemType === 'news',
    [styles['card-news']]: itemType === 'news',
    [styles['card-promotions']]: itemType === 'promotions',
    [styles['card-promotions__reversed']]: isReversed,
    [styles['card-grid__1']]: indexId % 10 === 0 && itemType === 'news',
    [styles['card-grid__2']]: indexId % 10 === 1 && itemType === 'news',
    [styles['card-grid__3']]: indexId % 10 === 2 && itemType === 'news',
    [styles['card-grid__4']]: indexId % 10 === 3 && itemType === 'news',
    [styles['card-grid__5']]: indexId % 10 === 4 && itemType === 'news',
    [styles['card-grid__6']]: indexId % 10 === 5 && itemType === 'news',
    [styles['card-grid__7']]: indexId % 10 === 6 && itemType === 'news',
    [styles['card-grid__8']]: indexId % 10 === 7 && itemType === 'news',
    [styles['card-grid__9']]: indexId % 10 === 8 && itemType === 'news',
  });

  return (
    <li className={itemClass}>
      <div className={styles['item-img']}>
        {itemType === 'news' ? (
          <Link to={`/news/${dataItem.id}`}>
            <img
              src={dataItem.image ? dataItem.image : dataItem.link}
              alt="images"
            />
          </Link>
        ) : (
          <img
            src={dataItem.image ? dataItem.image : dataItem.link}
            alt="images"
          />
        )}
      </div>
      <div className={styles['item-body']}>
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
          <h2 className={styles['item-body__info-title']}>
            {itemType === 'news' ? (
              <Link to={`/news/${dataItem.id}`}>{dataItem.title}</Link>
            ) : (
              dataItem.title
            )}
          </h2>
          <Dotdotdot clamp={lines}>
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
            {ActionDate.getFullDate(dataItem.pubDate, 'dd/mm/yy')}
            {itemType === 'promotions' && (
              <span>{ActionDate.getStatusDate(dataItem.pubDate)}</span>
            )}
          </span>
          <div className={styles['item-body__footer-action']}>
            <div
              className={`${styles['item-action__like']} ${
                styles['item-action']
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
                  styles['item-action__comments'] + ' ' + styles['item-action']
                }>
                <SvgGenerator id="comments" />
                <span className={'fz13-regent-gray'}>35</span>
              </div>
            )}
            <div
              className={
                styles['item-action__view'] + ' ' + styles['item-action']
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
