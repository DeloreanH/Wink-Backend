import { Schema } from 'mongoose';

export const sesionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    serverToken: {
        type: String,
        unique: true,
    },
    token: {
        type: String,
        unique: true,
    },
    blacklist: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
        default: undefined,
         },
});

sesionSchema.index( { expireAt: 1 }, { expireAfterSeconds: 0 } );
