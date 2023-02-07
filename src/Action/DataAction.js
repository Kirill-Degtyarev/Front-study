import axios from 'axios';

export default class DataAction {
  static async fetchData() {
    try {
      const { data } = await axios.get(`http://localhost/api${pathName}`);
    } catch (error) {
      console.log(error);
    }
  }
}
