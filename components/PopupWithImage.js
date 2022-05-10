import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {

  constructor({ config, popup }, imageLink, imageName) {
    super({ config, popup });
    this._imageLink = document.querySelector(imageLink);
    this._imageName = document.querySelector(imageName);
  }

  open(name, link) {
    this.imageLink.src = link;
    this.imageLink.alt = name + 'фото';
    this._imageName.textContent = name;

    super.open();
  }
}
