import { mapListToDOMElements } from "./DOMActions.js";
import { getShowsByKey } from "./apiService.js";

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
    this.fetchData();
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
    console.log("selected name", this.selectedName);
    this.fetchData();
  };

  fetchData = () => {
    getShowsByKey(this.selectedName).then((shows) => {
      console.log("Found Show", shows);
    });
  };
}

document.addEventListener("DOMContentLoaded", new TvSearch());
