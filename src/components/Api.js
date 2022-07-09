export default class Api {
  constructor(config) {
    this.group_id = config.group_id;
    this.auth_token = config.auth_token;
    this.base_url = config.base_url;
  }

  // получение карточек с сервера
  getCardsList() {
    return fetch(`${this.base_url}${this.group_id}/cards`, {
      headers: {
        authorization: this.auth_token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }


    /*.then(res => res.json())
    .then((result) => {
    console.log(result);
    });*/


  /*
    .then(res.ok ? console.log(res.json()) : Promise.reject(`Ошибка: ${res.status}`));
  }*/

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
