import _ from "lodash";
import { fromJS } from "immutable";
import { GET_LAST_MONTH_PRICES } from "../constants/ActionTypes";

const initialState = fromJS({
  products: [],
  lastFetched: undefined
});

export default (state = initialState, action) => {
  let newState = state;
  const { type } = action;

  if (type === GET_LAST_MONTH_PRICES) {
    const trackedProducts = _.get(action, "payload", []);
    newState = newState.set("products", trackedProducts);
    return newState;
  } else {
    return state;
  }
};
