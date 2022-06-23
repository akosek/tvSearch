import { mapListToDOMElements } from "./DOMActions.js";

class TvSearch {
  constructor() {
    this.viewElems = {};
    this.showNameButtons = {};
    this.selectedName = "harry";
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectHTMLElems();
    this.setupListeners();
  };

  connectHTMLElems = () => {
    const listId = Array.from(document.querySelectorAll("[id]")).map(
      (elem) => elem.id
    );
    const listOfShowName = Array.from(
      document.querySelectorAll("[data-show-name]")
    ).map((elem) => elem.dataset.showName);

    console.log(listId);
    console.log(listOfShowName);

    this.viewElems = mapListToDOMElements(listId, "id");
    this.showNameButtons = mapListToDOMElements(
      listOfShowName,
      "data-show-name"
    );

    console.log(this.viewElems);
    console.log(this.showNameButtons);
  };

  setupListeners = () => {
    Object.keys(this.showNameButtons).forEach((showName) => {
      this.showNameButtons[showName].addEventListener(
        "click",
        this.setCurrentNameFilter
      );
    });
  };

  setCurrentNameFilter = () => {
    this.selectedName = event.target.dataset.showName;
  };
}

document.addEventListener("DOMContentLoaded", new TvSearch());
