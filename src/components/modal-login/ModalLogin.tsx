'use client';

import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface ModalLoginProps {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ isShowLogin, setIsShowLogin }) => {
  const handleCancel = () => {
    setIsShowLogin(false);
  };

  const handleLogin = (values: { email: string; password: string }) => {
    console.log("Login values:", values);
    setIsShowLogin(false);
  };

  return (
    <Modal
      visible={isShowLogin}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">Chào mừng bạn đến với Homie</h2>
        <p className="text-gray-500">Vui lòng đăng nhập để tiếp tục</p>
      </div>
      <Form
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu của bạn" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full color-r
          ed-500">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLogin;