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
  const subject = 'Mã OTP xác thực tài khoản của bạn';
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Chào bạn,</h2>
      <p>Bạn vừa yêu cầu mã OTP tại <strong>HOMIE</strong>.</p>
      <p>Mã OTP của bạn là:</p>
      <h1 style="color: #007BFF">${otp}</h1>
      <p>Mã có hiệu lực trong vòng <strong>10 phút</strong>.</p>
      <br />
      <p style="font-size: 12px; color: #777;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
      <p style="font-size: 12px; color: #777;">HOMIE Team</p>
    </div>
  `;

  await sendEmail({ to: email, subject, html });
};