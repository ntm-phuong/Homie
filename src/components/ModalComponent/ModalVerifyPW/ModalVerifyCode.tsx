'use client';

import { Modal, Form, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!isShowVerifyCode) {
      form.resetFields();
    }
  }, [isShowVerifyCode, form]);

  const handleCancel = () => {
    setIsShowVerifyCode(false);
    setIsShowLogin(true);
  };

  const handleSubmit = async (values: { code: string }) => {
    try {
      const response = await axios.post('/api/auth/verifycode', {
        email,
        code: values.code.trim(),
      });

      message.success(response.data.message);
      setResetToken(response.data.resetToken);
      setIsShowVerifyCode(false);
      setIsShowSetPassword(true);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleResendCode = async () => {
    if (resending) return;
    setResending(true);

    try {
      const response = await axios.post('/api/auth/forgotpassword', { email });
      message.success('Verification code resent');
      setResetToken(response.data.resetToken);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setResending(false);
    }
  };

  return (
    <Modal
      open={isShowVerifyCode}
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnClose
    >
      <button
        onClick={handleCancel}
        className="text-rose-500 hover:text-rose-700 text-lg mb-6 inline-flex items-center font-medium transition-colors gap-2"
      >
        <ArrowLeftOutlined />
        Back to login
      </button>
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold">Verify Code</h2>
        <p className="text-gray-500 text-lg">
          An authentication code has been sent to {email}
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="py-4 px-2"
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
            { pattern: /^\d{6}$/, message: 'Code must be exactly 6 digits!' },
          ]}
        >
          <Input
            placeholder="Enter 6-digit code"
            className="h-[50px] text-lg font-mono"
            maxLength={6}
            autoFocus
            inputMode="numeric"
          />
        </Form.Item>
        <div className="pb-3 flex justify-center font-semibold text-[16px]">
          Didn’t receive a code?
          <span
            onClick={handleResendCode}
            className={`ml-1 text-rose-500 hover:text-rose-700 cursor-pointer ${
              resending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {resending ? 'Resending...' : 'Resend'}
          </span>
        </div>
        <Form.Item>
          <button
            type="submit"
            className="text-white h-[50px] w-full text-xl font-medium bg-main hover:bg-main-dark rounded-xl"
          >
            Verify
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalVerifyCode;