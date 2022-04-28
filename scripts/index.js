// связываем модули
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// объявляем переменные
const popups = document.querySelectorAll('.popup'); // все попапы
const popupOpened_class = 'popup_opened';

const formNew = document.forms['new-card-form']; //форма добавить новую карточку для ресета параметров

const popupProfile = document.querySelector('.popup_profile');
const popupNewCard = document.querySelector('.popup_new-card');
const popupPicture = document.querySelector('.popup_picture');

const popupPicture_image = popupPicture.querySelector('.popup__image');
const popupPicture_image_caption = popupPicture.querySelector('.popup__image-caption');

const nameInput = document.querySelector('.popup__form-input_profile-name'); // поле ввода имени профиля на форме редактирования
const descriptionInput = document.querySelector('.popup__form-input_profile-description'); // поле ввода описания профиля на форме редактирования

const nameOutput = document.querySelector('.profile__name'); // имя профиля на странице
const descriptionOutput = document.querySelector('.profile__description'); // описание профиля на странице

const cardNameInput = document.querySelector('.popup__form-input_new-card-name'); // поле ввода имени карточки
const cardImageLinkInput = document.querySelector('.popup__form-input_new-card-image-link'); // поле ввода url картинки для карточки

const cardsGrid = document.querySelector('.places__grid-items'); //получаем элемент разметки для вставки карточек

const formValidatorsList = {};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-save-button',
  inactiveButtonClass: 'popup__form-save-button_disabled',
  inputErrorClass: 'popup__form-input_error-style',
  errorClass: 'popup__form-input-error_visible'
};

// объявление функций
const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const openedPopup = document.querySelector('.' + popupOpened_class)
    closePopup(openedPopup);
  };
};

// открыть попап повесить слушатель по Esc
const openPopup = (popup) => {
  document.addEventListener("keydown", handleEsc);
  popup.classList.add(popupOpened_class);
};

// закрыть попап снять слушатель по Esc
const closePopup = (popup) => {
  document.removeEventListener('keydown',handleEsc);
  popup.classList.remove(popupOpened_class);
};

// функция создания карточки
function createCard(item) {
  const newCard = new Card(item,'.new-card',showCardImage);
  return newCard.generateCard();
}

// функция добавления карточки в контейнер
function addCardTo(card, container) {
  container.prepend(card);
};

// показать карточку
function showCardImage(name, link) {
  popupPicture_image.src = link;
  popupPicture_image.alt = name + 'фото';
  popupPicture_image_caption.textContent = name;
  openPopup(popupPicture);
};

// установка текущих значений из профиля в форму редактирования
function setProfilePopupInputs() {
  nameInput.value = nameOutput.textContent;
	descriptionInput.value = descriptionOutput.textContent;
};

// сохранения данных из формы редактирования на основную страницу
function handleProfileFormSubmit(evt) {
	evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  closePopup(evt.target.closest('.popup'));
};

// функция добавления карточки на страницу
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  addCardTo(createCard({name: cardNameInput.value, link: cardImageLinkInput.value}),cardsGrid);
  closePopup(evt.target.closest('.popup'));
};

// рабочая часть скрипта
// загрузка начальных карточек
initialCards.reverse().forEach(item => {
  addCardTo(createCard(item),cardsGrid);
});

// валидация форм
Array.from(document.forms).forEach(form => {
  const newFormValidator = new FormValidator(validationConfig, form);
  formValidatorsList[form.getAttribute('name')] = newFormValidator;
  newFormValidator.enableValidation();
});

// слушатели для закрытия попапов
popups.forEach(popup => {
  // слушатели закрытия по кнопке можно повесить сразу
  popup.querySelector('.popup__close-button').addEventListener('click',() => {closePopup(popup)});
  // слушатели закрытия по клику на затемненную область
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});
// слушатель на кнопку редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click',() => {
  setProfilePopupInputs();
  formValidatorsList['profile-form'].resetValidation();
  openPopup(popupProfile);
});
// обработчик сохранения данных из формы редактирования профиля
popupProfile.addEventListener('submit', handleProfileFormSubmit);
// слушатель на кнопку добавления карточки места
document.querySelector('.profile__add-button').addEventListener('click',() => {
  formNew.reset();
  formValidatorsList['new-card-form'].resetValidation();
  openPopup(popupNewCard);
});
// обработчик события по добавлению новой карточки
popupNewCard.addEventListener('submit', handleNewCardFormSubmit);



