import { combineReducers } from "redux";
import categoryRedux from "./categoryRedux";
import cartRedux from "./cartRedux";
import productTrendRedux from "./productTrendRedux";
import productRedux from "./productRedux";
import orderRedux from "./orderRedux";
import userRedux from "./userRedux";

const rootReducer = combineReducers({
  category: categoryRedux,
  cart: cartRedux,
  products: productRedux,
  productTrend: productTrendRedux,
  orders: orderRedux,
  user: userRedux
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
