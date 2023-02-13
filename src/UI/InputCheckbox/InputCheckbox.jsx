import React from 'react';

const InputCheckbox = ({ inputData, formik }) => {
  const onChangeCheckbox = (e) => {
    const i = formik.values.checkbox.indexOf(e.target.id);
    if (i === -1) {
      formik.values.checkbox.push(inputData.nameInput);
    } else {
      formik.values.checkbox.splice(i, 1);
    }
  };
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
          className="fz15-regent-gray"
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
          className="fz15-regent-gray"
        />
      )}
    </>
  );
};

export default InputCheckbox;
