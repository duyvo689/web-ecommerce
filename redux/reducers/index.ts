import { combineReducers } from "redux";
import categoryRedux from "./categoryRedux";
import cartRedux from "./cartRedux";
import productRedux from "./productRedux";

const rootReducer = combineReducers({
  category: categoryRedux,
  cart: cartRedux,
  products: productRedux,

});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
