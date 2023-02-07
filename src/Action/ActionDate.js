const MONTH = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export default class ActionDate {
  /**
   * Функция возвращает дату в нужном формате
   */
  static getFullDate(date, modifer) {
    const newDate = new Date(Number(date));
    let fullDate = null,
      day = null,
      month = null,
      year = null;
    switch (modifer) {
      case 'dd/mm/yy':
        day =
          newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        month =
          newDate.getMonth() < 10
            ? '0' + (newDate.getMonth() + 1)
            : newDate.getMonth() + 1;
        year = newDate.getFullYear();
        fullDate = day + '.' + month + '.' + year;
        return fullDate;
      case 'dd/mounth/yy':
        fullDate =
          newDate.getDate() +
          ' ' +
          MONTH[newDate.getMonth()] +
          ' ' +
          newDate.getFullYear();
        return fullDate;
      default:
        break;
    }
  }
  /**
   * Получение статуса акци
   */
  static getStatusDate(date) {
    const currentDate = new Date();
    if (new Date(Number(date)) < currentDate) return 'Завершено';
    if (new Date(Number(date)) > currentDate) return 'Предложение активно';
  }
}
