'use client';

import { Modal, Form, Input, Button } from "antd";

interface VerifyCodeProps {
  isShowVerifyCode: boolean;
  setIsShowVerifyCode: (isShow: boolean) => void;
  setIsShowSetPassword: (isShow: boolean) => void;
  setIsShowLogin: (isShow: boolean) => void;
}

const ModalVerifyCode: React.FC<VerifyCodeProps> = ({
  isShowVerifyCode,
  setIsShowVerifyCode,
  setIsShowSetPassword,
  setIsShowLogin
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsShowVerifyCode(false);
  };

  const handleSubmit = (values: { code: string }) => {
    console.log("Verification code submitted:", values.code);
    setIsShowVerifyCode(false);
    setIsShowSetPassword(true);
  };

  const handleResendCode = () => {
    console.log("Resending verification code");
    // Add resend logic here
  };

  const switchToLogin = () => {
    setIsShowVerifyCode(false);
    setIsShowLogin(true);
  };

  return (
    <Modal
      open={isShowVerifyCode}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <button
        onClick={switchToLogin}
        className="text-rose-500 hover:text-rose-700 text-lg mb-8 inline-flex items-center font-medium transition-colors"
      >
        <span className="mr-1">←</span> Back to login
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-3">Verify code</h1>
      <p className="text-gray-600 text-sm mb-8 leading-5">
        An authentication code has been sent to your email.
      </p>

      <Form form={form} layout="vertical" onFinish={handleSubmit} className="w-full">
        <Form.Item
          label={<span className="font-bold text-xl">Enter Code</span>}
          name="code"
          rules={[
            { required: true, message: 'Please input the verification code!' },
            { min: 6, message: 'Code must be 6 characters!' },
            { max: 6, message: 'Code must be 6 characters!' }
          ]}
        >
          <Input
            placeholder="Enter code here"
            className="h-[50px] text-lg hover:!border-rose-300 focus:!border-rose-500 focus:!shadow-[0_0_0_2px_rgba(244,63,94,0.1)] text-left font-mono"
          />
        </Form.Item>

        <div className="text-left mb-12">
          <span className="text-gray-800 text-sm mr-1">Didn't receive a code?</span>
          <button
            type="button"
            onClick={handleResendCode}
            className="text-rose-500 hover:text-rose-700 text-sm font-medium"
          >
            Resend
          </button>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="!bg-rose-500 hover:!bg-rose-600 !text-white !h-[50px] !w-full !text-lg !font-medium !border-transparent"
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalVerifyCode;