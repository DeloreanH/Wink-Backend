import { Schema } from 'mongoose';
import { Tools } from '@app/common/tools';
import { modelName } from '@app/database/enums';

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
            type: String,
    },
    status: {
        type: String,
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
        type: String,
        enum : ['personal', 'professional', 'general', 'all'],
        default: 'all',
    },
    autosave: {
        type: Boolean,
        default: true,
    },
    lastActivity: {
        type: Date,
        default: Date(),
        sparse: true,
    },
    location: {
        type: { type: String },
        coordinates: [],
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, id: false, timestamps: true });

userSchema.index({ location: '2dsphere' });

userSchema.virtual('sendedWinks', {
    ref: modelName.WINK, // The model to use
    localField: '_id', // is equal to `localField`
    foreignField: 'sender_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
    // options: { sort: { name: -1 }, limit: 5 }, // Query options,
  });

userSchema.virtual('receivedWinks', {
    ref: modelName.WINK, // The model to use
    localField: '_id', // is equal to `localField`
    foreignField: 'receiver_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
  });
