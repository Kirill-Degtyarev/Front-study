export default class ActionValidate {
  static onValidationFullName(e, formik) {
    const selfItem = e.target;
    const NAME_REGEXP = /^[a-zа-яЁё\s]+$/i;
    const textErrorReg = 'ФИО не должно содержать цифры и спецсимволы';
    const textErrorLen = 'Поле обязательно для заполнения';

    if (selfItem.value.length === 0) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorLen;
      formik.errors.fio = textErrorLen;
      return;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        delete formik.errors.fio;
      }
    }
    if (!NAME_REGEXP.test(selfItem.value) && selfItem.value.length !== 0) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorReg;
      formik.errors.fio = textErrorReg;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        delete formik.errors.fio;
      }
    }
  }
  static onValidationTel(e, formik) {
    const selfItem = e.target;
    const textErrorReg = 'Номер телефона должен быть вида "+7 (999) 999-99-99"';
    const textErrorLen = 'Поле обязательно для заполнения';
    if (selfItem.value === '') {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorLen;
      formik.errors[e.target.id] = textErrorLen;
      return;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        delete formik.errors[e.target.id];
      }
    }
    if (e.target.value.indexOf('_') !== -1) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorReg;
      formik.errors[e.target.id] = textErrorReg;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        delete formik.errors[e.target.id];
      }
    }
  }
  static onValidationEmail(e, formik) {
    const selfItem = e.target;
    const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const textErrorReg = 'Email имеет некорректный вид';
    const textErrorLen = 'Поле обязательно для заполнения';
    if (selfItem.value === '') {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorLen;
      formik.errors[e.target.id] = textErrorLen;
      return;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        delete formik.errors[e.target.id];
      }
    }
    if (!EMAIL_REGEXP.test(selfItem.value)) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorReg;
      formik.errors[e.target.id] = textErrorReg;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        delete formik.errors[e.target.id];
      }
    }
  }
  static onValidationTextArea(e, handler, formik, inputData) {
    const textErrorLen = 'Поле обязателено для заполнения';
    if (handler === 'change') {
      formik.values[inputData.inputName] = e.target.value;
      e.target.style.lineHeight = '130%';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
    if (handler === 'blur') {
      e.target.style.height = '19px';
      e.target.scrollTop = 0;
      if (e.target.value === '') {
        e.target.parentNode.classList.add('input-invalid');
        e.target.parentNode.dataset.error = textErrorLen;
        formik.errors[inputData.inputName] = textErrorLen;
        return;
      } else {
        if (e.target.parentNode.classList.contains('input-invalid')) {
          e.target.parentNode.classList.remove('input-invalid');
          delete formik.errors[inputData.inputName];
        }
      }
    }
  }
}
