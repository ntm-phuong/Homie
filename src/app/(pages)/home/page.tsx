'use client'
import ModalLogin from "@/src/components/modal-login/ModalLogin";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "@/public";

const Home = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [users, setUsers] = useState([]);
  console.log(users, 'chinh13');
  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
  }, []);

  return (
    <div className="bg-red-500">Đi đi em , do dự tới hạn mất
      <Button
        onClick={() => {
          setIsShowLogin(true);
        }}
        className="bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
      >
        Click Login Modal dfvvfvv df
      </Button>
      {isShowLogin && (
        <ModalLogin isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} />
      )}
      <img src={IMAGE_URL.TEST} alt="" />
    </div>
  );
}

export default Home;