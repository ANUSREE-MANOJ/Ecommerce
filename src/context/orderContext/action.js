// orderContext/action.js

import { ADD_TO_ORDER } from "./actionType";

export const addToOrder = (products) => ({
  type: ADD_TO_ORDER,
  payload: { products },
});
