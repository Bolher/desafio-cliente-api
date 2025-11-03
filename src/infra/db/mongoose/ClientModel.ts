import mongoose, { Schema } from 'mongoose';

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

export const ClientModel = mongoose.model('Client', ClientSchema);
