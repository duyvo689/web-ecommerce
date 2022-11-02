import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
  },
  reducers: {
    gamesFetched: (state, action) => {
    //   state.games = action.payload;
    },
  },
});

export const getGames = () => {
  const getGamesAsync = async (
    dispatch: (arg0: { payload: any; type: string }) => void
  ) => {
    try {
    //   const response = await GameAPI.getAllGame();
    //   dispatch(gamesFetched(response?.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  return getGamesAsync;
};

export const { gamesFetched } = productsSlice.actions;
export default productsSlice.reducer;


//  const dispatch = useAppDispatch();
//   const gameList = useAppSelector((state) => state.games.games);

//   useEffect(() => {
//     dispatch(getGames());
//   }, []);