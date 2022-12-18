import { productsInterface } from "../../values/interfaces";

interface PRODUCT {
  productTrend: productsInterface[];
  type: string;
}

const adminRedux = (state = [], action: PRODUCT) => {
  switch (action.type) {
    case "productTrend":
      return action.productTrend;
    default:
      return state;
  }
};

export default adminRedux;
