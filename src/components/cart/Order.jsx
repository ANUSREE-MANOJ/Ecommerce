import React, { useContext, useState } from 'react';
import OrderContext from '../../context/orderContext/OrderContext';
import OrderList from './OrderList';
function Order() {
  const { order } = useContext(OrderContext);
    console.log(order.products)
  return (

    <div className='flex flex-col items-center mt-10'>
      <h1 className='font-bold'>Order List</h1>

       
      <table cellSpacing={40} cellPadding={30} className='mt-10 '>
        <thead className='bg-teal-500 text-white'>
          <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
         {order.products.map((product)=>(
          <OrderList key={product.id}  product={product}/>
         ))}

        </tbody>
      </table>
       
    </div>
  )

}

export default Order;
