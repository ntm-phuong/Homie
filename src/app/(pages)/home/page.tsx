'use client'
import ModalLogin from "@/src/components/modal-login/ModalLogin";
import { Button } from "antd";
import { useEffect, useState } from "react";

const Home = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  console.log(isShowLogin, 'chinht');
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="bg-red-500">Đi đi em , do dự tới hạn mất
      <Button
        onClick={() => {
          setIsShowLogin(true);
        }}
        className="bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
      >
        Click Login Modal
      </Button>
      {isShowLogin && (
  <ModalLogin isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} />
)}

    </div>
  );
}

export default Home;