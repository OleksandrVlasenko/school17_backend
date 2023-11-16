import Joi from "joi";
import { Schema, model } from "mongoose";
import { emailRegexp } from "../constants/constants.js";

import { handleUpdateValidate, handleMongooseError } from "../helpers/index.js";

const userSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: [true, "Email is required"],
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, "Set password for user"],
		},
		authorizationTokens: {
			type: [
				new Schema(
					{
						token: {
							type: String,
							required: true,
						},
					},
					{ _id: false },
				),
			],
		},
	},
	{ versionKey: false, timestamps: true },
);

userSchema.pre("findOneAndUpdate", handleUpdateValidate);

userSchema.post("save", handleMongooseError);

userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

const userRegisterSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

// const userUpdateSchema = Joi.object({
// 	name: Joi.string(),
// 	avatar: Joi.string(),
// });

export {
	User,
	userRegisterSchema,
	userLoginSchema,
	// userUpdateSchema
};
