import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./features/auth/authSlice";
import deckReducer from "./features/deck/deckSlice";
import resultReducer from "./features/result/resultSlice";
import profileReducer from "./features/profile/profileSlice";
import updateAccountReducer from "./features/updateAccount/updateAccountSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  deck: deckReducer,
  result: resultReducer,
  profile: profileReducer,
  updateAccount: updateAccountReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
