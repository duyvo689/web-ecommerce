import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../configs/supabase-client";
import { categoryDefault } from "../../values/default-values";
import { categoryInterface } from "../../values/interfaces";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories:<categoryInterface[]> [],
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
      dispatch(categoriesFetched(category));
    } catch (err) {
      console.log(err);
    }
  };
  return getCategoriesAsync;
};

export const insertCategoryStore = (name: string) => {
  console.log(name)
  const insertCategoryAsync = async (
    dispatch: (arg0: { payload: any; type: string }) => void
  ) => {
    try {
      const { data, error } = await supabase.from("category").insert([{ name: name }]);
      let { data: category } = await supabase
  .from('category')
  .select('*')
      if (category)
      dispatch(categoriesFetched(category));
    } catch (err) {
      console.log(err);
    }
  };
  return insertCategoryAsync;
}

export const { categoriesFetched } = categorySlice.actions;
export default categorySlice.reducer;
