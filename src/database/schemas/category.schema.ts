import { Schema } from 'mongoose';
import { Tools } from '../../common/tools/tools';

export const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        set: Tools.removeSpaces,
        lowercase: true,
    },
    description: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
},  { toJSON: { virtuals: true }, toObject: { virtuals: true }, id: false  });

categorySchema.virtual('itemtypes', {
    ref: 'ItemType', // The model to use
    localField: 'name', // is equal to `localField`
    foreignField: 'category', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
    options: { sort: { name: -1 }, limit: 5 }, // Query options, see http://bit.ly/mongoose-query-options
  });
