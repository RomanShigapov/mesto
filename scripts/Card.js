export class Card {
  constructor(card_data, template_class, handleImageClick){
    this._card_data = card_data; // получаем данные в виде объекта
    this._template_class = template_class; // сохраняем класс шаблона
    this._handleImageClick = handleImageClick;
    this._element = { // создаем объект для хранения ссылок на части шаблона для удобства, в них же при инициализации храним классы для их получения позднее
      image: '.place-card__picture',
      caption: '.place-card__caption',
      like_button: '.place-card__like-button',
      liked_class: 'place-card__like-button_liked',
      delete_button: '.place-card__delete-button'
    };
  }

  _getTemplate() {
    const template = document
    .querySelector(this._template_class).content
    .firstElementChild.cloneNode(true);

    return template;
  }

  _handleLikeClick() {
    this._element.like_button.classList.toggle(this._element.liked_class);
  }

  _handleDeleteClick() {
    this._template.remove();
  }

  generateCard() {
    // клонируем шаблон
    this._template = this._getTemplate();

    // получим связь с частями шаблона
    this._element.image = this._template.querySelector(this._element.image);
    this._element.caption = this._template.querySelector(this._element.caption);
    this._element.like_button = this._template.querySelector(this._element.like_button);
    this._element.delete_button = this._template.querySelector(this._element.delete_button);

    // заполняем данными полученными при создании
    this._element.caption.textContent = this._card_data.name;
    this._element.image.src = this._card_data.link;
    this._element.image.alt = this._card_data.name + ' фото';
    this._element.image.title = this._element.image.alt;

    // вешаем слушатели
    this._element.like_button.addEventListener('click',() => this._handleLikeClick());
    this._element.delete_button.addEventListener('click',() => this._handleDeleteClick());
    this._element.image.addEventListener('click',() => this._handleImageClick(this._card_data.name, this._card_data.link));
    // this._element.image.addEventListener('click',() => {console.log(this._handleImageClick)});
    return this._template;
  }
}
