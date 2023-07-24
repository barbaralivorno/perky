import Component from "./component";

class RecentViewProducts extends Component {
  constructor(element) {
    super(element);

    this._product = document.querySelectorAll(".s-product-grid__products-item");
    this._list = this.findElement("list");
    this._recentlyViewedProducts =
      JSON.parse(localStorage.getItem("recently_viewed")) || [];
    this._phoneSize = window.innerWidth < 768;

    if (this._recentlyViewedProducts.length > 0) this._getRecentPdp();
    else document.querySelector(".s-recently-view-products").hidden = true;

    if (this._phoneSize) this._initSlider();
    this._listen();
  }

  _listen() {
    this._product.forEach((element) => {
      element.addEventListener("click", (event) => {
        const item = event.currentTarget;
        this._setRecentlyViewedProducts(item);
      });
    });
  }

  _setRecentlyViewedProducts(item) {
    const productData = {
      productTitle: item.querySelector(".card-product__info-title").innerText,
      productImg: item.querySelector(".image").getAttribute("src"),
      productCategory: item
        .querySelector(".card-product__info-type")
        .innerText.toLowerCase(),
      productPrice: item.querySelector(".price-tag")
        ? item.querySelector(".price-tag").innerText
        : false,
      productNotAvailable: item.querySelector(".card-product__info-message")
        ? item.querySelector(".card-product__info-message").innerText
        : false,
    };

    const isProductStored = this._recentlyViewedProducts.some(
      (product) => product.productTitle === productData.productTitle
    );

    if (!isProductStored) {
      this._recentlyViewedProducts.unshift(productData);

      const limitedRecentlyViewedProducts = this._recentlyViewedProducts.slice(
        0,
        5
      );

      localStorage.setItem(
        "recently_viewed",
        JSON.stringify(limitedRecentlyViewedProducts)
      );
    }
  }

  _getRecentPdp() {
    const recentlyViewData = JSON.parse(
      localStorage.getItem("recently_viewed")
    );
    const recentViewHtml = [];

    recentlyViewData.forEach((item) => {
      recentViewHtml.push(`
        <li class="s-recently-view-products__item">
          <a class="s-recently-view-products__item-link" href="${
            item.productUrl
          }">
          <picture class="s-recently-view-products__item-picture">
            <img
              class="image image--contain" src='${item.productImg}'
            />
          </picture>
            <h3 class="s-recently-view-products__item-title">
                ${item.productTitle}
              
            </h3>
            <span class="s-recently-view-products__item-category">${
              item.productCategory
            }</span>
            ${
              item.productPrice
                ? `<p class="s-recently-view-products__item-price">${item.productPrice}/per</p>`
                : ""
            }
            ${
              item.productNotAvailable
                ? `<p class="s-recently-view-products__item-price">${item.productNotAvailable}</p>`
                : ""
            }
          </a>
        </li>
      `);
    });

    const recentBlock = `${recentViewHtml.join("")}`;
    this._list.innerHTML = recentBlock;
  }

  _initSlider() {
    let slider = new Flickity(this._list, {
      prevNextButtons: false,
      cellAlign: "right",
      wrapAround: true,
    });
  }
}

RecentViewProducts.selector = ".s-recently-view-products";

export default RecentViewProducts;
