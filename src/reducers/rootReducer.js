import { combineReducers } from "redux";
import initReducer from "./InitReducer";
import prodReducer from "./ProdReducer";

export default combineReducers({
  UserStore: initReducer,
  ProductStore: prodReducer
});
