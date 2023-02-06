import React from 'react';
import { useFormik } from 'formik';

import InputBody from '../InputBody/InputBody';
import Button from '../../UI/Button/Button';
import DataInputs from '../../data/DataInputs.json';

import styles from './Profile.module.css';

const Profile = () => {
  const formik = useFormik({
    initialValues: {
      fio: '',
      specialization: '',
      document: '',
      city: '',
      aboutMe: '',
      workPhone: '',
      workingDirect: '',
      mobilePhone: '',
      fax: '',
      homePhone: '',
      emailWorking: '',
      personalEmail: '',
      radio: '',
      checkbox: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className={styles['profile-body']}>
      <form
        className="profile-body__form"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}>
        <div className={styles['form-body']}>
          <ul className={styles['form__list']}>
            {DataInputs.map((item) => (
              <li className={styles['form-list__item']} key={item.id}>
                <h2 className={styles['form-list__item-title']}>
                  {item.nameBlockInputs}
                </h2>
                <ul className={styles['form-list__item-inputs']}>
                  {item.inputs.map((input) => (
                    <InputBody input={input} key={input.id} formik={formik} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.form__button}>
          <Button color="blue" type="submit">
            Сохранить
          </Button>
          <Button color="white" type="reset">
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
