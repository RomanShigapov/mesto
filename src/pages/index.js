import './index.css';
// импорт классов
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
// импорт карточек и конфигураторов
import initialCards from '../utils/initialCards.js';
import validationConfig from '../utils/validationConfig.js';
// импорт констант
import {
   nameInput
  ,descriptionInput
  ,formValidatorsList
  ,api_options
} from '../utils/constants.js';

const mesto_api = new Api(api_options);

// заберем с сервера карточки и отрисуем их
mesto_api.getCardsList()
  .then(cards => {
    // экземпляр Section для отрисовки карточек
    const renderCards = new Section({
       items: cards
      ,renderer: createCard
      }
      ,'.places__grid-items'
    );
    // отрисовка карточек c сервера
    renderCards.rendered();
  });

// функция показа карточки по клику для мягкого связывания попапа и карточки
function showCardImage(name, link) {
  popupWithImage.open({name, link});
};

// функция создания карточки
function createCard(item) {
  const newCard = new Card(item,'.new-card',showCardImage);
  return newCard.generateCard();
};

// подтянем данные о пользователе с сервера и установим их на страницу.
mesto_api.getUserInfo()
  .then(user_data => {
    userInfo.setUserInfo({
      name: user_data.name
      ,description: user_data.about
      ,pic_url: user_data.avatar
    });
  });

// экземпляр класса для работы с данными пользователя
const userInfo = new UserInfo(
  {
    name: '.profile__name'
    ,description: '.profile__description'
    ,avatar: '.profile__avatar'
    ,avatar_button: '.profile__replace-avatar'
  }
);

// экземпляр попапа для формы редактирования данных пользователя
const popupProfile = new PopupWithForm(
   '.popup_profile'
  ,(data) => {
    // начать лоадер
    mesto_api.setUserInfo({
      name: data.name
      ,about: data.description
    })
    .then(() => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // завершить лоадер
    });
  }
);

// экземпляр попапа для формы добавления карточки на форму
const popupNewCard = new PopupWithForm(
   '.popup_new-card'
  ,(data) => {renderCards.addItem(createCard(data))}
);

const popupAvatar = new PopupWithForm(
  '.popup_replace-avatar'
  ,(data) => {
    // начать лоадер
    // не здорово что наш сервер не проверяет доступность ссылки на профиль, наверное нужно наворотить еще и проверку url перед тем как ее грузить на сервер.
    mesto_api.setUserPic(data.link)
    .then(() => {
      console.log('loading new avatar picture is successful');
      userInfo.setUserPic(data.link);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // завершить лоадер
    });
  }
);

// экземпляр попапа для показа карточки
const popupWithImage = new PopupWithImage('.popup_picture');


// установка текущих значений из профиля в форму редактирования
function setProfilePopupInputs({ name, description }) {
  nameInput.value = name;
	descriptionInput.value = description;
};


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

popupAvatar.setEventListeners();
document.querySelector('.profile__replace-avatar').addEventListener('click',() => {
  formValidatorsList['replace-avatar-form'].resetValidation();
  popupAvatar.open();
});


popupNewCard.setEventListeners();
// слушатель на кнопку добавления карточки места
document.querySelector('.profile__add-button').addEventListener('click',() => {
  formValidatorsList['new-card-form'].resetValidation();
  popupNewCard.open();
});
