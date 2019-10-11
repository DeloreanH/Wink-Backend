import { Schema } from 'mongoose';

export const sectionSchema = new Schema({
    name: {
        type: String,
    },
    key: {
        type: Number,
    },
    position: {
        type: Number,
    },
    custom: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

export const itemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    itemTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'itemType',
    },
    value: {
        type: String,
    },
    position: {
        type: Number,
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

