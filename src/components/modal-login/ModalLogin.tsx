'use client';

import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface ModalLoginProps {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
  setIsShowRegister: (isShowLogin: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isShowLogin, setIsShowLogin, setIsShowRegister }) => {
  const handleCancel = () => {
    setIsShowLogin(false);
  };

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values, 'test1');
  };

  const switchToRegister = () => {  
    setIsShowLogin(false);
    setIsShowRegister(true);
  }



  return (
    <Modal
      open={isShowLogin}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">Welcome to Homie</h2>
        <p className="text-gray-500 text-lg">Please login to continue</p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleLogin}
        className="py-4 !px-2"
        requiredMark="optional"
      >
        <Form.Item
          label={<span className="font-bold text-lg">Email <span className="text-red-500">*</span></span>}
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!"
            },
            {
              type: 'email',
              message: "Invalid email format!"
            }
          ]}
        >
          <Input placeholder="Enter your email" className="h-[50px] text-md" />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-lg">Password <span className="text-red-500">*</span></span>}
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!"
            },
            {
              min: 8,
              message: "Password must be at least 8 characters!"
            }
          ]}
        >
          <Input.Password placeholder="Enter your password" className="h-[50px] text-md" />
        </Form.Item>
        <div className="pb-3 flex flex-row justify-end font-semibold cursor-pointer text-[16px]">Forgot Password</div>
        <Form.Item>
          <button
            className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main !hover:none rounded-xl text-center cursor-pointer"
          >
            Login
          </button>
        </Form.Item>
        <div className="text-center text-[16px]">
          Don't have an account? <span className="font-semibold cursor-pointer" onClick={switchToRegister}>Sign Up</span>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalLogin;
