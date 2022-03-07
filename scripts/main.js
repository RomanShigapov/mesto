const profileEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input-name');
let descriptionInput = popup.querySelector('.popup__input-description');
let nameOutput = document.querySelector('.profile__name');
let descriptionOutput = document.querySelector('.profile__description');

function togglePopup(){
  popup.classList.toggle('popup_opened');
};

function setPopupInputs(){
  nameInput.value = nameOutput.textContent;
	descriptionInput.value = descriptionOutput.textContent;
}

profileEdit.addEventListener('click', function(){
  setPopupInputs();
  togglePopup();
});

popupClose.addEventListener('click', togglePopup);
popup.addEventListener('click', function(event){
  if (event.target === event.currentTarget) {
    togglePopup();
  };
});

// Находим форму в DOM
let profileEditForm = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
	evt.preventDefault();



  nameOutput.textContent = nameInput.value;
  descriptionOutput.textContent = descriptionInput.value;
  togglePopup();
};

profileEditForm.addEventListener('submit', formSubmitHandler);
