export class ImageLoader {
  static loadImage(_path) {
    const image = new Image();
    image.src = _path;
    return image;
  }
}
