import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from './DetailedArticle.module.css';

const MONTH = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const DetailedArticle = () => {
  const [data, setData] = useState(null);
  const { pathname } = useLocation();
  const articleRef = useRef(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(`http://localhost/api${pathname}`);
        setData(data);
        if (data && articleRef.current) {
          if (articleRef.current.childNodes.length !== 0) {
            const articleBodyLength =
              articleRef.current.childNodes[2].childNodes.length;
            articleRef.current.childNodes[2].childNodes[
              articleBodyLength - 1
            ].style.margin = 0;
          }
        }
      };
      fetchData();
    } catch (error) {}
  }, []);

  const getDate = (date) => {
    const newDate = new Date(Number(date));
    const fullDate =
      newDate.getDate() +
      ' ' +
      MONTH[newDate.getMonth()] +
      ' ' +
      newDate.getFullYear();
    return fullDate;
  };

  return (
    <div className={styles['article-body']} ref={articleRef}>
      {data && (
        <>
          <span>{getDate(data.pubDate)}</span>
          <h2>{data.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.fulltext }} />
        </>
      )}
    </div>
  );
};

export default DetailedArticle;
