import authReducer from "./slices/authSlice";
import { combineReducers } from "redux";
import categoriesReducer from "./slices/categoriesSlice";
import cartReducer from "./slices/cartSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoriesReducer,
  cart: cartReducer,
});
