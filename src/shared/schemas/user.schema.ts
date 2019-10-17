import { Schema } from 'mongoose';
import { Tools } from '../tools/tools';

export const userSchema = new Schema({
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        unique: true,
        set: Tools.removeSpaces,
        lowercase: true,
        sparse: true,
        },
    phone: {
        type: {
            phoneNumber: {
                type: Number,
                sparse: true,
            },
            phoneCode: {
                type: Number,
                sparse: true,
            },
    },
    unique: true,
    default: null,
    sparse: true,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
        default: null,
    },
    avatarUrl: {
            type: String ,
    },
    status: {
        type: String ,
    },
    description: {
        type: String ,
    },
    emptyProfile: {
        type: Boolean,
        default: true,
    },
    username: {
        type: String,
        minlength: 8,
        unique: true,
        set: Tools.removeSpaces,
        lowercase: true,
        sparse: true,
    },
    visibility: {
        enum : ['personal', 'profesional', 'todos', 'general'],
        type: String,
        default: 'todos',
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
