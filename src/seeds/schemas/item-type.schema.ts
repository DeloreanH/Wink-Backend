import { Schema } from 'mongoose';

export const itemTypeSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    index: {
        type: Number,
    },
    icon: {
        type: Date,
        default: Date.now,
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

export const itemTypeValuesSchema = new Schema({
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
