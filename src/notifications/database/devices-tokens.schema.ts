import { Type } from 'class-transformer';
import { Schema, Types } from 'mongoose';

export const DevicesTokens = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  token: {
      type: String,
      required: true,
  }
});
