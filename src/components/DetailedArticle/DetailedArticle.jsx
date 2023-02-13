import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';

import ActionDate from '../../Action/ActionDate';
import ActionData from '../../Action/ActionData';

import Loader from '../Loader/Loader';

import styles from './DetailedArticle.module.css';

const DetailedArticle = () => {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { pathname } = useLocation();
  const articleRef = useRef(null);

  /**
   * Тут происходит получении статьи с backend и когда статья пришла и
   * смонтировалась, то ищется последний элемент и у него убираются
   * нижние отступы.
   */
  useEffect(() => {
    ActionData.fetchData(pathname, setData, setIsLoaded);

    if (isLoaded && articleRef.current) {
      if (articleRef.current.childNodes.length !== 0) {
        const articleBodyLength =
          articleRef.current.childNodes[2].childNodes.length;
        articleRef.current.childNodes[2].childNodes[
          articleBodyLength - 1
        ].style.margin = 0;
      }
    }
  }, [articleRef.current]);

  return (
    <div
      className={isLoaded ? styles['article-body'] : styles['article-loader']}
      ref={articleRef}>
      {isLoaded ? (
        <>
          <span>{ActionDate.getFullDate(data.pubDate, 'dd MMMM yyyy')}</span>
          <h2>{data.title}</h2>
          {parse(`<div>${data.fulltext}</div>`)}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetailedArticle;
