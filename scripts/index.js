// описание переменных
const popups = document.querySelectorAll('.popup'); // все попапы

const popupProfile = document.querySelector('.popup_profile');
const popupNewCard = document.querySelector('.popup_new-card');
const popupPicture = document.querySelector('.popup_picture');

const nameInput = document.querySelector('.popup__form-input_profile-name'); // поле ввода имени профиля на форме редактирования
const descriptionInput = document.querySelector('.popup__form-input_profile-description'); // поле ввода описания профиля на форме редактирования

const nameOutput = document.querySelector('.profile__name'); // имя профиля на странице
const descriptionOutput = document.querySelector('.profile__description'); // описание профиля на странице

const cardNameInput = document.querySelector('.popup__form-input_new-card-name'); // поле ввода имени карточки
const cardImageLinkInput = document.querySelector('.popup__form-input_new-card-image-link'); // поле ввода url картинки для карточки

const cardTemplate = document.querySelector('.new-card').content; //template для place-card
const cardsGrid = document.querySelector('.places__grid-items'); //разметка для вставки карточек

// объявление функций
function createCard(name, link) {
  const newCard = cardTemplate.querySelector('.place-card').cloneNode(true);
  const cardPicture = newCard.querySelector('.place-card__picture')

  cardPicture.src = link;
  cardPicture.alt = 'фото ' + name;
  newCard.querySelector('.place-card__caption').textContent = name;

  cardPicture.addEventListener('click',showCardImage);
  newCard.querySelector('.place-card__like-button').addEventListener('click',button => button.target.classList.toggle('place-card__like-button_liked'));
  newCard.querySelector('.place-card__delete-button').addEventListener('click',button => {removeCard(button.target)});

  return newCard;
};

//  добавление карточки в контейнер
function addCard(card, container) {
  container.prepend(card);
}

function removeCard(button) {
  const cardToRemove = button.closest('.place-card');
  cardToRemove.remove();
}

function showCardImage(evt){
  const cardPicture = evt.target.closest('.place-card__picture');
  popupPicture.querySelector('.popup__image').src = cardPicture.src;
  popupPicture.querySelector('.popup__image').alt = cardPicture.alt;
  popupPicture.querySelector('.popup__image-caption').textContent = evt.target.closest('.place-card').querySelector('.place-card__caption').textContent;
  togglePopup(popupPicture);
};

// открытие/закрытие попапа
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
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
  togglePopup(evt.target.closest('.popup'));
};

// обнуление входных значений на форме добавления карточки
function setNewCardPopupInputs() {
  cardNameInput.value = '';
  cardImageLinkInput.value = '';
}

// функция добавления карточки на страницу
function formNewCardSubmitHandler(evt) {
  evt.preventDefault();
  addCard(createCard(cardNameInput.value,cardImageLinkInput.value),cardsGrid);
  togglePopup(evt.target.closest('.popup'));
};

// добавим карточки из массива
initialCards.forEach(card => {
  addCard(createCard(card['name'],card['link']),cardsGrid);
});

// добавим слушателей на кнопки
// повесил на кнопки закрытия, функцию закрытия родительских попапов
popups.forEach(popup => {popup.querySelector('.popup__close-button').addEventListener('click',() => {togglePopup(popup)})});
// слушатель на кнопку редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click',() => {setProfilePopupInputs(); togglePopup(popupProfile);});
// обработчик сохранения данных из формы редактирования профиля
popupProfile.addEventListener('submit', formProfileSubmitHandler);
// слушатель на кнопку добавления карточки места
document.querySelector('.profile__add-button').addEventListener('click',() => {setNewCardPopupInputs(); togglePopup(popupNewCard);});
// обработчик события по добавлению новой карточки
popupNewCard.addEventListener('submit', formNewCardSubmitHandler);

// обработчик закрытия попапа по клику на него
/*popup.addEventListener('click', function(event){
  if (event.target === event.currentTarget) {
    togglePopup();
  };
});*/
