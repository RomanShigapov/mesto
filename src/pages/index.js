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

// переменная для хранения id пользователя != его токену, забрать при обновлении информации о профиле
let userId = null;

// создаем экземпляр api для работы с сервером
const mesto_api = new Api(api_options);

// экземпляр Section для отрисовки карточек
const cardsList = new Section({ renderer: createCard },'.places__grid-items');

// функция создания карточки передаем в качестве renderer в экземпляр класса Section
function createCard(card) {
  const newCard = new Card(card,'.new-card', getUserId, showCardImage, likeCard);
  return newCard.generateCard();
};

// функция получения id текущего юзера для передачи в карточку
function getUserId() {
  return userId;
};

// функция показа карточки по клику для мягкого связывания попапа и карточки
function showCardImage(name, link) {
  popupWithImage.open({name, link});
};

// функция лайка карточки
function likeCard(cardId, like) {
  mesto_api.setCardLike(cardId, like)
  .then((card) => {
    this._card_data.likes = card.likes;
    this._renderLikes();
  })
  .catch((err) => {
    console.log(err);
  });
};

// подтянем данные о пользователе с сервера и установим их на страницу, необходимо получить userId от сервера для отрисовки лайков и кнопок удаления на карточках
// затем заберем с сервера карточки и отрисуем их
Promise.all([mesto_api.getUserInfo(), mesto_api.getCardsList()])
.then(([user_data, cards]) => {
  userId = user_data._id;
  userInfo.setUserInfo({
    name: user_data.name
    ,description: user_data.about
    ,pic_url: user_data.avatar
  });
  cardsList.renderCards(cards);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  // завершить лоадер
});

// экземпляр класса для работы с данными пользователя
const userInfo = new UserInfo({
  name: '.profile__name'
  ,description: '.profile__description'
  ,avatar: '.profile__avatar'
  ,avatar_button: '.profile__replace-avatar'
});

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
  ,(data) => {cardsList.addCard(createCard(data))}
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
