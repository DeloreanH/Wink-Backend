import { Schema } from 'mongoose';

export const CategorySchema = new Schema({
    name: {
        type: String,
        default: '',
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
