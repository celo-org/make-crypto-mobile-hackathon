import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const offerSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'User' },
    address: String,
    price: Number,
    amount: Number,
    collateral: Number,
    details: String,
    deals: [ObjectId],
    active: Boolean
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Offer', offerSchema);
