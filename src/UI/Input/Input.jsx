import React from 'react';
import ReactInputMask from 'react-input-mask';
import ActionValidate from '../../Action/ActionValidate';

const Input = ({ inputData, formik }) => {
  const onValidationInput = (e) => {
    const nameInput = e.target.name;
    const typeInput = e.target.type;
    if (typeInput === 'text' && nameInput === 'fio') {
      ActionValidate.onValidationFullName(e, formik);
    }
    if (typeInput === 'tel') {
      ActionValidate.onValidationTel(e, formik);
    }
    if (typeInput === 'email') {
      ActionValidate.onValidationEmail(e, formik);
    }
  };

  const onChangeCheckbox = (e) => {
    const i = formik.values.checkbox.indexOf(e.target.id);
    if (i === -1) {
      formik.values.checkbox.push(inputData.inputId);
    } else {
      formik.values.checkbox.splice(i, 1);
    }
  };

  const onChangeRadio = (e) => {
    if (e.target.checked) {
      formik.values.radio = inputData.inputId;
    } else {
      formik.values.radio = '';
    }
  };

  if (inputData.inputType === 'text') {
    return (
      <>
        <input
          type="text"
          name={inputData.inputName}
          id={inputData.inputId}
          disabled={inputData.disabled}
          placeholder={inputData.placeholderInput}
          value={formik.values[inputData.inputName]}
          onChange={formik.handleChange}
          onBlur={(e) => onValidationInput(e)}
        />
      </>
    );
  }
  if (inputData.inputType === 'tel') {
    return (
      <ReactInputMask
        mask="+7 (999) 999-99-99"
        onBlur={(e) => onValidationInput(e)}
        disabled={inputData.disabled}
        value={formik.values[inputData.inputName]}
        onChange={formik.handleChange}>
        <input
          type="tel"
          name={inputData.inputName}
          id={inputData.inputId}
          disabled={inputData.disabled}
          placeholder={inputData.placeholderInput}
        />
      </ReactInputMask>
    );
  }
  if (inputData.inputType === 'email') {
    return (
      <input
        type="email"
        name={inputData.inputName}
        id={inputData.inputId}
        disabled={inputData.disabled}
        placeholder={inputData.placeholderInput}
        onBlur={(e) => onValidationInput(e)}
        value={formik.values[inputData.inputName]}
        onChange={formik.handleChange}
      />
    );
  }
  if (inputData.inputType === 'checkbox') {
    return (
      <>
        {inputData.checked ? (
          <input
            type="checkbox"
            name={inputData.inputName}
            id={inputData.inputId}
            disabled={inputData.disabled}
            onChange={(e) => {
              onChangeCheckbox(e);
            }}
            checked
          />
        ) : (
          <input
            type="checkbox"
            name={inputData.inputName}
            id={inputData.inputId}
            onChange={(e) => {
              onChangeCheckbox(e);
            }}
            disabled={inputData.disabled}
          />
        )}
      </>
    );
  }
  if (inputData.inputType === 'radio') {
    return (
      <>
        {inputData.checked ? (
          <input
            type="radio"
            name={inputData.inputName}
            id={inputData.inputId}
            onChange={(e) => {
              onChangeRadio(e);
            }}
            checked
            disabled={inputData.disabled}
          />
        ) : (
          <input
            type="radio"
            name={inputData.inputName}
            id={inputData.inputId}
            onChange={(e) => {
              onChangeRadio(e);
            }}
            disabled={inputData.disabled}
          />
        )}
      </>
    );
  }
};

export default Input;
