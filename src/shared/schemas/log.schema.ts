import { Schema } from 'mongoose';

export const logSchema = new Schema({
    user_id: {
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
