export class ImageLoader {
  static loadImage(path) {
    const image = new Image();
    image.src = path;
    return image;
  }
}
