import { Schema } from 'mongoose';
import { Tools } from '../tools/tools';

export const option = new Schema({
    name: {
        type: String,
    },
});

export const itemTypeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        set: Tools.removeSpaces,
        lowercase: true,
    },
    description: {
        type: String,
    },
    index: {
        type: Number,
    },
    icon: {
        type: String,
        default: 'far smile-wink',
    },
    options: [option],
    category: String,
    repeat: Boolean,
    created: {
        type: Date,
        default: Date.now,
    },
});
