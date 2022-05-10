export default class Popup {
  constructor(config, popup) {
    this._openClass = config.openClass;
    this._closeButtonClass = config.closeButtonClass;
    this._popup = document.querySelector(popup);
    // this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._openClass);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.remove(this._openClass);
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._closeButtonClass) || (evt.target === this._popup)) {
        this.close();
      }
    });
  }
}
