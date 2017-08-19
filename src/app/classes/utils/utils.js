export class Utils {
  static loadFileAsString(_path) {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      console.log(text);
      return text;
    };

    reader.readAsText(_path);
  }
}
