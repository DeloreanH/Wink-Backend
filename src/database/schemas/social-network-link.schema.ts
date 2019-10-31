import { Schema } from 'mongoose';

export const socialNetworkLinkSchema = new Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
}, {timestamps: true});
