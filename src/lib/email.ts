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