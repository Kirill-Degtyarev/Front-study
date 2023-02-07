import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputBody from '../InputBody/InputBody';
import Button from '../../UI/Button/Button';
import DataInputs from '../../data/DataInputs.json';

import styles from './Profile.module.css';

const Profile = () => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      fio: '',
      specialization: 'верстальщик',
      document: 'выбрать',
      city: '',
      aboutMe: '',
      workPhone: '',
      workingDirect: '',
      mobilePhone: '',
      fax: '',
      homePhone: '',
      emailWorking: '',
      personalEmail: '',
      radio: 'radioDisabledActive',
      checkbox: ['checkboxDisabledActive'],
      comments: '',
    },
    validationSchema: Yup.object({
      fio: DataInputs[0].inputs[0].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      city: DataInputs[0].inputs[3].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      aboutMe: DataInputs[0].inputs[4].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      workPhone: DataInputs[1].inputs[0].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      workingDirect: DataInputs[1].inputs[1].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      mobilePhone: DataInputs[1].inputs[2].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      fax: DataInputs[1].inputs[3].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      homePhone: DataInputs[1].inputs[4].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      emailWorking: DataInputs[1].inputs[5].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      personalEmail: DataInputs[1].inputs[6].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
      comments: DataInputs[3].inputs[4].required
        ? Yup.string().required('Поле обязательно для заполнения')
        : '',
    }),
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
