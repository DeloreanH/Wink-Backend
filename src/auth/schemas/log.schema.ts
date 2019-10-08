import { Schema } from 'mongoose';

export const logSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    provider: {
        type: String,
    },
    token: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
