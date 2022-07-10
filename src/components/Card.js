export default class Card {
  constructor(card_data, template_class, handleGetUserId, handleImageClick, handleLikeClick, handleDeleteClick){
    this._card_data = card_data; // получаем данные в виде объекта
    this._template_class = template_class; // сохраняем класс шаблона
    this._current_user_id = handleGetUserId(); // получаем id текущего юзера для проверок
    this._handleImageClick = handleImageClick; // обработчик клика по карточке
    this._handleLikeClick = handleLikeClick; // обработчик клика по кнопке лайк
    this._handleDeleteClick = handleDeleteClick; // Обработчик удаления карточки
    this._element = { // создаем объект для хранения ссылок на части шаблона для удобства, в них же при инициализации храним классы для их получения позднее
      image: '.card__picture'
      ,caption: '.card__caption'
      ,like_button: '.card__like-button'
      ,liked_class: 'card__like-button_liked'
      ,card_likes: '.card__likes'
      ,delete_button: '.card__delete-button'
      ,hide_delete_class: 'button_hidden'
    };
    this._delete_button_hidden = false;
  }

  _isLiked() {
    return Boolean(this._card_data.likes.find(like => like._id === this._current_user_id));
  }

  _renderLikes() {
    // отрисуем количество лайков карточки
    this._element.card_likes.textContent = this._card_data.likes.length;

    // проверим есть ли там наш лайк
    if (this._isLiked()) {
      this._element.like_button.classList.add(this._element.liked_class);
    }
    else {
      this._element.like_button.classList.remove(this._element.liked_class);
    }
  }

  _hideDeleteButton() {
    if (!(this._current_user_id === this._card_data.owner._id)) {
      this._element.delete_button.classList.add(this._element.hide_delete_class);
      this._delete_button_hidden = true;
    }
  }

  _getTemplate() {
    const template = document
    .querySelector(this._template_class).content
    .firstElementChild.cloneNode(true);

    return template;
  }

  _setEventListeners() {
    this._element.image.addEventListener('click',() => this._handleImageClick(this._card_data.name, this._card_data.link));
    this._element.like_button.addEventListener('click',() => this._handleLikeClick(this._card_data._id, !this._isLiked()));
    if (!this._delete_button_hidden) {
      this._element.delete_button.addEventListener('click',() => this._handleDeleteClick(this._card_data._id));
    }
  }

  generateCard() {
    // клонируем шаблон
    this._template = this._getTemplate();

    // получим связь с частями шаблона
    this._element.image = this._template.querySelector(this._element.image);
    this._element.caption = this._template.querySelector(this._element.caption);
    this._element.like_button = this._template.querySelector(this._element.like_button);
    this._element.card_likes = this._template.querySelector(this._element.card_likes);
    this._element.delete_button = this._template.querySelector(this._element.delete_button);


    // заполняем данными полученными при создании
    this._element.caption.textContent = this._card_data.name;
    this._element.image.src = this._card_data.link;
    this._element.image.alt = this._card_data.name + ' фото';
    this._element.image.title = this._element.image.alt;
    this._renderLikes();
    this._hideDeleteButton();

    this._setEventListeners();

    return this._template;
  }
}
