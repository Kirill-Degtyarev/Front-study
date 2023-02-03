import React from 'react';
import SvgGenerator from '../../SvgGenerator/SvgGenerator';
import MenuItem from '../MenuItem/MenuItem';

import styles from './Menu.module.css';

const MENU_ITEM = [
  { id: 1, title: 'Избранное', path: '/news/5' },
  { id: 2, title: 'Моя компания', path: '/profile' },
  { id: 3, title: 'Моё развитие', path: null },
  { id: 4, title: 'Новости компании', path: null },
  { id: 5, title: 'Телефонная книга', path: null },
];

const Menu = () => {
  const closeMenu = (e) => {
    const currentEl = e.currentTarget;
    const menuBody = currentEl.parentNode.parentNode.parentNode;
    if (menuBody.classList.contains(styles['menu-mobile'])) {
      menuBody.classList.remove(styles['menu-mobile']);
    }
  };

  return (
    <div className={styles.menu} id="menu">
      <div className={styles.menu__body}>
        <div className={styles['menu-body__header']}>
          <h2 className={styles['menu-body__header-title']}>Меню раздела</h2>
          <div
            className={styles['menu-body__header-button']}
            onClick={(e) => closeMenu(e)}>
            <SvgGenerator id="close" />
          </div>
        </div>
        <div className={styles['menu-body__main']}>
          <ul className={styles['menu-list']}>
            {MENU_ITEM.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <div className={styles['menu-body__footer']}>
          <SvgGenerator id="logo-header" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
