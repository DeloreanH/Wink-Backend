import { Schema } from 'mongoose';
import { modelName } from '../models-name';

export const sectionSchema = new Schema({
    name: {
        type: String,
    },
    key: {
        type: Number,
    },
});

export const itemSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.USER,
    },
    itemtype: String,
    value: {
        type: String,
        default: '',
    },
    position: {
        type: Number,
    },
    basic: {
        type: Boolean,
    },
    custom: {
        type: String,
    },
    section: {
        type: sectionSchema,
    },
    created: {
        type: Date,
        default: Date.now,
    },
},  { toJSON: { virtuals: true }, toObject: { virtuals: true }, id: false  });

itemSchema.virtual('withtypes', {
    ref: modelName.ITEM_TYPE, // The model to use
    localField: 'itemtype', // is equal to `localField`
    foreignField: 'name', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
    options: { sort: { name: -1 }, limit: 5 }, // Query options, see http://bit.ly/mongoose-query-options
  });
