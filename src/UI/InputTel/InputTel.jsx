import React from 'react';
import ReactInputMask from 'react-input-mask';
import ActionValidate from '../../Action/ActionValidate';

const InputTel = ({ inputData, formik }) => {
  const onValidationInput = (e) => {
    ActionValidate.onValidationTel(e, formik);
  };
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
        className="fz15-regent-gray"
      />
    </ReactInputMask>
  );
};

export default InputTel;
