import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductDataprovider = ({ children }) => {
       const [products,setProducts]=useState([])
       const[loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    axios.get('https://dummyjson.com/products')
    .then(res=>{
      setProducts(res.data.products)
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  return <ProductContext.Provider value={{products,loading}}>
    {children}
  </ProductContext.Provider>;
};


export default ProductContext