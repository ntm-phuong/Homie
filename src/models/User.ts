import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, required: false }, // Trường OTP
  otpExpiresAt: { type: Date, required: false }, // Thời gian hết hạn OTP
  isVerified: { type: Boolean, default: false }, // Trạng thái xác thực
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
