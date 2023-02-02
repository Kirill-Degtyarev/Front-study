import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Profile.module.css';
const Profile = ({ setPathName }) => {
  return (
    <div>
      <NavLink
        to="/"
        onClick={() => {
          setPathName('/news');
        }}>
        PageProfile
      </NavLink>
    </div>
  );
};

export default Profile;
