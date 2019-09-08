import { firestore } from "../config/Fire";
import { getUser } from "./UserService";
import Store from "../store";

export const getLastMonthPricesForAllProducts = () => {
  const { dbid } = Store.getState().UserStore.toJS().userObj;
  const userRef = firestore.doc(`users/${dbid}`);
  userRef.get().then(doc => {
    const { products } = doc.data();
    let dateLastMonth = new Date();
    dateLastMonth.setMonth(new Date().getMonth() - 1);
    products.forEach(({ product, start }) => {
      const startDate = start.toDate();
      const latestDate = startDate > dateLastMonth ? startDate : dateLastMonth;
      firestore
        .doc(product.path)
        .collection("prices")
        .where("date", ">=", latestDate)
        .get()
        .then(snap => snap.forEach(doc => console.log(doc.data())))
        .catch(err => console.log("Error", err));
    });
  });
};
