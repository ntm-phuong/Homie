'use client';

import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

interface ModalLoginProps {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isShowLogin, setIsShowLogin }) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [emailError, setEmailError] = useState("");
 const [passwordError, setPasswordError] = useState("");

  const handleCancel = () => {
    setIsShowLogin(false);
  };

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values, 'test1');
  };
  
  const onChangeEmail = (value: string) => {
    setEmail(value);
    if(value.trim() === "") {
      setEmailError("Please enter Email!");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(value)) {
      setEmailError("Invalid email!");
    }else {
      setEmailError("");
    }
  };

  const onChangePassword = (value:string) => {
    setPassword(value);
    if(value.trim() === "") {
      setPasswordError("Please enter the password!");
      return;
    }
    if(value.length < 8) {
      setPasswordError("The password must be longer than 8 characters!");
    }else {
      setPasswordError("");
    }
  };

  const onFinish = () => {
    if(!emailError && !passwordError && email.trim() && password.trim()) {
      handleLogin({ email, password });
    }
  };

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
        onFinish={onFinish}
        className="py-4"
      >
        
        <Form.Item
          label={<span className="font-bold text-lg">Email <span className="text-red-500">*</span></span>}
          name="email"        
        >
          <Input placeholder="Enter your email" className="h-[50px] text-md" 
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          />
          {emailError && (<span className="text-red-500 text-sm">{emailError}</span>)}
        </Form.Item>
        
        <Form.Item
          label={<span className="font-bold text-lg">Password <span className="text-red-500">*</span></span>}
          name="password"        
        >
          <Input.Password placeholder="Enter your password" className="h-[50px] text-md" 
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          />
          {passwordError && (<span className="text-red-500 text-sm">{passwordError}</span>)}
        </Form.Item>
      
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="!text-white !h-[40px] !w-full !text-lg !font-medium !bg-red-500  focus:bg-red-700"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLogin;