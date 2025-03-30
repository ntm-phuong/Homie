'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';

interface Props {
  isShowLogin: boolean;
  setIsShowLogin: (isShowLogin: boolean) => void;
}

const ModalLogin = (props: Props) => {
  const { isShowLogin,setIsShowLogin } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  // const handleOk = () => {
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  //   // Thêm logic xử lý đăng nhập tại đây (ví dụ: gọi API)
  //   setIsShowLogin(false);
  // };

  // const handleCancel = () => {
  //   setIsShowLogin(false);
  // };

  return (
      <Modal
      title="Login"  
      onCancel={() => setIsShowLogin(false)}  // Đóng modal khi bấm "X"
      footer={null}  
      open={isShowLogin} 
      >
        <Form layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default ModalLogin;