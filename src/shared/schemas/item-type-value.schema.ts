import { Schema } from 'mongoose';

export const itemTypeValueSchema = new Schema({
    itemTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'itemType',
    },
    value: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});
