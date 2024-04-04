// orderContext/reducer.js

import { ADD_TO_ORDER } from "./actionType";

const orderReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_ORDER:
      return {
        ...state,
        products: [...state.products, ...action.payload.products],
      };
    // Add more cases for other actions if needed

    default:
      return state;
  }
};

export default orderReducer;
