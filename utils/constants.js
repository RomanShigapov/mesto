export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const popups = document.querySelectorAll('.popup'); // все попапы
export const popupOpened_class = 'popup_opened';

export const formNew = document.forms['new-card-form']; //форма добавить новую карточку для ресета параметров

export const popupProfile = document.querySelector('.popup_profile');
export const popupNewCard = document.querySelector('.popup_new-card');
export const popupPicture = document.querySelector('.popup_picture');

export const popupPicture_image = popupPicture.querySelector('.popup__image');
export const popupPicture_image_caption = popupPicture.querySelector('.popup__image-caption');

export const nameInput = document.querySelector('.popup__form-input_profile-name'); // поле ввода имени профиля на форме редактирования
export const descriptionInput = document.querySelector('.popup__form-input_profile-description'); // поле ввода описания профиля на форме редактирования

export const nameOutput = document.querySelector('.profile__name'); // имя профиля на странице
export const descriptionOutput = document.querySelector('.profile__description'); // описание профиля на странице

export const cardNameInput = document.querySelector('.popup__form-input_new-card-name'); // поле ввода имени карточки
export const cardImageLinkInput = document.querySelector('.popup__form-input_new-card-image-link'); // поле ввода url картинки для карточки

export const cardsGrid = document.querySelector('.places__grid-items'); //получаем элемент разметки для вставки карточек

export const formValidatorsList = {};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-save-button',
  inactiveButtonClass: 'popup__form-save-button_disabled',
  inputErrorClass: 'popup__form-input_error-style',
  errorClass: 'popup__form-input-error_visible'
};
