import React, { useContext } from 'react'
import CartContext from '../../context/cartContext/CartContext'
import { addToCart } from '../../context/cartContext/action'

function ProductCart({product}) {
  const{dispatchCart}=useContext(CartContext)
  const handleAddToCart=()=>{
     dispatchCart(addToCart(product._id));
  }
  return (
    <div className='p-10  rounded-md shadow-2xl shadow-black hover:scale-105 duration-200 flex flex-col cursor-pointer'>
      <img className='object-contain h-48 w-60 ' src={product.images[0]} alt="image is not found" />
     <h1 className='font-bold pt-5'>{product?.title}</h1>
     <h1 className='font-semibold pt-2'>{product?.brand}</h1>

     <p className='pt-2'>{product?.description}</p>
     <h1 className='font-bold text-green-700 pt-3'>${product?.price}</h1>
     <div className='py-5 flex justify-between'>
      <button className='border font-bold bg-orange-600 rounded-md p-2 text-white hover:text-orange-500 hover:bg-white' onClick={handleAddToCart}>Add to cart</button>
      <button><i className="fa-solid fa-heart text-red-600 pr-5"></i></button>
     </div>
    </div>
  )
}

export default ProductCart