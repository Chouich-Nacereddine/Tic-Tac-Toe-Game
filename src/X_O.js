export class X_O {
  #position;
  #img;
  static images = {
    X_img: "../assets/X.png",
    O_img: "../assets/O.png",
  };

  constructor(position) {
    this.#position = position;
    this.#img = X_O.images.X_img;
    Object.preventExtensions(this);
  }

  getPosition() {
    return this.#position;
  }

  getImg() {
    return this.#img;
  }

  setPosition(newPosition) {
    this.#position = newPosition;
  }

  setImg(newImg) {
    switch (newImg) {
      case "X":
        this.#img = X_O.images.O_img;
        break;
      case "O":
        this.#img = X_O.images.X_img;
        break;
      default:
        this.#img = undefined;
        break;
    }
  }
}
