import { firestore } from "../config/Fire";
import Store from "../store";

export const getLastMonthPrices = () => {
  return new Promise((resolve, reject) => {
    const { uid } = Store.getState().UserStore.toJS().userObj;
    const userRef = firestore.doc(`users/${uid}`);
    userRef.get().then(async doc => {
      const { products } = doc.data();
      let dateLastMonth = new Date();
      dateLastMonth.setMonth(new Date().getMonth() - 1);

      if (!products) return [];
      const prodData = await Promise.all(
        products.map(async ({ product, name, start }) => {
          const startDate = start.toDate();
          const latestDate =
            startDate > dateLastMonth ? startDate : dateLastMonth;
          return await product
            .get()
            .then(async doc => {
              return {
                name,
                prices: await doc.ref
                  .collection("prices")
                  .where("date", ">=", latestDate)
                  .get()
                  .then(snap => snap.docs.map(doc => doc.data()))
              };
            })
            .catch(({ code, message }) => reject({ errorCode: code, message }));
        })
      );
      resolve(prodData);
    });
  });
};
