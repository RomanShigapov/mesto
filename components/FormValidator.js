export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }

  // поиск хотя бы одного не валидного инпута
  _hasInvalidInput() {
    return this._inputsList.some((inputItem) => {
      return !(inputItem.validity.valid);
    });
  }

  // для доступа снаружи, возможность выставления состояния кнопки для формы редактирования профиля
  disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  // переключаем состояние кнопки в зависимости от валидности инпутов формы
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _showError(inputItem, errorText) {
    this._error = this._form.querySelector(`.${inputItem.name}-error`);
    inputItem.classList.add(this._config.inputErrorClass);
    this._error.classList.add(this._config.errorClass);
    this._error.textContent = errorText;
  }

  _hideError(inputItem) {
    this._error = this._form.querySelector(`.${inputItem.name}-error`);
    inputItem.classList.remove(this._config.inputErrorClass);
    this._error.classList.remove(this._config.errorClass);
    this._error.textContent = '';
  }

  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      this._showError(inputItem, inputItem.validationMessage);
    } else {
      this._hideError(inputItem);
    }
  }

  _setEventListeners() {
    this._inputsList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this.disableSubmitButton();
    this._inputsList.forEach((inputItem) => {
      this._hideError(inputItem);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
