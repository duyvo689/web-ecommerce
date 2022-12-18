import { combineReducers } from "redux";
import categoryRedux from "./categoryRedux";
import cartRedux from "./cartRedux";
import productTrendRedux from "./productTrendRedux";
import productRedux from "./productRedux";

const rootReducer = combineReducers({
  category: categoryRedux,
  cart: cartRedux,
  products: productRedux,
  productTrend: productTrendRedux,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
