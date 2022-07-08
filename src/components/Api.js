export default class Api {
  constructor({ group_id, auth_token, base_url}) {
    this.group_id = group_id;
    this.auth_token = auth_token;
    this.base_url = base_url;
  }

  // получение карточек с сервера
  getCardsList() {
    fetch(`${this.base_url}${this.group_id}/cards`, {
      headers: {
        authorization: this.auth_token
      }
    }) // туплю с результатом еще раз пройти часть в тренажере и досмотреть вебинар
    .then(res => res.json())
    .then((result) => {
      return result;
    });
  }

  // добавление новой карточки
  // addCard() {}

  // удаление карточки
  // deleteCard() {}

  // добавление удаление лайка карточки
  // setCardLike() {}

  // получение информации о пользователе
  // getUserInfo() {}

  // редактирование данных пользователя
  // setUserInfo() {}

  // обновление аватара пользователя
  // setUserPic() {}



}
