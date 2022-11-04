import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../configs/supabase-client";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    categoriesFetched: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const getCategoriesStore = () => {
  const getCategoriesAsync = async (
    dispatch: (arg0: { payload: any; type: string }) => void
  ) => {
    try {
    
let { data: category, error } = await supabase
  .from('category')
  .select('*')
        if (category)
    console.log(category)
      dispatch(categoriesFetched(category));
    } catch (err) {
      console.log(err);
    }
  };
  return getCategoriesAsync;
};

export const { categoriesFetched } = categorySlice.actions;
export default categorySlice.reducer;
