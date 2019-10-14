import { Schema } from 'mongoose';

export const CategorySchema = new Schema({
    _id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        default: '',
    },
    created: {
        type: Date,
        default: Date.now,
    },
}, { _id: false });
