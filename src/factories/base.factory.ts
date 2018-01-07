export class BaseFactory {
  id?: string;
  
  constructor(data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  }
}