import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './DetailedArticle.module.css';
import ActionDate from '../../Action/ActionDate';
import ActionData from '../../Action/ActionData';

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

    if (data && articleRef.current) {
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
    <div className={styles['article-body']} ref={articleRef}>
      {data && (
        <>
          <span>{ActionDate.getFullDate(data.pubDate, 'dd/mounth/yy')}</span>
          <h2>{data.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.fulltext }} />
        </>
      )}
    </div>
  );
};

export default DetailedArticle;
