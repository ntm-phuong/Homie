import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number,
});

export default mongoose.models.Counter || mongoose.model('Counter', CounterSchema);
