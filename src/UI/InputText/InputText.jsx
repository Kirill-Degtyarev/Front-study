import React from 'react';
import ActionValidate from '../../Action/ActionValidate';

const InputText = ({ inputData, formik }) => {
  const onValidationInput = (e) => {
    ActionValidate.onValidationFullName(e, formik);
  };
  return (
    <input
      type="text"
      name={inputData.inputName}
      id={inputData.inputId}
      disabled={inputData.disabled}
      placeholder={inputData.placeholderInput}
      value={formik.values[inputData.inputName]}
      onChange={formik.handleChange}
      onBlur={(e) => onValidationInput(e)}
      className="fz15-regent-gray"
    />
  );
};

export default InputText;
