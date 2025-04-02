'use client';

import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

interface ModalLoginProps {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isShowLogin, setIsShowLogin }) => {
  const [loginError, setLoginError] = useState<string>("");

  const handleCancel = () => {
    setIsShowLogin(false);
    setLoginError(""); 
  };

  const handleLogin = (values: { email: string; password: string }) => {
    console.log("Login values:", values);

    if (!values.email.includes("@")) {
      setLoginError("Email không hợp lệ! Vui lòng nhập đúng định dạng email.");
      message.error("Email không hợp lệ!");
      return;
    }

    if (values.email === "ntmphuonglao@gmail.com" && values.password === "123456") {
      message.success("Đăng nhập thành công!");
      setIsShowLogin(false); // Chỉ đóng modal khi đăng nhập thành công
      setLoginError(""); // Xóa thông báo lỗi nếu đăng nhập thành công
    } else {
      setLoginError("Email hoặc mật khẩu không đúng!");
      message.error("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <Modal
      open={isShowLogin}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">Chào mừng bạn đến với Homie</h2>
        <p className="text-gray-500 text-lg">Vui lòng đăng nhập để tiếp tục</p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleLogin}
        className="py-4 !space-y-50"
      >
        
        <Form.Item
          label={<span className="font-bold text-lg">Email <span className="text-red-500">*</span></span>}
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email của bạn" className="h-[50px] text-md" />
        </Form.Item>

        
        <Form.Item
          label={<span className="font-bold text-lg">Mật khẩu <span className="text-red-500">*</span></span>}
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải dài hơn 6 ký tự!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu của bạn" className="h-[50px] text-md" />
        </Form.Item>

        {loginError && (
          <div className="text-red-500 text-center mb-4">
            {loginError}
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="!text-white !h-[40px] !w-full !text-lg !font-medium !bg-red-500  focus:bg-red-700"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLogin;