import Component from "./component";

class ProductGrid extends Component {
  constructor(element) {
    super(element);

    this._buttonFilters = this.findElement("filters-button");
    this._filters = this.findElement("filters");
    this._phoneSize = window.innerWidth < 768;

    this._listen();
  }

  _listen() {
    if (this._phoneSize) {
      this._buttonFilters.addEventListener("click", () => {
        this._filters.classList.toggle("visible");
      });
    }
  }
}

ProductGrid.selector = ".s-product-grid";

export default ProductGrid;
