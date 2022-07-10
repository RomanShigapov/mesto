export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderCards(cards) {
    cards.reverse().forEach(card => {
      this.addCard(this._renderer(card));
    });
  }

  addCard(card) {
    this._container.prepend(card);
  }
}
