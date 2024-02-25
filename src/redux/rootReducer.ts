import userSlice from "lib/modules/user/redux/user.slice";
import commonSlice from "./slices/common.slice";

/* The `rootReducer` is an object that combines multiple reducers into a single reducer function. The keys of the
`rootReducer` object are the names of the slices, and the values are the reducer functions from each
slice. This allows for dynamic naming of the keys based on the slice names. */

const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [commonSlice.name]: commonSlice.reducer,
};

export default rootReducer;
