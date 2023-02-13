import React from 'react';

const InputRadio = ({ inputData, formik }) => {
  const onChangeRadio = (e) => {
    if (e.target.checked) {
      formik.values.radio = inputData.nameInput;
    } else {
      formik.values.radio = '';
    }
  };
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
          className="fz15-regent-gray"
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
          className="fz15-regent-gray"
        />
      )}
    </>
  );
};

export default InputRadio;
