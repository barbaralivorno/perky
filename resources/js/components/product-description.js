import Component from "./component";

class ProductDescription extends Component {
  constructor(element) {
    super(element);

    this._tabBrowserHeadings = this.findElement("tab-browser-headings-list");
    this._tabBrowserHeadingsItems = this._tabBrowserHeadings.children;
    this._tabBrowserContent = this.findElement("tab-browser-container");
    this._tabBrowserContentItems = this._tabBrowserContent.children;
    this._phoneSize = window.innerWidth < 768;

    if (this._phoneSize || this._tabBrowserContentItems.length > 1)
      this._initTabBrowserActive();
    this._listen();
  }

  _listen() {
    Array.from(this._tabBrowserHeadingsItems).forEach((element) => {
      element.addEventListener("click", (e) => {
        Array.from(this._tabBrowserHeadingsItems).forEach((el) => {
          el.classList.remove("active");
        });

        e.target.classList.add("active");
        this._handleTabBrowserActive(e.target);
      });
    });
  }

  _initTabBrowserActive() {
    let isFirstActiveSet = false;
    let currentActive;
    Array.from(this._tabBrowserHeadingsItems).forEach((element) => {
      if (this._phoneSize && element.hidden) element.hidden = false;

      if (!isFirstActiveSet && !element.hidden) {
        element.classList.add("active");
        isFirstActiveSet = true;
        currentActive = element;
      }
    });

    this._handleTabBrowserActive(currentActive);
  }

  _handleTabBrowserActive(e) {
    this._tabBrowserContent.style.display = "block";

    Array.from(this._tabBrowserContentItems).forEach((element) => {
      element.classList.remove("active");

      if (e.dataset.key == element.dataset.key) {
        element.classList.add("active");
      }
    });
  }
}

ProductDescription.selector = ".product-description";

export default ProductDescription;
