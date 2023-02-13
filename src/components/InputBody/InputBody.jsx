import React from 'react';
import classNames from 'classnames';

import Textarea from '../../UI/Textarea/Textarea';
import InputSelect from '../../UI/InputSelect/InputSelect';
import InputText from '../../UI/InputText/InputText';
import InputTel from '../../UI/InputTel/InputTel';
import InputEmail from '../../UI/InputEmail/InputEmail';
import InputRadio from '../../UI/InputRadio/InputRadio';
import InputCheckbox from '../../UI/InputCheckbox/InputCheckbox';

import styles from './InputBody.module.css';

const InputBody = ({ input, formik }) => {
  const inputClass = classNames(styles['inputs-item'], {
    [styles['input-radio']]: input.inputType === 'radio',
    [styles['input-checkbox']]: input.inputType === 'checkbox',
    [styles['input-disabled']]: input.disabled,
  });

  /**
   * В функции inputItem происходит возвращение элемента в зависмости от типа,
   * которые мы получаем от родителя.
   */
  const inputItem = (type) => {
    switch (type) {
      case 'select':
        return (
          <InputSelect
            options={input.options}
            isDisabled={input.disabled}
            formik={formik}
            inputName={input.inputName}
          />
        );
      case 'textarea':
        return <Textarea inputData={input} formik={formik} />;
      case 'text':
        return <InputText inputData={input} formik={formik} />;
      case 'tel':
        return <InputTel inputData={input} formik={formik} />;
      case 'email':
        return <InputEmail inputData={input} formik={formik} />;
      case 'radio':
        return <InputRadio inputData={input} formik={formik} />;
      case 'checkbox':
        return <InputCheckbox inputData={input} formik={formik} />;
      default:
        break;
    }
  };
  return (
    <li className={inputClass}>
      <div className={styles['input-body']}>
        {input.inputType === 'radio' || input.inputType === 'checkbox' ? (
          <>
            {inputItem(input.inputType)}
            <label htmlFor={input.inputId}>{input.nameInput}</label>
          </>
        ) : (
          <>
            <label
              htmlFor={input.inputId}
              className={
                styles['input-body__title'] + ' ' + 'fz15-regent-gray'
              }>
              {input.nameInput}
            </label>
            <div
              className={`${styles['input-body__input']} ${
                formik.errors[input.inputName] ? 'input-invalid' : null
              }`}
              data-error={
                formik.errors[input.inputName]
                  ? formik.errors[input.inputName]
                  : null
              }>
              {inputItem(input.inputType)}
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default InputBody;
