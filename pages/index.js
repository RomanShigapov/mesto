import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
   initialCards
  ,popups
  ,popupOpened_class
  ,formNew
  ,popupProfile
  ,popupNewCard
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
  ,validationConfig
} from '../utils/constants.js';

// объявляем переменные


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



