import React from 'react';
import ActionValidate from '../../Action/ActionValidate';

const Textarea = ({ inputData, formik }) => {
  return (
    <textarea
      id={inputData.inputId}
      placeholder={inputData.placeholderInput}
      onChange={(e) => {
        ActionValidate.onValidationTextArea(e, 'change', formik, inputData);
      }}
      onBlur={(e) => ActionValidate.onValidationTextArea(e, 'blur')}
      onClick={(e) =>
        ActionValidate.onValidationTextArea(e, 'change', formik, inputData)
      }></textarea>
  );
};

export default Textarea;
