import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__form-input');
    this._button = this._form.querySelector('.popup__form-save-button');
    this._buttonDefaultText = this._button.textContent;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((item) => {
      this._formValues[item.name] = item.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
  }

  showLoader(isSendState) {
    if (isSendState) {
      this._button.textContent = 'Загрузка...';
    }
    else {
      this._button.textContent = this._buttonDefaultText;
    }
  }
}
