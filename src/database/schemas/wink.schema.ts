import { Schema } from 'mongoose';
import { modelName } from '../models-name';

export const winkSchema = new Schema({
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.USER,
    },
    senderVisibility: {
        type: String,
        enum : ['personal', 'professional', 'all', 'general'],
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.USER,
    },
    receiverVisibility: {
        type: String,
        enum : ['personal', 'professional', 'all', 'general'],
    },
    approved: {
        type: Boolean,
        default: false,
    },
    watched: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
