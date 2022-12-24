
import { categoryInterface, orderInterface, productsInterface, userInterface } from "../../values/interfaces";


const categoryAction = (type: any, category: categoryInterface[] | null) => {
  return {
    type,
    category,
  };
};

const productAction = (type: any, products: productsInterface[] | null) => {
  return {
    type,
    products,
  };
};



const cartAction = (type: any, cart: productsInterface[] | null) => {
  return {
    type,
    cart,
  };
};
const productTrendAction = (type: any, productTrend: productsInterface[] | null) => {
  return {
    type,
    productTrend,
  };
};

const orderAction = (type: any, orders: orderInterface[] | null) => {
  return {
    type,
    orders,
  };
};
const userAction = (type: any, user: userInterface| null) => {
  return {
    type,
    user,
  };
};

export {
cartAction,
  categoryAction,
  productAction,
  productTrendAction,
  orderAction,
  userAction
};
