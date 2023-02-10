import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputBody from '../InputBody/InputBody';
import Button from '../../UI/Button/Button';
// import DataInputs from '../../data/DataInputs.json';

import styles from './Profile.module.css';
import ActionData from '../../Action/ActionData';

const Profile = () => {
  const [dataInputs, setDataInputs] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ActionData.fetchData('/inputs', setDataInputs, setIsLoaded);
  }, []);
  /**
   * Начальные значения для формы и схема валидации при отправке.
   */
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
      radio: 'Неактивна, выбрана',
      checkbox: ['Неактивен, выбран'],
      comments: '',
    },
    validationSchema: Yup.object({
      fio:
        dataInputs && dataInputs[0].inputs[0].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      city:
        dataInputs && dataInputs[0].inputs[3].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      aboutMe:
        dataInputs && dataInputs[0].inputs[4].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      workPhone:
        dataInputs && dataInputs[1].inputs[0].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      workingDirect:
        dataInputs && dataInputs[1].inputs[1].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      mobilePhone:
        dataInputs && dataInputs[1].inputs[2].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      fax:
        dataInputs && dataInputs[1].inputs[3].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      homePhone:
        dataInputs && dataInputs[1].inputs[4].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      emailWorking:
        dataInputs && dataInputs[1].inputs[5].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      personalEmail:
        dataInputs && dataInputs[1].inputs[6].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
      comments:
        dataInputs && dataInputs[3].inputs[4].required
          ? Yup.string().required('Поле обязательно для заполнения')
          : '',
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={styles['profile-body']}>
      {dataInputs && (
        <form
          className="profile-body__form"
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}>
          <div className={styles['form-body']}>
            <ul className={styles['form__list']}>
              {dataInputs.map((item) => (
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
            <Button color="blue" type="submit" disabled={false}>
              Сохранить
            </Button>
            <Button color="white" type="reset" disabled={false}>
              Отмена
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
