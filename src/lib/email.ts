import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // bỏ qua lỗi SSL (chỉ DEV)
  tls: {
    rejectUnauthorized: false, 
  },
});

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
}) => {
  await transporter.sendMail({
    from: `"Homie" <${process.env.EMAIL_USER}>`,
    ...options
  });
};
export const sendOtpEmail = async (email: string, otp: string) => {
  const subject = 'OTP code authenticated your account';
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Chào bạn,</h2>
      <p>You have just requested the OTP code at <strong>HOMIE</strong>.</p>
      <p>Your OTP code is: </p>
      <h1 style="color: #007BFF">${otp}</h1>
      <p>Code is valid within <strong>10 minutes</strong>.</p>
      <br />
      <p style="font-size: 12px; color: #777;">If you do not make this request, please ignore this email.</p>
      <p style="font-size: 12px; color: #777;">HOMIE Team</p>
    </div>
  `;

  await sendEmail({ to: email, subject, html });
};