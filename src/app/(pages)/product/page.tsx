'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Product = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/home');
    }
  }, [router]);

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