// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use local storage
import rootReducer from "./rootReducer";

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"]
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

// RootState 타입을 정의하기 위한 store 미리 선언
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false, // Disable serializability check
  }),
});

export const persistor = persistStore(store);

export default store;

