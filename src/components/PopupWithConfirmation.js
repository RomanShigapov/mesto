import PopupWithForm from "./PopupWithForm.js";
export default class PopupWithConfirmation extends PopupWithForm {
  setNewSubmit(new_submit) {
    this._handleFormSubmit = new_submit;
  }
}
