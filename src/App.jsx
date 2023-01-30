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
  // useEffect(() => {
  //   const pageName = pathname === '/' ? 'news' : pathname;
  //   try {
  //     const fetchData = async () => {
  //       // const { data } = await axios.get(`http://localhost/api/${pageName}`);
  //       const { data } = await axios.get(`http://localhost/api/promotions`);
  //       setData(data);
  //     };
  //     fetchData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <div className="main__container">
      <Routes>
        <Route path="/" index element={<PageNews data={data} />} />
        <Route path="/profile" element={<PageProfile />} />
        <Route path="/news/:id" element={<PageFullNews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
