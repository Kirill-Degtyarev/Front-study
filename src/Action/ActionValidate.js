export default class ActionValidate {
  /**
   * Валидация ФИО по количеству символов и содержанию цифр или спецсимволов.
   * Если валидация не пройдена, то в момент выхода с инпута показывается
   * ошибка, которая потом пушится в массив ошибок Formik
   */
  static onValidationFullName(e, formik) {
    const selfItem = e.target;
    const NAME_REGEXP = /^[a-zа-яЁё\s]+$/i;
    const textErrorReg = 'ФИО не должно содержать цифры и спецсимволы';
    const textErrorLen = 'Поле обязательно для заполнения';
    if (selfItem.value.trim().length === 0) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorLen;
      selfItem.style.color = '#f37575';
      formik.errors.fio = textErrorLen;
      return;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        selfItem.style.color = '#2e3640';
        delete formik.errors.fio;
      }
    }
    if (!NAME_REGEXP.test(selfItem.value) && selfItem.value.length !== 0) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorReg;
      selfItem.style.color = '#f37575';
      formik.errors.fio = textErrorReg;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        selfItem.style.color = '#2e3640';
        delete formik.errors.fio;
      }
    }
  }
  /**
   * Валидация номера телефона по количеству символов и неверному формату.
   * Если валидация не пройдена, то в момент выхода с инпута показывается
   * ошибка, которая потом пушится в массив ошибок Formik
   */
  static onValidationTel(e, formik) {
    const selfItem = e.target;
    const textErrorReg = 'Номер телефона должен быть вида "+7 (999) 999-99-99"';
    const textErrorLen = 'Поле обязательно для заполнения';
    if (selfItem.value.trim() === '') {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorLen;
      selfItem.style.color = '#f37575';
      formik.errors[e.target.id] = textErrorLen;
      return;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        selfItem.style.color = '#2e3640';
        delete formik.errors[e.target.id];
      }
    }
    if (e.target.value.indexOf('_') !== -1) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorReg;
      selfItem.style.color = '#f37575';
      formik.errors[e.target.id] = textErrorReg;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        selfItem.style.color = '#2e3640';
        delete formik.errors[e.target.id];
      }
    }
  }
  /**
   * Валидация Email по количеству символов и неверному формату.
   * Если валидация не пройдена, то в момент выхода с инпута показывается
   * ошибка, которая потом пушится в массив ошибок Formik
   */
  static onValidationEmail(e, formik) {
    const selfItem = e.target;
    const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const textErrorReg = 'Email имеет некорректный вид';
    const textErrorLen = 'Поле обязательно для заполнения';
    if (selfItem.value.trim() === '') {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorLen;
      selfItem.style.color = '#f37575';
      formik.errors[e.target.id] = textErrorLen;
      return;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        selfItem.style.color = '#2e3640';
        delete formik.errors[e.target.id];
      }
    }
    if (!EMAIL_REGEXP.test(selfItem.value)) {
      selfItem.parentNode.classList.add('input-invalid');
      selfItem.parentNode.dataset.error = textErrorReg;
      selfItem.style.color = '#f37575';
      formik.errors[e.target.id] = textErrorReg;
    } else {
      if (selfItem.parentNode.classList.contains('input-invalid')) {
        selfItem.parentNode.classList.remove('input-invalid');
        selfItem.style.color = '#2e3640';
        delete formik.errors[e.target.id];
      }
    }
  }
  /**
   * Валидация поля ввода по количеству символов.
   * Если валидация не пройдена, то в момент выхода с инпута показывается
   * ошибка, которая потом пушится в массив ошибок Formik. В валидацию textarea
   * встроена функция, которая изменяет размер блока в зависимости от наполнения
   * при выходи с textarea возвращается дефолтная высота.
   */
  static onValidationTextArea(e, handler, formik, inputData) {
    const textErrorLen = 'Поле обязательно для заполнения';
    if (handler === 'change') {
      formik.values[inputData.inputName] = e.target.value;
      e.target.style.height = e.target.scrollHeight + 'px';
      if (e.target.value.trim() === '') {
        e.target.style.height = '19px';
      }
    }
    if (handler === 'blur') {
      e.target.style.height = '19px';
      e.target.scrollTop = 0;
      if (e.target.value.trim() === '') {
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
