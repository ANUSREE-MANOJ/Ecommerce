import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "./router/Router";
import { ProductDataprovider } from "./context/productContext/ProductContext";
import { CartDataprovider } from "./context/cartContext/CartContext";
import { OrderProvider } from "./context/orderContext/OrderContext";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <div>
      <Provider store={store}>
        <OrderProvider>
          <CartDataprovider>
            <ProductDataprovider>
              <BrowserRouter>
                <Routes>
                  <Route path="/*" element={<Router />}></Route>
                </Routes>
              </BrowserRouter>
            </ProductDataprovider>
          </CartDataprovider>
        </OrderProvider>
      </Provider>
    </div>
  );
}

export default App;
