import React, { useEffect, useState } from "react";
import ProductCart from "./ProductCart";

import axios from "axios";
import AddProduct from "./AddProduct";
function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([])  
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.get ("http://localhost:3000/products");
        if (data.success) {
          console.log(data.products)
          setProducts(data.products);
          setLoading(false);
        } else {
          alert(data.err_msg);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
        setLoading(false);
      }
    })();
  }, []);
  return loading ? (
    <div className="flex min-h-screen justify-center items-center">
      <img src="images\load.gif" alt="" className="h-[350px] w-[350px]" />
    </div>
  ) : (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 p-16 gap-5">
        {products.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
      <AddProduct />
    </>
  );
}

export default Products;
