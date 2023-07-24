import AddToCartForm from "./add-to-cart-form";
import Cart from "./cart";
import CartFloating from "./cart-floating";
import Nav from "./nav";
import NumberInput from "./number-input";
import Popup from "./popup";
import ProductDescription from "./product-description";
import ProductGallery from "./product-gallery";
import ProductGrid from "./product-grid";
import RecentViewProducts from "./recently-view-products";
import SearchForm from "./search-form";

export const LayoutComponents = [Nav, SearchForm];

export const BodyComponents = [
  ProductDescription,
  NumberInput,
  Popup,
  AddToCartForm,
  Cart,
  CartFloating,
  ProductGrid,
  RecentViewProducts,
  ProductGallery,
];

export const AllComponents = BodyComponents.concat(LayoutComponents);
