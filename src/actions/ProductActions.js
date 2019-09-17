import { GET_LAST_MONTH_PRICES } from "../constants/ActionTypes";
import * as ProductService from "../services/ProductService";

export const fetchLastMonthPrices = () => dispatch => {
  return new Promise((resolve, reject) => {
    ProductService.getLastMonthPrices()
      .then(trackedProducts => {
        dispatch({
          type: GET_LAST_MONTH_PRICES,
          payload: trackedProducts
        });
        console.log("test");
        resolve(trackedProducts);
      })
      .catch(error => reject(error));
  });
};
