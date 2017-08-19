export class Utils {
  static loadFileAsString(_path) {
    return new Promise((resolve, reject) => {
      const file = new XMLHttpRequest();

      file.onreadystatechange = () => {
        console.log('wtf', file);
        const text = file.responseText;
        console.log('loaded text', text);
        resolve(text);
      };

      console.log('Utils', _path);
      file.open('GET', _path, true);
    });
  }
}
