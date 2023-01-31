import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import PageNews from './components/PageNews/PageNews';
import NotFound from './components/NotFound/NotFound';
import PageProfile from './components/PageProfile/PageProfile';
import PageFullNews from './components/PageFullNews/PageFullNews';

const App = () => {
  const [data, setData] = useState(null);
  const { pathname } = useLocation();
  const [pathName, setPathName] = useState(
    pathname === '/' ? 'news' : pathname,
  );

  useEffect(() => {
    if (pathname === '/') {
      try {
        const fetchData = async () => {
          const { data } = await axios.get(`http://localhost/api/${pathName}`);
          setData(data);
        };
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  }, [pathName]);

  return (
    <div className="main__container">
      <Routes>
        <Route
          path="/"
          index
          element={
            <PageNews
              itemType={pathName}
              data={data}
              setPathName={setPathName}
            />
          }
        />
        <Route path="/profile" element={<PageProfile />} />
        <Route path="/news/:id" element={<PageFullNews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
