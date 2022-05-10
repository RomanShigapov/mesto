import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imageName = document.querySelector('.popup__image-caption');
    this._imageLink = document.querySelector('.popup__image');
  }

  open({ name, link }) {
    this._imageName.textContent = name;
    this._imageLink.src = link;
    this._imageLink.alt = name + 'фото';

    super.open();
  }
}
