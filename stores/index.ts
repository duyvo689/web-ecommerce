import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";
import categorisReducer from "./reducers/categorySlice";

export const store = configureStore({
  reducer: {
    products : productsReducer,
    categories : categorisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
