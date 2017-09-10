export class ImageLoader {
  static loadImage(path) {
    let image = new Image();
    image.src = path;
    return image;
  }
}
