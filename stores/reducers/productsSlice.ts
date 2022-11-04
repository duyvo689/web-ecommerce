import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../configs/supabase-client";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    productsFetched: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const getProductsStore = () => {
  const getProductsAsync = async (
    dispatch: (arg0: { payload: any; type: string }) => void
  ) => {
    try {
    
let { data: products, error } = await supabase
  .from('products')
  .select('*')
if(products)
      dispatch(productsFetched(products));
    } catch (err) {
      console.log(err);
    }
  };
  return getProductsAsync;
};

export const { productsFetched } = productsSlice.actions;
export default productsSlice.reducer;


//  const dispatch = useAppDispatch();
//   const gameList = useAppSelector((state) => state.games.games);

//   useEffect(() => {
//     dispatch(getGames());
//   }, []);