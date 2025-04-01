"use client";
import ModalLogin from "@/src/components/modal-login/ModalLogin";
import ModalRegister from "@/src/components/modal-register/ModalRegister";
import { Button } from "antd";
import { useState } from "react";
import { IMAGE_URL } from "@/public";

const Home = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowRegister, setIsShowRegister] = useState(false);
  return (
    <div className="bg-red-500">
      Đi đi em , do dự tới hạn mất
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
      <Button
        onClick={() => {
          setIsShowRegister(true);
        }}
        className="bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
      >
        Click Register Modal
      </Button>
      {isShowRegister && (
        <ModalRegister
          isShowRegister={isShowRegister}
          setIsShowRegister={setIsShowRegister}
          setIsShowLogin={setIsShowLogin}
        />
      )}
      <img src={IMAGE_URL.TEST} alt="" />
    </div>
  );
};

export default Home;
