'use client';

import ModalForgotPassword from '@/src/components/modal-email-pw/ModalForgotPassword';
import ModalSetPassword from '@/src/components/modal-set-pw/ModalSetPassword';
import ModalVerifyCode from '@/src/components/modal-verify-pw/ModalVerifyCode';
import { useState } from 'react';


export default function AuthPage() {
  const [isShowForgotPassword, setIsShowForgotPassword] = useState(false);
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [isShowSetPassword, setIsShowSetPassword] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  return (
    <>
      <ModalForgotPassword
        isShowForgotPassword={isShowForgotPassword}
        setIsShowForgotPassword={setIsShowForgotPassword}
        setIsShowLogin={setIsShowLogin}
        setIsShowVerifyCode={setIsShowVerifyCode}
      />
      <ModalVerifyCode
        isShowVerifyCode={isShowVerifyCode}
        setIsShowVerifyCode={setIsShowVerifyCode}
        setIsShowSetPassword={setIsShowSetPassword}
        setIsShowLogin={setIsShowLogin}
        email={email}
        resetToken={resetToken}
        setResetToken={setResetToken}
      />
      <ModalSetPassword
        isShowSetPassword={isShowSetPassword}
        setIsShowSetPassword={setIsShowSetPassword}
        setIsShowLogin={setIsShowLogin}
        resetToken={resetToken}
      />
      {/* Modal Login khác nếu cần */}
    </>
  );
}