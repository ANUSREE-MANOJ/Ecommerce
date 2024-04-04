import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from "./actionType"
import { initialstate } from "./initialState"



const cartReducer=(cart=initialstate,action)=>{
  console.log(cart)
    switch(action.type)
    {
        case ADD_TO_CART:

            const existingProductIndex = cart.products.findIndex(item => item._id === action.payload);
      if (existingProductIndex !== -1) {
        


        const updatedProducts = cart.products.map((item,index)=>{
          if(index===existingProductIndex)
          {
            return {
              ...item,
              quantity:item.quantity + 1,
            };
          }
          return item;
        });
        return {
          ...cart,
          products:updatedProducts
        }
        
      } else {
        
        return {
          ...cart,
          products: [...cart.products, { _id:action.payload, quantity: 1 }]
        };
      }

        
       
        case REMOVE_FROM_CART:
            return {
                ...cart,products:cart.products.filter((item)=>item.id!==action.payload)
    }

    case CLEAR_CART:
      return {
        ...cart,
        products: [], 
      };
    

    case UPDATE_QUANTITY:
      const { id, quantity } = action.payload;
      const updatedCartProducts = cart.products.map((product) =>
        product.id === id ? { ...product, quantity } : product
      );
      return {
        ...cart,
        products: updatedCartProducts,
      };
}
}
export default cartReducer