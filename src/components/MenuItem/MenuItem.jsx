import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MenuItem.module.css';
const MenuItem = ({ item }) => {
  return (
    <li className={styles['menu-list__item']}>
      <NavLink
        to={item.path ? item.path : '/#'}
        className={({ isActive }) => (isActive ? styles['active-link'] : '')}>
        {item.title}
      </NavLink>
    </li>
  );
};

export default MenuItem;
