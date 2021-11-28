import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    address: String,
    name: String,
    rating: Number,
    closedDeals: Number
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
