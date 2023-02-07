import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PageNews from './components/PageNews/PageNews';
import NotFound from './components/NotFound/NotFound';
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

  return (
    <div className={isMount ? 'main__container' : 'main-loader'}>
      {isMount ? (
        <Routes>
          {pathname === '/' ? (
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
          ) : (
            <Route path="/" element={<PageDetailed />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/news/:id" element={<DetailedArticle />} />
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
