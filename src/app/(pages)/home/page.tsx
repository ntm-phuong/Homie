'use client'
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => console.log(data));

  }, []);

  return (
    <div className="bg-red-500">Đi đi em , do dự tới hạn mất</div>
  );
}

export default Home;