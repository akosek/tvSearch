import { mapListToDOMElements, createDOMElement } from "./DOMActions.js";
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
      this.renderCards(shows);
    });
  };

  renderCards = (shows) => {
    for (const { show } of shows) {
      this.createShowCard(show);
    }
  };

  createShowCard = (show) => {
    const divCard = createDOMElement("div", "card");
    const img = createDOMElement(
      "img",
      "card-img-top",
      null,
      show.image.medium
    );
    const divCardBody = createDOMElement("div", "card-body");
    const h5 = createDOMElement("h5", "card-title", show.name);
    const p = createDOMElement("p", "card-text", show.summary);
    const btn = createDOMElement("button", "btn btn-primary", "Show Details");

    divCard.appendChild(divCardBody);
    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    this.viewElems.showsWrapper.appendChild(divCard);
  };
}

document.addEventListener("DOMContentLoaded", new TvSearch());
