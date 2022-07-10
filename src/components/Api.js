export default class Api {
  constructor(config) {
    this.group_id = config.group_id;
    this.auth_token = config.auth_token;
    this.base_url = config.base_url;
  }

  // вынес одинаковый обработчик ответа сервера в отдельную функцию
  useServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  // получение карточек с сервера
  getCardsList() {
    return fetch(`${this.base_url}${this.group_id}/cards`,{
      headers: {
        authorization: this.auth_token
      }
    })
    .then(res => this.useServerResponse(res));
  }

  // добавление новой карточки
  addCard({ name, link }) {
    return fetch(`${this.base_url}${this.group_id}/cards`,{
      method: 'POST'
      ,headers: {
        authorization: this.auth_token
        ,'Content-Type': 'application/json'
      }
      ,body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => this.useServerResponse(res));
  }

  // удаление карточки
  deleteCard(сardId) {
    return fetch(`${this.base_url}${this.group_id}/cards/${сardId}`,{
      method: 'DELETE'
      ,headers: {
        authorization: this.auth_token
        ,'Content-Type': 'application/json'
      }
    })
    .then(res => this.useServerResponse(res));
  }

  // добавление удаление лайка карточки
  setCardLike(сardId, like) {
    return fetch(`${this.base_url}${this.group_id}/cards/likes/${сardId}`,{
      method: like ? 'PUT' : 'DELETE'
      ,headers: {
        authorization: this.auth_token
        ,'Content-Type': 'application/json'
      }
    })
    .then(res => this.useServerResponse(res));
  }

  // получение информации о пользователе
  getUserInfo() {
    return fetch(`${this.base_url}${this.group_id}/users/me`,{
      headers: {
        authorization: this.auth_token
      }
    })
    .then(res => this.useServerResponse(res));
  }

  // редактирование данных пользователя
  setUserInfo({name, about}) {
    return fetch(`${this.base_url}${this.group_id}/users/me`,{
      method: 'PATCH'
      ,headers: {
        authorization: this.auth_token
        ,'Content-Type': 'application/json'
      }
      ,body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => this.useServerResponse(res));
  }

  // обновление аватара пользователя
  setUserPic(avatar) {
    return fetch(`${this.base_url}${this.group_id}/users/me/avatar`,{
      method: 'PATCH'
      ,headers: {
        authorization: this.auth_token
        ,'Content-Type': 'application/json'
      }
      ,body: JSON.stringify({
        avatar
      })
    })
    .then(res => this.useServerResponse(res));
  }

}
