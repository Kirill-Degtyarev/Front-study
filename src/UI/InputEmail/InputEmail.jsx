import React from 'react';
import ActionValidate from '../../Action/ActionValidate';

const InputEmail = ({ inputData, formik }) => {
  const onValidationInput = (e) => {
    ActionValidate.onValidationEmail(e, formik);
  };
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
      className="fz15-regent-gray"
    />
  );
};

export default InputEmail;
