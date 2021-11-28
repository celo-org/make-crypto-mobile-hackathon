import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const dealSchema = new Schema(
  {
    offer: { type: ObjectId, ref: 'Offer' },
    seller: { type: ObjectId, ref: 'User' },
    buyer: { type: ObjectId, ref: 'User' },
    address: String,
    value: Number,
    amount: Number,
    collateral: Number,
    details: String,
    fulfilled: Boolean,
    closed: Boolean
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Deal', dealSchema);
