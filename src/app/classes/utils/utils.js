export class Utils {
  static loadFileAsString(_path) {
    return new Promise((resolve, reject) => {
      const file = new XMLHttpRequest();

      file.onreadystatechange = () => {
        const text = file.responseText;
        resolve(text);
      };

      file.open('GET', _path, true);
    });
  }
}
