'use client';

import { Modal, Form, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

interface VerifyCodeProps {
  isShowVerifyCode: boolean;
  setIsShowVerifyCode: (isShow: boolean) => void;
  setIsShowSetPassword: (isShow: boolean) => void;
  setIsShowLogin: (isShow: boolean) => void;
  email: string;
  resetToken: string;
  setResetToken: (token: string) => void;
}

const ModalVerifyCode: React.FC<VerifyCodeProps> = ({
  isShowVerifyCode,
  setIsShowVerifyCode,
  setIsShowSetPassword,
  setIsShowLogin,
  email,
  resetToken,
  setResetToken,
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsShowVerifyCode(false);
    setIsShowLogin(true);
  };

  const handleSubmit = async (values: { code: string }) => {
    try {
      const response = await axios.post('/api/verifycode', {
        email,
        code: values.code,
      });

      message.success('Verification successful');
      
      // Save the resetToken from the response
      setResetToken(response.data.resetToken);
      
      // Close current modal and open the set password modal
      setIsShowVerifyCode(false);
      setIsShowSetPassword(true);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Verification failed');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post('/api/forgotpassword', { email });
      message.success('Verification code resent');
      
      // Update the resetToken with the new one
      if (response.data.resetToken) {
        setResetToken(response.data.resetToken);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to resend code');
    }
  };

  const switchToLogin = () => {
    setIsShowVerifyCode(false);
    setIsShowLogin(true);
  };

  return (
    <Modal open={isShowVerifyCode} onCancel={handleCancel} footer={null} width={500}>
      <button
        onClick={switchToLogin}
        className="text-rose-500 hover:text-rose-700 text-lg mb-6 inline-flex items-center font-medium transition-colors gap-2 cursor-pointer"
      >
        <span className="mr-1">
          <ArrowLeftOutlined />
        </span>{' '}
        Back to login
      </button>

      <div className="text-center py-4">
        <h2 className="text-2xl font-bold">Verify code</h2>
        <p className="text-gray-500 text-lg">An authentication code has been sent to your email</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="py-4 !px-2"
        requiredMark="optional"
      >
        <Form.Item
          label={
            <span className="font-bold text-lg">
              Enter Code <span className="text-red-500">*</span>
            </span>
          }
          name="code"
          rules={[
            { required: true, message: 'Please input the verification code!' },
            { len: 6, message: 'Code must be 6 characters!' },
          ]}
        >
          <Input
            placeholder="Enter code here"
            className="h-[50px] text-lg text-left font-mono"
          />
        </Form.Item>

        <div className="pb-3 flex flex-row justify-center font-semibold cursor-pointer text-[16px]">
          Didn't receive a code?{' '}
          <span
            onClick={handleResendCode}
            className="text-rose-500 hover:text-rose-700 ml-1"
          >
            Resend
          </span>
        </div>

        <Form.Item>
          <button
            type="submit"
            className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main hover:bg-main-dark rounded-xl text-center cursor-pointer transition-colors"
          >
            Verify
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalVerifyCode;