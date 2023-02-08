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
          {/* <span>{ActionDate.getFullDate(data.pubDate, 'dd/mounth/yy')}</span> */}
          <span>4 августа 2022</span>
          {/* <h2>{data.title}</h2> */}
          <h2>Заголовок новости</h2>
          {/* <div dangerouslySetInnerHTML={{ __html: data.fulltext }} /> */}
          <div>
            <p>
              Проснувшись однажды утром после беспокойного сна,{' '}
              <a href="#">Грегор Замза</a> обнаружил, что он у себя в постели
              превратился в страшное насекомоподобное существо.
            </p>
            <img
              src="https://news.store.rambler.ru/img/9958f58c1b9a8b69e3fc6a15a654ee94?img-format=auto&img-1-resize=height:710,fit:max"
              alt="img"
            />
            <p>
              Лежа на панцирнотвердой спине, он видел, стоило ему приподнять
              голову, свой коричневый, выпуклый, разделенный дугообразными
              чешуйками живот
            </p>
            <ul>
              <li>
                На верхушке которого еле держалось готовое вот-вот окончательно
                сползти одеяло.
              </li>
              <li>
                Его многочисленные, убого тонкие по сравнению с остальным телом
                ножки беспомощно копошились у него перед глазами
              </li>
              <li>«Что со мной случилось?» – подумал он.</li>
            </ul>
            <p>
              Это не было сном. <a href="#">Его комната</a>, настоящая, разве
              что слишком маленькая, но обычная комната, мирно покоилась в своих
              четырёх хорошо знакомых стенах. Над столом, где были разложены
              распакованные образцы сукон — Замза был коммивояжёром, – висел
              портрет, который он недавно вырезал из иллюстрированного журнала и
              вставил в красивую золочёную рамку.
            </p>
            <blockquote>
              <p>
                На портрете была изображена дама в меховой шляпе и боа, она
                сидела очень прямо и протягивала зрителю тяжёлую меховую муфту,
                в которой целиком исчезала её рука
              </p>
            </blockquote>
            <p>
              Затем взгляд Грегора устремился в окно, и пасмурная погода —
              слышно было, как по жести подоконника стучат капли дождя — привела
              его и вовсе в грустное настроение
            </p>
            <ol>
              <li>
                «Хорошо бы ещё немного поспать и забыть всю эту чепуху», –
                подумал он
                <ol>
                  <li>
                    но это было совершенно <a href="#">неосуществимо</a>
                  </li>
                  <li>он привык спать на правом боку</li>
                  <li>
                    а в теперешнем своем состоянии он никак не мог принять этого
                    положения
                  </li>
                </ol>
              </li>
              <li>
                С какой бы силой ни поворачивался он на правый бок, он неизменно
                сваливался опять на спину
              </li>
              <li>
                Закрыв глаза, чтобы не видеть своих барахтающихся ног, он
                проделал это добрую сотню раз и отказался от этих попыток только
                тогда, когда почувствовал какую-то неведомую дотоле, тупую и
                слабую боль в боку.
              </li>
            </ol>
            <h3>Заголовок третьего уровня</h3>
            <p>
              «Ах ты, господи, – подумал он, – какую я выбрал хлопотную
              профессию! Изо дня в день в разъездах. Деловых волнений куда
              больше,чем на месте, <a href="#">в торговом доме</a>, а кроме
              того, изволь терпеть тяготы дороги, думай о расписании поездов,
              мирись с плохим, нерегулярным питанием, завязывай со все новыми и
              новыми людьми недолгие, никогда не бывающие сердечными отношения.
            </p>
            <img
              src="https://news.store.rambler.ru/img/74bcf99bf6f3684a29255d0d82bbfc0a?img-format=auto&img-1-resize=height:630,fit:max"
              alt="img"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailedArticle;
