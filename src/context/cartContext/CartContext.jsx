import { createContext, useReducer,  } from "react";
import cartReducer from "./cartReducer";
import { initialstate } from "./initialState";

const CartContext = createContext();

export const CartDataprovider = ({ children }) => {
  const[cart,dispatchCart]=useReducer(cartReducer,initialstate)
  return <CartContext.Provider value={{cart,dispatchCart}}>
        
    {children}
  </CartContext.Provider>;
};


export default CartContext