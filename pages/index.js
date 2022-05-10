// импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
// импорт карточек и конфигураторов
import initialCards from '../utils/initialCards.js';
import validationConfig from '../utils/validationConfig.js';
import popupConfig from '../utils/popupConfig.js';
// импорт констант
import {
   popups
  ,popupOpened_class
  ,formNew
  ,popupProfile
  // ,popupNewCard
  ,popupPicture
  ,popupPicture_image
  ,popupPicture_image_caption
  ,nameInput
  ,descriptionInput
  ,nameOutput
  ,descriptionOutput
  ,cardNameInput
  ,cardImageLinkInput
  ,cardsGrid
  ,formValidatorsList
} from '../utils/constants.js';

const popupWithImage = new PopupWithImage('.popup_picture');
popupWithImage.setEventListeners();

// const popupNewCard = new PopupWithForm('.popup_new-card');
// popupNewCard.setEventListeners();

// показать карточку по клику для передачи в создание карточки
function showCardImage(name, link) {
  popupWithImage.open({name, link});
}

// функция создания карточки
function createCard(item) {
  const newCard = new Card(item,'.new-card',showCardImage);
  return newCard.generateCard();
}

// экземпляр Section для отрисовки карточек
const renderCards = new Section(
  {
     items: initialCards
    ,renderer: createCard
  },
  '.places__grid-items'
);

// отрисовка начальных карточек
renderCards.rendered();

// показать карточку
/*function showCardImage(name, link) {
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
};*/

// рабочая часть скрипта
// загрузка начальных карточек
/*initialCards.reverse().forEach(item => {
  addCardTo(createCard(item),cardsGrid);
});
*/
// валидация форм
/*
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
*/

