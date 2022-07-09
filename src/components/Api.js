export default class Api {
  constructor(config) {
    this.group_id = config.group_id;
    this.auth_token = config.auth_token;
    this.base_url = config.base_url;
  }

  // получение карточек с сервера
  getCardsList() {
    return fetch(`${this.base_url}${this.group_id}/cards`,{
      headers: {
        authorization: this.auth_token
      }
    }) // наконец пригодилось сокращенная запись if
    .then(res => {return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)});
  }

  // добавление новой карточки
  // addCard() {}

  // удаление карточки
  // deleteCard() {}

  // добавление удаление лайка карточки
  // setCardLike() {}

  // получение информации о пользователе
  getUserInfo() {
    return fetch(`${this.base_url}${this.group_id}/users/me`,{
      headers: {
        authorization: this.auth_token
      }
    }) // одинаковый код обработки... надо вынести отдельно
    .then(res => {return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)});
  }

  // редактирование данных пользователя
  // setUserInfo() {}

  // обновление аватара пользователя
  // setUserPic() {}

}
