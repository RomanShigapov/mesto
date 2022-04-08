//функции для валидации
// объект для конфигурации со всеми нужными классами
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-save-button',
  inactiveButtonClass: 'popup__form-save-button_disabled',
  inputErrorClass: 'popup__form-input_error-style',
  errorClass: 'popup__form-input-error_visible'
};

// поиск хотя бы одного не валидного инпута
const hasInvalidInput = (inputList) => {
  return inputList.some((inputItem) => {
    return !(inputItem.validity.valid);
  });
};

// выключим кнопку
const disableSubmitButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

// включим кнопку
const enableSubmitButton = (button, inactiveButtonClass) =>{
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}

// переключаем состояние кнопки в зависимости от валидности инпутов формы
const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(button, inactiveButtonClass);
  } else {
    enableSubmitButton(button, inactiveButtonClass);
  }
};

// покажем ошибку
const showError = (form, inputItem, inputErrorClass, errorClass) => {
  const error = form.querySelector(`.${inputItem.name}-error`);
  inputItem.classList.add(inputErrorClass);
  error.classList.add(errorClass);
  error.textContent = inputItem.validationMessage;
};

// скроем ошибку
const hideError = (form, inputItem, inputErrorClass, errorClass) => {
  const error = form.querySelector(`.${inputItem.name}-error`);
  inputItem.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '#';
};

// проверка на валидность инпута и показ/скрытие ошибок
const checkInputValidity = (form, inputItem, inputErrorClass, errorClass) => {
  if (!inputItem.validity.valid) {
    showError(form, inputItem, inputErrorClass, errorClass);
  } else {
    hideError(form, inputItem, inputErrorClass, errorClass);
  }
};


// слушатели на инпуты
const setEventListeners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, ...rest}) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList,button,inactiveButtonClass)

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(form, inputItem, inputErrorClass, errorClass);
      toggleButtonState(inputList, button, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  })
};

enableValidation(validationConfig);
