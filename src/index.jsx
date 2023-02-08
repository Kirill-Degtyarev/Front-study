import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import MenuBurgerButton from './components/MenuBurgerButton/MenuBurgerButton';

import './styles/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const burgerButton = ReactDOM.createRoot(document.getElementById('burgerMenu'));
const inputSearch = document.getElementById('serarch-header');

inputSearch.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    window.open('https://www.google.ru/');
    e.target.value = '';
  }
  return;
});

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

burgerButton.render(
  <BrowserRouter>
    <MenuBurgerButton />
  </BrowserRouter>,
);
