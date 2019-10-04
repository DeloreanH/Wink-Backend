import * as mongoose from 'mongoose';
import { Tools } from 'src/auth/common/tools';

export const userSchema = new mongoose.Schema({
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
    sparse: true,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
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
    emptyUser: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        minlength: 8,
        unique: true,
        set: Tools.removeSpaces,
        lowercase: true,
        sparse: true,
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
