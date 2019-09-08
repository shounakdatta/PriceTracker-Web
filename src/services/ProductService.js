import { firestore } from "../config/Fire";
import { getUser } from "./UserService";
import Store from "../store";

export const getLastMonthPricesForAllProducts = () => {
  const { uid } = getUser();
  const state = Store.getState();
  const collectionRef = firestore.collection("users");
  console.log(state);
};
