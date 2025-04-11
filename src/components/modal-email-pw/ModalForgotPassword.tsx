'use client';

import { Modal, Form, Input, Button } from "antd";

interface ModalForgotPasswordProps {
  isShowForgotPassword: boolean;
  setIsShowForgotPassword: (isShowForgotPassword: boolean) => void;
  setIsShowLogin: (isShowLogin: boolean) => void;
  setIsShowVerifyCode: (isShowVerifyCode: boolean) => void;
}

const ModalForgotPassword: React.FC<ModalForgotPasswordProps> = ({
  isShowForgotPassword,
  setIsShowForgotPassword,
  setIsShowLogin,
  setIsShowVerifyCode,
}) => {
  const handleCancel = () => {
    setIsShowForgotPassword(false);
  };

  const handleSubmit = (values: { email: string }) => {
    console.log("Password reset requested for:", values.email);
    setIsShowForgotPassword(false);
    setIsShowVerifyCode(true);
  };

  const switchToLogin = () => {
    setIsShowForgotPassword(false);
    setIsShowLogin(true);
  };

  return (
    <Modal
      open={isShowForgotPassword}
      onCancel={handleCancel}
      footer={null}
    >
      <button
        onClick={switchToLogin}
        className="text-rose-500 hover:text-rose-700 text-lg mb-6 inline-flex items-center font-medium transition-colors"
      >
        <span className="mr-1">←</span> Back to login
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Forgot your password?</h2>
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
    </Modal>
  );
};

export default ModalForgotPassword;