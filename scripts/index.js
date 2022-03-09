// описание переменных
const profileEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const popup = document.querySelector('.popup'); // форма для редактирования профиля
const popupClose = popup.querySelector('.popup__close-button'); // кнопка закрытия на форме редактирования профиля
const nameInput = popup.querySelector('.popup__input-name'); // поле ввода имени профиля на форме редактирования
const descriptionInput = popup.querySelector('.popup__input-description'); // поле ввода описания профиля на форме редактирования
const nameOutput = document.querySelector('.profile__name'); // имя профиля на странице
const descriptionOutput = document.querySelector('.profile__description'); // описание профиля на странице
const profileEditForm = document.querySelector('.popup__container'); // форма для редактирования профиля

// открытие/закрытие попапа
function togglePopup(){
  popup.classList.toggle('popup_opened');
};

// установка текущих значений из профиля в форму редактирования
function setPopupInputs(){
  nameInput.value = nameOutput.textContent;
	descriptionInput.value = descriptionOutput.textContent;
}

// сохранения данных из формы редактирования на основную страницу
function formSubmitHandler (evt) {
	evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;

  togglePopup();
};

// обработчик клика по кнопке реактирования профиля
profileEdit.addEventListener('click', function(){
  setPopupInputs();
  togglePopup();
});

// обработчик клика по кнопке закрытия формы редактирования
popupClose.addEventListener('click', togglePopup);

// обработчик закрытия попапа по клику на него
/*popup.addEventListener('click', function(event){
  if (event.target === event.currentTarget) {
    togglePopup();
  };
});*/

// обработчик сохранения данных из формы редактирования в профиль на странице
profileEditForm.addEventListener('submit', formSubmitHandler);
