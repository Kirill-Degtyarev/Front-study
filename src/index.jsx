import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import MenuBurgerButton from './components/MenuBurgerButton/MenuBurgerButton';

import './styles/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const burgerButton = ReactDOM.createRoot(document.getElementById('burgerMenu'));

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
