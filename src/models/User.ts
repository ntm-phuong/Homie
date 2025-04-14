import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String },
  resetToken: { type: String },
  codeExpiry: { type: Date },
  resetTokenExpiry: { type: Date },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
