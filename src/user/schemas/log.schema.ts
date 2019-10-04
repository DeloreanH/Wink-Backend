import { Schema } from 'mongoose';

export const logSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    provider: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
