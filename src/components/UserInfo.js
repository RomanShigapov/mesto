export default class UserInfo {
  constructor({ name, description }) {
    this._profile_name = document.querySelector(name);
    this._profile_description = document.querySelector(description);
  }

  setUserInfo({ name, description }) {
    this._profile_name.textContent = name;
    this._profile_description.textContent = description;
  }

  getUserInfo() {
    return {
      name: this._profile_name.textContent
      ,description: this._profile_description.textContent
    };
  }
}
