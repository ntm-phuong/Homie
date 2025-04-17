import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, required: false }, 
  otpExpiresAt: { type: Date, required: false },
  isVerified: { type: Boolean, default: false }, 
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
