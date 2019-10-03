import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: {
		type: String,
		minlength: 8,
		unique: true,
		set: ToolsService.removeSpaces, // Se eliminan los espacios
    lowercase: true, // colocar todo en minusculas
    sparse:true,
	},
	avatarUrl: { type: String },
	email: {
		type: String,
		unique: true,
		set: ToolsService.removeSpaces, // Se eliminan los espacios
    lowercase: true, // colocar todo en minusculas
    sparse: true
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
	password: {
		type: String,
		select: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	platformsId: [{
		type: Schema.Types.ObjectId,
		ref: 'Platform'
	}],
	birthday: {
		type: Date
	},
	firstName: {
		type: String,
		default: ''
	},
	lastName: {
		type: String,
		default: ''
	},
	gender: {
		type: String,
		enum: ['male', 'female']
	}
}
});