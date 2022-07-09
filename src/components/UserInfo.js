export default class UserInfo {
  constructor({ name, description, avatar, avatar_button }) {
    this._profile_name = document.querySelector(name);
    this._profile_description = document.querySelector(description);
    this._profile_picture = document.querySelector(avatar);
    this._avatar_button = document.querySelector(avatar_button);
  }

  getUserInfo() {
    return {
      name: this._profile_name.textContent
      ,description: this._profile_description.textContent
    };
  }

  setUserPic(pic_url) {
    this._profile_picture.src = pic_url;
  }

  setUserInfo({ name, description, pic_url }) {
    if (name) this._profile_name.textContent = name;
    if (description) this._profile_description.textContent = description;
    if (pic_url) this.setUserPic(pic_url);
  }
}
