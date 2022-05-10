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
// импорт констант
import {
   nameInput
  ,descriptionInput
  ,formValidatorsList
} from '../utils/constants.js';

// экземпляр класса для работы с данными пользователя
const userInfo = new UserInfo({
  profile_name: '.profile__name'
 ,profile_description: '.profile__description'
});

// экземпляр попапа для формы редактирования данных пользователя
const popupProfile = new PopupWithForm(
   '.popup_profile'
  ,(data) => {userInfo.setUserInfo(data)}
);

// экземпляр попапа для формы добавления карточки на форму
const popupNewCard = new PopupWithForm(
   '.popup_new-card'
  ,(data) => {renderCards.addItem(createCard(data))}
);

// экземпляр попапа для показа карточки
const popupWithImage = new PopupWithImage('.popup_picture');

// экземпляр Section для отрисовки карточек
const renderCards = new Section(
  {
     items: initialCards
    ,renderer: createCard
  },
  '.places__grid-items'
);

// функция показа карточки по клику для мягкого связывания попапа и карточки
function showCardImage(name, link) {
  popupWithImage.open({name, link});
};

// функция создания карточки
function createCard(item) {
  const newCard = new Card(item,'.new-card',showCardImage);
  return newCard.generateCard();
};

// установка текущих значений из профиля в форму редактирования
function setProfilePopupInputs({ profile_name, profile_description }) {
  nameInput.value = profile_name;
	descriptionInput.value = profile_description;
};

// отрисовка начальных карточек
renderCards.rendered();

// валидация форм
Array.from(document.forms).forEach(form => {
  const newFormValidator = new FormValidator(validationConfig, form);
  formValidatorsList[form.getAttribute('name')] = newFormValidator;
  newFormValidator.enableValidation();
});

// инициализация слушателей
popupWithImage.setEventListeners();

popupProfile.setEventListeners();
// слушатель на кнопку редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click',() => {
  setProfilePopupInputs(userInfo.getUserInfo());
  formValidatorsList['profile-form'].resetValidation();
  popupProfile.open();
});

popupNewCard.setEventListeners();
// слушатель на кнопку добавления карточки места
document.querySelector('.profile__add-button').addEventListener('click',() => {
  formValidatorsList['new-card-form'].resetValidation();
  popupNewCard.open();
});

