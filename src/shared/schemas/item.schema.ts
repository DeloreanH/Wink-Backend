import { Schema } from 'mongoose';

export const sectionSchema = new Schema({
    name: {
        type: String,
    },
    key: {
        type: Number,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

export const itemSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    itemType_id: {
        type: Schema.Types.ObjectId,
        ref: 'itemType',
    },
    value: {
        type: String,
    },
    position: {
        type: Number,
    },
    basic: {
        type: Boolean,
    },
    custom: {
        type: String,
    },
    section: {
        type: sectionSchema,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
