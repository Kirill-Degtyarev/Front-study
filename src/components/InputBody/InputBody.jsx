import React from 'react';
import classNames from 'classnames';

import SelectInput from '../../UI/SelectInput/SelectInput';
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';

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
    if (type === 'select') {
      return (
        <SelectInput
          options={input.options}
          isDisabled={input.disabled}
          formik={formik}
          inputName={input.inputName}
        />
      );
    }
    if (
      type === 'text' ||
      type === 'tel' ||
      type === 'email' ||
      type === 'radio' ||
      type === 'checkbox'
    ) {
      return <Input inputData={input} formik={formik} />;
    }
    if (type === 'textarea') {
      return <Textarea inputData={input} formik={formik} />;
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
