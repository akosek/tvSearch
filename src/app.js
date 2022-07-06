import { mapListToDOMElements, createDOMElement } from "./DOMActions.js";
import { getShowsByKey, getShowById } from "./apiService.js";

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
      this.renderCardsList(shows);
    });
  };

  renderCardsList = (shows) => {
    Array.from(document.querySelectorAll("[data-show-id]")).forEach((btn) =>
      btn.removeEventListener("click", this.openDetailView)
    );
    this.viewElems.showsWrapper.innerHTML = "";
    for (const { show } of shows) {
      const card = this.createShowCard(show);
      this.viewElems.showsWrapper.appendChild(card);
    }
  };

  openDetailView = (event) => {
    const { showId } = event.target.dataset;
    console.log(showId);
    getShowById(showId).then((show) => {
      const card = this.createShowCard(show, true);
      this.viewElems.showPreview.appendChild(card);
      this.viewElems.showPreview.style.display = "block";
      console.log(show);
    });
  };

  closeDetailView = (event) => {
    const { showId } = event.target.dataset;
    const closeBtn = document.querySelector(
      `[id="showPreview"] [data-show-id="${showId}]"`
    );

    this.viewElems.showPreview.style.display = "none";
    this.viewElems.showPreview.innerHTML = "";
    closeBtn.removeEventListener("click", this.closeDetailView);
  };

  createShowCard = (show, isDetailed) => {
    let img, p;
    const divCard = createDOMElement("div", "card");

    const divCardBody = createDOMElement("div", "card-body");
    const h5 = createDOMElement("h5", "card-title", show.name);
    const btn = createDOMElement("button", "btn btn-primary", "Show Details");

    if (show.image) {
      if (isDetailed) {
        img = createDOMElement("div", "card-preview-bg");
        img.style.backgroundImage = `url('${show.image?.original}')`;
      } else {
        img = createDOMElement("img", "card-img-top", null, show.image?.medium);
      }
    } else {
      img = createDOMElement(
        "img",
        "card-img-top",
        null,
        "https://via.placeholder.com/210x295"
      );
    }

    if (show.summary) {
      if (isDetailed) {
        p = createDOMElement("p", "card-text", show.summary);
      } else {
        p = createDOMElement(
          "p",
          "card-text",
          `${show.summary.slice(0, 100)}...`
        );
      }
    } else {
      p = createDOMElement(
        "p",
        "card-text",
        "There is no summary for this show yet"
      );
    }

    btn.dataset.showId = show.id;

    if (isDetailed) {
      btn.addEventListener("click", this.closeDetailView);
    } else {
      btn.addEventListener("click", this.openDetailView);
    }

    divCard.appendChild(divCardBody);
    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    return divCard;
  };
}

document.addEventListener("DOMContentLoaded", new TvSearch());
