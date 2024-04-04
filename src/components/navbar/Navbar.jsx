import React, { useContext } from 'react'
import CartContext from '../../context/cartContext/CartContext'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
  const {cart}=useContext(CartContext)
  const navigate=useNavigate()
  const user=useSelector(state=>state.user.user)
  console.log(user)
  return (
    <div className='bg-black/30 flex justify-between p-4 sticky z-50 top-0'>

        <h1 className='font-bold text-xl cursor-pointer hover:scale-105 duration-200 ' onClick={()=>navigate('/')}>{user?.username}</h1>


         <div className='relative cursor-pointer '>
         <i className="fa-solid fa-cart-shopping font-bold text-xl ml-[1230px]   hover:scale-105 duration-200 mr-5" onClick={()=>{navigate('/cart')}}></i>
         <div className='bg-red-600 w-4 h-4 absolute -top-1 right-4 flex justify-center rounded-full'>
          <p className='text-white text-xs'>
            {cart?.products?.length}
          </p>
         </div>

         </div>
         <i className="fa-solid fa-bag-shopping font-bold text-xl cursor-pointer mr-8  hover:scale-105 duration-200 flex"    onClick={()=>{navigate('/order')}} 
></i>

<i className="fa-solid fa-right-to-bracket font-bold cursor-pointer mr-10 text-xl"  onClick={()=>{navigate('/login')}}></i>
    </div>
  )
}

export default Navbar