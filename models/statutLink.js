import Joi from "joi";
import { Schema, model } from "mongoose";
// import { emailRegexp } from "../constants/constants.js";

import { handleUpdateValidate, handleMongooseError } from "../helpers/index.js";

const statutLinkSchema = new Schema(
	{
		link: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true },
);

statutLinkSchema.pre("findOneAndUpdate", handleUpdateValidate);

statutLinkSchema.post("save", handleMongooseError);

statutLinkSchema.post("findOneAndUpdate", handleMongooseError);

const StatutLink = model("statutLink", statutLinkSchema);

const statutLinkSchemaJoi = Joi.object({
	link: Joi.string().required(),
});

export { StatutLink, statutLinkSchemaJoi };
