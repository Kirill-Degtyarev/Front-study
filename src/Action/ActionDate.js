import format from 'date-fns/format';
import russianLocale from 'date-fns/locale/ru';

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
    const newDate = new Date(Number(date * 1000));
    return format(newDate, `${modifer}`, {
      locale: russianLocale,
    });
  }
  /**
   * Получение статуса акции
   */
  static getStatusDate(date) {
    const currentDate = new Date();
    if (new Date(Number(date)) < currentDate) return 'Завершено';
    if (new Date(Number(date)) > currentDate) return 'Предложение активно';
  }
}
