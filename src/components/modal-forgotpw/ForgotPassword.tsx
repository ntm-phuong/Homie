'use client';

import { Button, Form, Input } from "antd";

interface ForgotPasswordProps {
  setIsShowLogin: (isShowLogin: boolean) => void;
  setIsShowForgotPassword: (isShowForgotPassword: boolean) => void;
  setIsShowVerifyCode: (isShowVerifyCode: boolean) => void; // Thêm prop mới
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ 
  setIsShowLogin, 
  setIsShowForgotPassword,
  setIsShowVerifyCode // Nhận prop mới
}) => {
  const handleSubmit = (values: { email: string }) => {
    console.log("Password reset requested for:", values.email);
    
    // Ẩn form quên mật khẩu và hiển thị trang verify code
    setIsShowForgotPassword(false);
    setIsShowVerifyCode(true);
  };

  const switchToLogin = () => {
    setIsShowForgotPassword(false);
    setIsShowLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <button
          onClick={switchToLogin}
          className="text-rose-500 hover:text-rose-700 text-lg mb-6 inline-flex items-center font-medium transition-colors"
        >
          <span className="mr-1">←</span> Back to login
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Forgot your password?</h1>
        <p className="text-gray-600 text-sm mb-8 leading-5">
          Don't worry! Enter your email below to reset your password:
        </p>
        
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
          className="w-full"
        >
          <Form.Item
            label={
              <span className="font-bold text-lg">
                Email <span className="text-red-500">*</span>
              </span>
            }
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input 
              placeholder="Enter your email" 
              className="h-[50px] text-md hover:!border-rose-300 focus:!border-rose-500 focus:!shadow-[0_0_0_2px_rgba(244,63,94,0.1)]"
            />
          </Form.Item>

          <Form.Item className="mb-6">
            <Button
              type="primary"
              htmlType="submit"
              className="!bg-rose-500 hover:!bg-rose-600 !text-white !h-[50px] !w-full !text-lg !font-medium !border-transparent"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;