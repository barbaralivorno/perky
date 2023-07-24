import { getSizedImageUrl } from "@shopify/theme-images";
import Component from "./component";

class ProductGallery extends Component {
  constructor(element) {
    super(element);

    this._list = this.findElement("list");
    this._featuredImage = this.findElement("featured-image");
    this._featuredImageContainer = this.findElement("featured-image-container");
    this._zoom = this.findElement("featured-image-zoom");
    this._zoomedImage = this.findElement("zoomed-image");
    this._tabletDown = window.innerWidth < 1025;
    this._phoneSize = window.innerWidth < 768;

    this._loadImage();
    if (this._phoneSize) this._initSlider();
    this._listen();
  }

  _listen() {
    if (!this._phoneSize) {
      Array.from(this._list.children).forEach((element) => {
        element.addEventListener("click", (e) => {
          const imageSrc = element.querySelector("img").dataset.src;
          this._featuredImage.srcset = `${getSizedImageUrl(
            imageSrc,
            "480x480"
          )}`;
        });
      });
    }

    if (!this._tabletDown) {
      this._featuredImage.addEventListener("mouseenter", (e) => {
        this._zoomedImage.style.backgroundImage = `url('${this._featuredImage.srcset}')`;
      });

      this._featuredImage.addEventListener("mousemove", (e) => {
        this._zoomImage(e);
      });

      this._featuredImage.addEventListener("mouseleave", (e) => {
        this._zoom.style.opacity = 0;
      });
    }
  }

  _zoomImage(e) {
    const containerRect = this._featuredImage.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const zoomedX = (mouseX / containerRect.width) * 100;
    const zoomedY = (mouseY / containerRect.height) * 100;

    this._zoomedImage.style.backgroundPosition = `${zoomedX}% ${zoomedY}%`;

    const frameWidth = this._zoom.offsetWidth;
    const frameHeight = this._zoom.offsetHeight;
    const frameX = Math.max(
      0,
      Math.min(mouseX - frameWidth / 2, containerRect.width - frameWidth)
    );
    const frameY = Math.max(
      0,
      Math.min(mouseY - frameHeight / 2, containerRect.height - frameHeight)
    );

    this._zoom.style.left = `${frameX}px`;
    this._zoom.style.top = `${frameY}px`;
    this._zoom.style.opacity = 0.4;
  }

  _loadImage() {
    Array.from(this._list.children).forEach((element) => {
      const image = element.querySelector("img");
      if (!this._phoneSize) {
        image.src = `${getSizedImageUrl(image.dataset.src, "100x100")}`;
      } else {
        image.src = `${getSizedImageUrl(image.dataset.src, "767x767")}`;
      }
    });
  }

  _initSlider() {
    let slider = new Flickity(this._list, {
      prevNextButtons: false,
      cellAlign: "center",
      wrapAround: true,
    });
  }
}

ProductGallery.selector = ".product-gallery";

export default ProductGallery;
