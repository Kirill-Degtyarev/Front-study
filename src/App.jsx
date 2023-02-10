import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageNews from './components/PageNews/PageNews';
import PageDetailed from './components/PageDetailed/PageDetailed';
import DetailedArticle from './components/DetailedArticle/DetailedArticle';
import Profile from './components/Profile/Profile';
import Loader from './components/Loader/Loader';
import ActionData from './Action/ActionData';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [data, setData] = useState(null);
  const { pathname } = useLocation();
  const [pathName, setPathName] = useState(
    pathname === '/' ? '/news' : pathname,
  );

  /**
   * Получение данных и сохранение данных при первом ренедере
   * и изменении показываемых карточек
   */
  useEffect(() => {
    pathName === '/profile' ? setPathName('/news') : null;
    if (pathname === '/') {
      setIsLoaded(false);
      ActionData.fetchData(pathName, setData, setIsLoaded);
    }
    setIsMount(true);
  }, [pathname, pathName]);

  /**
   * Если компонент не смонтирован, то показывается Loader, так же если текущий
   * pathname не является начальной страницей, то меняем на вложенный route для
   * того, что бы использовать компонент Outlet из react-router-dom. Это
   * позволяет нам использовать один родительский компонент в котором мы
   * всегда рендерим компонент Menu и в зависимотсти от pathname рендерить
   * нужный нам компонет.
   */
  return (
    <div className={isMount ? 'main__container' : 'main-loader'}>
      {isMount ? (
        <Routes>
          <Route
            path="/"
            index
            element={
              <PageNews
                isLoaded={isLoaded}
                itemType={pathName.slice(1)}
                data={data}
                setPathName={setPathName}
              />
            }
          />
          {pathname !== '/' && (
            <Route path="/" element={<PageDetailed />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/news/:id" element={<DetailedArticle />} />
            </Route>
          )}
        </Routes>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
