import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import PageNews from './components/PageNews/PageNews';
import NotFound from './components/NotFound/NotFound';
import PageDetailed from './components/PageDetailed/PageDetailed';
import DetailedArticle from './components/DetailedArticle/DetailedArticle';
import Profile from './components/Profile/Profile';
import Loader from './components/Loader/Loader';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
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
    if (pathname === '/') {
      setIsLoaded(false);
      try {
        const fetchData = async () => {
          const { data } = await axios.get(`http://localhost/api${pathName}`);
          setData(data);
          setIsLoaded(true);
        };
        fetchData();
      } catch (error) {
        setIsLoaded(false);
        console.log(error);
      }
    }
  }, [pathName]);

  return (
    <div className="main__container">
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
    </div>
  );
};

export default App;
