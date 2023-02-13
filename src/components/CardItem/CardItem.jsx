import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Dotdotdot from 'react-dotdotdot';
import SvgGenerator from '../../SvgGenerator/SvgGenerator';

import styles from './CardItem.module.css';
import ActionDate from '../../Action/ActionDate';

const CardItem = ({ dataItem, itemType }) => {
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

  return (
    <li
      className={styles['card-list__item'] + ' ' + styles[`card-${itemType}`]}>
      {itemType === 'news' ? (
        <Link to={`/news/${dataItem.id}`}>
          <div className={styles['item-img']}>
            <img
              src={dataItem.image ? dataItem.image : dataItem.link}
              alt="images"
            />
          </div>
        </Link>
      ) : (
        <div className={styles['item-img']}>
          <img
            src={dataItem.image ? dataItem.image : dataItem.link}
            alt="images"
          />
        </div>
      )}
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
          <span className={styles['item-body__footer-date']}>
            {ActionDate.getFullDate(dataItem.pubDate, 'dd.MM.yyyy')}
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
              <span>18</span>
            </div>
            {itemType === 'news' && (
              <div
                className={
                  styles['item-action__comments'] + ' ' + styles['item-action']
                }>
                <SvgGenerator id="comments" />
                <span>35</span>
              </div>
            )}
            <div
              className={
                styles['item-action__view'] + ' ' + styles['item-action']
              }>
              <SvgGenerator id="view" />
              <span>50</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardItem;
