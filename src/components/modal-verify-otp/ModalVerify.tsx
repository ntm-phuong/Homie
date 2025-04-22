import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import { toast } from "react-toastify";

interface ModalVerifyProps {
  isShowVerify: boolean;
  setIsShowVerify: (isShowVerify: boolean) => void;
  email: string;
  setIsShowLogin: (isShowLogin: boolean) => void;
}

const ModalVerifyOTP: React.FC<ModalVerifyProps> = ({
  isShowVerify,
  setIsShowVerify,
  email,
  setIsShowLogin,
}) => {
  const [otp, setOtp] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  const handleCancel = () => {
    setIsShowVerify(false);
  };

  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter the OTP!", { position: "top-right" });
      return;
    }

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Verification successful!", { position: "top-right" });
        setIsShowVerify(false);
        setIsShowLogin(true);
      } else {
        toast.error(data.message || "Verification failed!", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Server connection error.", { position: "top-right" });
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const response = await fetch("/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "OTP has been resent!", { position: "top-right" });
      } else {
        toast.error(data.message || "Failed to resend OTP!", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Server connection error.", { position: "top-right" });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Modal open={isShowVerify} onCancel={handleCancel} footer={null}>
      <div className="text-center pb-4">
        <h2 className="text-2xl font-bold">Verify Your Account</h2>
        <p className="text-gray-500 text-lg">
          We have sent you an OTP to verify your account.
        </p>
      </div>
      <Form layout="vertical" onFinish={handleVerify} requiredMark="optional" className="py-4 !px-2">
        <Form.Item
          label={
            <span className="font-bold text-lg">
              OTP <span className="text-red-500">*</span>
            </span>
          }
          name="otp"
          rules={[{ required: true, message: "Please enter your OTP!" }]}
        >
          <Input
            placeholder="Enter the OTP"
            className="h-[50px] text-md"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <button className="!text-white !h-[50px] !w-full !text-xl !font-medium bg-main !hover:none rounded-xl text-center cursor-pointer">
            Verify
          </button>
        </Form.Item>
      </Form>

      <div className=" gap-1  flex flex-row  justify-center">
        <p className="text-gray-500 text-lg">Didn't receive the OTP?</p>
        <button
          onClick={handleResendOTP}
          disabled={resendLoading} 
          className={`ml-1 text-rose-500 hover:text-rose-700 cursor-pointer ${
            resendLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {resendLoading ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </Modal>
  );
};

export default ModalVerifyOTP;