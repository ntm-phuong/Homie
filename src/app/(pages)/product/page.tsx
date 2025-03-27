'use client'
import { useEffect } from "react";

const Product = () => {
   useEffect(() => {
      fetch("/api/homie")
        .then((res) => res.json())
        .then((data) => console.log(data));
    }, []);
  return (
    <div  className="bg-yellow-500">Test page</div>
  );
}
export default Product;