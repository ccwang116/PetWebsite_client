import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth/userSlice";
import productsReducer from "./features/menu/productsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
});
