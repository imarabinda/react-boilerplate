import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {
  Config,
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
import userSlice from "lib/modules/user/redux/user.slice";
import createCompressEncryptor from "redux-persist-transform-compress-encrypt";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const storeName = `react-project-${process.env.NODE_ENV}`;

const stateSyncConfig: Config = {
  channel: storeName,
  predicate: (action) => {
    const [main] = action.type.split("/");
    const whitelistStartWords = [userSlice.name];
    if (whitelistStartWords?.includes(main)) {
      return true;
    }
    return false;
  },
};

const persistConfig = {
  key: storeName,
  storage,
  version: 1,
  blacklist: [],
  transforms: [
    createCompressEncryptor({
      secretKey: process.env?.REACT_APP_ENCRYPTION_KEY || "#$%^@#@@#@%%^",
    }),
  ],
};

const _combined = combineReducers(rootReducer);

const persistedReducer = persistReducer(
  persistConfig,
  _combined
) as unknown as typeof _combined;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [createStateSyncMiddleware(stateSyncConfig)],
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

initMessageListener(store);

// Infer the `ReduxRootState` and `ReduxAppDispatch` types from the store itself
export type ReduxRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ReduxAppDispatch = typeof store.dispatch;
