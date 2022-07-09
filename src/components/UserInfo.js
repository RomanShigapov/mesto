export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._profile_name = document.querySelector(name);
    this._profile_description = document.querySelector(description);
    this._profile_picture = document.querySelector(avatar);
  }

  setUserInfo({ name, description }) {
    this._profile_name.textContent = name;
    this._profile_description.textContent = description;
  }

  // наверное нет смысла в отдельной функции для картинки? переделать
  setUserPicture(pic_url) {
    this._profile_picture.src = pic_url;
  }

  getUserInfo() {
    return {
      name: this._profile_name.textContent
      ,description: this._profile_description.textContent
    };
  }
}
