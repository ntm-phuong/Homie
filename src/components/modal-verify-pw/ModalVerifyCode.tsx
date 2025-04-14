'use client';

import { Modal, Form, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

interface VerifyCodeProps {
  isShowVerifyCode: boolean;
  setIsShowVerifyCode: (isShow: boolean) => void;
  setIsShowSetPassword: (isShow: boolean) => void;
  setIsShowLogin: (isShow: boolean) => void;
  email: string; // Nhận email từ ModalForgotPassword
  resetToken: string; // Nhận resetToken từ ModalForgotPassword
  setResetToken: (token: string) => void; // Cập nhật resetToken nếu cần
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
      const response = await axios.post('/api/verify-code', {
        email,
        code: values.code,
      });
      message.success(response.data.message);
      setResetToken(response.data.resetToken); // Cập nhật resetToken nếu cần
      setIsShowVerifyCode(false);
      setIsShowSetPassword(true); // Mở ModalSetPassword
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đã có lỗi xảy ra');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post('/api/forgot-password', { email });
      message.success('Verification code resent');
      setResetToken(response.data.resetToken); // Cập nhật resetToken mới
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đã có lỗi xảy ra');
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