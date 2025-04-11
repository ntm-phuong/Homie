'use client';

import { Modal, Form, Input, Button } from "antd";

interface SetPasswordProps {
  isShowSetPassword: boolean;
  setIsShowSetPassword: (isShow: boolean) => void;
  setIsShowLogin: (isShow: boolean) => void;
}

const ModalSetPassword: React.FC<SetPasswordProps> = ({
  isShowSetPassword,
  setIsShowSetPassword,
  setIsShowLogin
}) => {
  const handleCancel = () => {
    setIsShowSetPassword(false);
  };

  const handleSubmit = (values: { password: string; confirmPassword: string }) => {
    console.log("New password set:", values.password);
    setIsShowSetPassword(false);
    setIsShowLogin(true);
  };

  return (
    <Modal
      open={isShowSetPassword}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Set a password</h1>
      <p className="text-gray-600 text-sm mb-8 leading-5">
        Your previous password has been reseted. Please set a new password for your account.
      </p>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="w-full"
      >
        <Form.Item
          label={<span className="font-bold text-lg">Create Password</span>}
          name="password"
          rules={[
            { required: true, message: 'Please create a password!' },
            { min: 8, message: 'Password must be at least 8 characters!' }
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="h-[50px] text-md hover:!border-rose-300 focus:!border-rose-500 focus:!shadow-[0_0_0_2px_rgba(244,63,94,0.1)]"
          />
        </Form.Item>

        <Form.Item
          label={<span className="font-bold text-lg">Confirm Password</span>}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
            className="h-[50px] text-md hover:!border-rose-300 focus:!border-rose-500 focus:!shadow-[0_0_0_2px_rgba(244,63,94,0.1)]"
          />
        </Form.Item>

        <div className="border-t border-gray-200 my-6"></div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="!bg-rose-500 hover:!bg-rose-600 !text-white !h-[50px] !w-full !text-lg !font-medium !border-transparent"
          >
            Set Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalSetPassword;