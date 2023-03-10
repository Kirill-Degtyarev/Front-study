import React from 'react';
import Select from 'react-select';

const InputSelect = ({ options, isDisabled, formik, inputName }) => {
  const selectStyles = {
    container: (styles) => ({
      ...styles,
      width: '100%',
    }),
    valueContainer: (styles) => ({
      ...styles,
      flex: 'none',
      marginBottom: '-3px',
    }),
    control: (styles) => ({
      ...styles,
      fontFamily: 'PT Sans',
      color: '#2E3640',
      minHeight: '19px',
      width: 'auto',
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '19px',
      cursor: 'pointer',
      justifyContent: 'flex-start',
    }),
    option: (styles, { isSelected, isFocused }) => ({
      ...styles,
      padding: '6px 0px 6px 24px',
      background: isSelected
        ? 'url(src/assets/svg/checkMarkSelect.svg) no-repeat 5px center #f5f5f5'
        : isFocused
        ? '#f5f5f5'
        : '#ffffff',
      color: '#2E3640',
      fontFamily: 'PT Sans',
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '150%',
      cursor: 'pointer',
    }),
    menuList: (styles) => ({
      ...styles,
      width: '108%',
      height: '140px',
      borderRadius: '3px',
      backgroundColor: '#fff',
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.03)',
      border: '1px solid #E5E6E9',
      top: '-25px',
      left: '-25px',
    }),
    indicatorsContainer: (styles) => ({
      ...styles,
      width: '11px',
      height: '10px',
      marginTop: '6px',
    }),
  };
  return (
    <Select
      defaultValue={options[0]}
      unstyled
      isClearable={false}
      isSearchable={false}
      isDisabled={isDisabled}
      styles={selectStyles}
      options={options}
      onChange={(e) => {
        formik.values[inputName] = e.value;
      }}
    />
  );
};

export default InputSelect;
