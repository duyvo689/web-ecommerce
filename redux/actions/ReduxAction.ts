
import { categoryInterface, productsInterface } from "../../values/interfaces";


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

export {
cartAction,
  categoryAction,
  productAction
};
