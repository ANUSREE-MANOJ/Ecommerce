import { useReducer } from "react";
import orderReducer from "./orderReducer";
import { createContext } from "react";


const OrderContext=createContext()
export const OrderProvider = ({ children }) => {
    const [order, dispatchOrder] = useReducer(orderReducer, { products: [] });
  
    return (
      <OrderContext.Provider value={{ order, dispatchOrder }}>
        {children}
      </OrderContext.Provider>
    );
  };
  export default OrderContext
  