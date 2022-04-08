// описание переменных
// -------------------
const popups = document.querySelectorAll('.popup'); // все попапы

const formNew = document.forms['new-card-form']; //форма добавить новую карточку для ресета параметров
const formEdit = document.forms['profile-form']; //форма редактировать профиль для ресета ошибок

const newCardTemplate = document.querySelector('.new-card').content.querySelector('.place-card');

const popupProfile = document.querySelector('.popup_profile');
const popupNewCard = document.querySelector('.popup_new-card');
const popupPicture = document.querySelector('.popup_picture');

const nameInput = document.querySelector('.popup__form-input_profile-name'); // поле ввода имени профиля на форме редактирования
const descriptionInput = document.querySelector('.popup__form-input_profile-description'); // поле ввода описания профиля на форме редактирования

const nameOutput = document.querySelector('.profile__name'); // имя профиля на странице
const descriptionOutput = document.querySelector('.profile__description'); // описание профиля на странице

const cardNameInput = document.querySelector('.popup__form-input_new-card-name'); // поле ввода имени карточки
const cardImageLinkInput = document.querySelector('.popup__form-input_new-card-image-link'); // поле ввода url картинки для карточки

const cardsGrid = document.querySelector('.places__grid-items'); //разметка для вставки карточек

// объявление функций
// ------------------
// закрытие по кнопке Esc
const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  };
};

// открыть попап повесить слушатель по Esc
const openPopup = (popup) => {
  document.addEventListener("keydown", handleEsc);
  popup.classList.add('popup_opened');
};

// закрыть попап снять слушатель по Esc
const closePopup = (popup) => {
  document.removeEventListener('keydown',handleEsc);
  popup.classList.remove('popup_opened');
};

// создать карточку для добавления
function createCard(name, link) {
  const newCard = newCardTemplate.cloneNode(true);
  const cardPicture = newCard.querySelector('.place-card__picture');

  cardPicture.src = link;
  cardPicture.alt = name + ' фото';
  cardPicture.title = cardPicture.alt;
  newCard.querySelector('.place-card__caption').textContent = name;

  cardPicture.addEventListener('click',showCardImage);
  newCard.querySelector('.place-card__like-button').addEventListener('click',button => button.target.classList.toggle('place-card__like-button_liked'));
  newCard.querySelector('.place-card__delete-button').addEventListener('click',button => {removeCard(button.target)});

  return newCard;
};

// добавление карточки в контейнер
function addCard(card, container) {container.prepend(card);}

// удаление карточки
function removeCard(evt) {evt.closest('.place-card').remove();}

// показать карточку
function showCardImage(evt){
  const cardPicture = evt.target.closest('.place-card__picture');
  popupPicture.querySelector('.popup__image').src = cardPicture.src;
  popupPicture.querySelector('.popup__image').alt = cardPicture.alt;
  popupPicture.querySelector('.popup__image-caption').textContent = evt.target.closest('.place-card').querySelector('.place-card__caption').textContent;
  openPopup(popupPicture);
};

// установка текущих значений из профиля в форму редактирования
function setProfilePopupInputs() {
  nameInput.value = nameOutput.textContent;
	descriptionInput.value = descriptionOutput.textContent;
}

// сохранения данных из формы редактирования на основную страницу
function formProfileSubmitHandler(evt) {
	evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  closePopup(evt.target.closest('.popup'));
};

// функция добавления карточки на страницу
function formNewCardSubmitHandler(evt) {
  evt.preventDefault();
  addCard(createCard(cardNameInput.value,cardImageLinkInput.value),cardsGrid);
  closePopup(evt.target.closest('.popup'));
};

function clearErrors(form) {
  const inputs = form.querySelectorAll('.popup__form-input');
  const errors = form.querySelectorAll('.popup__form-input-error');
  inputs.forEach((input) => {input.classList.remove('popup__form-input_error-style')});
  errors.forEach((error) => {error.classList.remove('popup__form-input-error_visible')});
};

// добавим карточки из массива
initialCards.forEach(card => {
  addCard(createCard(card['name'],card['link']),cardsGrid);
});

// добавим слушателей на кнопки
/*cardsGrid.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('place-card__picture')) {
    showCardImage(evt);
  }

  if (evt.target.classList.contains('place-card__like-button')) {
    evt.target.classList.toggle('place-card__like-button_liked');
  }

  if (evt.target.classList.contains('place-card__delete-button')) {
    removeCard(evt.target);
  }
});*/

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
document.querySelector('.profile__edit-button').addEventListener('click',() => {setProfilePopupInputs(); clearErrors(formEdit); openPopup(popupProfile);});
// обработчик сохранения данных из формы редактирования профиля
popupProfile.addEventListener('submit', formProfileSubmitHandler);
// слушатель на кнопку добавления карточки места
document.querySelector('.profile__add-button').addEventListener('click',() => {formNew.reset(); clearErrors(formNew); openPopup(popupNewCard);});
// обработчик события по добавлению новой карточки
popupNewCard.addEventListener('submit', formNewCardSubmitHandler);
