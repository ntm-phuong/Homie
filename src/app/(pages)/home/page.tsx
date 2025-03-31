'use client'
import { IMAGE_URL } from "@/public";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="bg-red-500">Đi đi em , do dự tới hạn mất
      <img src={IMAGE_URL.TEST} alt="" />
    </div>
  );
}

export default Home;