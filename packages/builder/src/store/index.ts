import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import undoable from "redux-undo";
import { builderSlice } from "./builder-slice";
import { themeSlice } from "./theme-slice";
import { appSlice } from "./app-slice";

const persistConfig = {
  timeout: 1000,
  key: "page-builder",
  storage,
};

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [builderSlice.name]: undoable(builderSlice.reducer, {
    filter: function filterActions(action) {
      return action.type.includes("builder");
    },
  }),
  [themeSlice.name]: themeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
