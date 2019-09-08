import { firestore } from "../config/Fire";
import { getUser } from "./UserService";
import Store from "../store";

export const getLastMonthPrices = () => {
  return new Promise((resolve, reject) => {
    const { dbid } = Store.getState().UserStore.toJS().userObj;
    const userRef = firestore.doc(`users/${dbid}`);
    userRef.get().then(async doc => {
      const { products } = doc.data();
      let dateLastMonth = new Date();
      dateLastMonth.setMonth(new Date().getMonth() - 1);
      const prodData = await Promise.all(
        products.map(async ({ product, start }) => {
          const startDate = start.toDate();
          const latestDate =
            startDate > dateLastMonth ? startDate : dateLastMonth;
          return await product
            .collection("prices")
            .where("date", ">=", latestDate)
            .get()
            .then(snap => snap.docs.map(doc => doc.data()))
            .catch(({ code, message }) => reject({ errorCode: code, message }));
        })
      );
      resolve(prodData);
    });
  });
};
