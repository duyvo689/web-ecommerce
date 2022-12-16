import { productsInterface } from "../../values/interfaces";
interface CART {
  cart: productsInterface[];
  type: string;
}

const adminRedux = (state = [], action: CART) => {
  switch (action.type) {
    case "cart":
      return action.cart;
    default:
      return state;
  }
};

export default adminRedux;
