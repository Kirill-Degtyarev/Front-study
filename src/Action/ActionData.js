import axios from 'axios';

export default class ActionData {
  /**
   * Получение данных с сервера
   */
  static async fetchData(pathName, setData, setIsloaded) {
    try {
      const { data } = await axios.get(`http://localhost/api${pathName}`);
      setData(data);
      setIsloaded(true);
    } catch (error) {
      console.log(error);
      setIsloaded(false);
    }
  }
}
