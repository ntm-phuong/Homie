import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  room_id: { type: Number, required: true, unique: true },
  name: String,
  address: String,
  price: String,
  image: String,
  rating: String,
  description_room: String,
  status: String,
  bed_rooms: String,
  bath_room: String,
  occupancy_limit: String,
  type_room: String,
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
