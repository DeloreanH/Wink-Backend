import { Schema } from 'mongoose';

export const option = new Schema({
    name: {
        type: String,
    },
});

export const itemTypeSchema = new Schema({
    _id: {
        type: String,
        unique: true,
    },
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
    options: [option],
    repeat: Boolean,
    created: {
        type: Date,
        default: Date.now,
    },
},  { _id: false });
