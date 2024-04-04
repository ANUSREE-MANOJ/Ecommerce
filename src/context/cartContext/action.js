import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from "./actionType"


export const addToCart=(data)=>{
    
    return{
        type:ADD_TO_CART,
        payload:data
    }
}

export const removeFromCart=(productId)=>{
    return {
        type:REMOVE_FROM_CART,
        payload:productId
    }
}



export const clearCart = () => ({
  type: CLEAR_CART,
});

export const updateQuantity = (productId, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { id: productId, quantity },
  });