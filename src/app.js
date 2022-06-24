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
    this.viewElems.showsWrapper.innerHTML = "";
    for (const { show } of shows) {
      this.createShowCard(show);
    }
  };

  createShowCard = (show) => {
    let img;
    let p;
    const divCard = createDOMElement("div", "card");

    const divCardBody = createDOMElement("div", "card-body");
    const h5 = createDOMElement("h5", "card-title", show.name);

    const btn = createDOMElement("button", "btn btn-primary", "Show Details");

    if (show.image) {
      img = createDOMElement("img", "card-img-top", null, show.image?.medium);
    } else {
      img = createDOMElement(
        "img",
        "card-img-top",
        null,
        "https://via.placeholder.com/210x295"
      );
    }

    if (show.summary) {
      p = createDOMElement(
        "p",
        "card-text",
        `${show.summary.slice(0, 100)}...`
      );
    } else {
      p = createDOMElement(
        "p",
        "card-text",
        "There is no summary for this show yet"
      );
    }

    divCard.appendChild(divCardBody);
    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    this.viewElems.showsWrapper.appendChild(divCard);
  };
}

document.addEventListener("DOMContentLoaded", new TvSearch());
