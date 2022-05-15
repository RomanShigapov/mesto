export default class UserInfo {
  constructor({ profile_name, profile_description }) {
    this._profile_name = document.querySelector(profile_name);
    this._profile_description = document.querySelector(profile_description);
  }

  setUserInfo({ profile_name, profile_description }) {
    this._profile_name.textContent = profile_name;
    this._profile_description.textContent = profile_description;
  }

  getUserInfo() {
    return {
      profile_name: this._profile_name.textContent
      ,profile_description: this._profile_description.textContent
    };
  }
}
