export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._config = {
       openClass: 'popup_opened',
       closeButtonClass: 'popup__close-button'
    }
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._config.openClass);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._config.openClass);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._config.closeButtonClass) || (evt.target === this._popup)) {
        this.close();
      }
    });
  }
}
