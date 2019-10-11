import { Schema } from 'mongoose';

export const itemTypeSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
    },
    index: {
        type: Number,
    },
    icon: {
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
