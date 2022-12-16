import { productsInterface } from "../../values/interfaces";

interface PRODUCT {
  products: productsInterface[];
  type: string;
}

const adminRedux = (state = [], action: PRODUCT) => {
  switch (action.type) {
    case "products":
      return action.products;
    default:
      return state;
  }
};

export default adminRedux;
