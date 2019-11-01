import { Schema } from 'mongoose';

export const socialNetworkLinkSchema = new Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
    complement: {
        type: String,
        default: '',
    },
}, {timestamps: true});
