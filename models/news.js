import Joi from "joi";
import { Schema, model } from "mongoose";

import { handleUpdateValidate, handleMongooseError } from "../helpers/index.js";

const newsSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		description: {
			type: String,
			default: "",
		},
		imagesURL: {
			type: [
				new Schema({
					public_id: {type: String, required: true},
					url: { type: String, required: true },
				}),
			],
		},
		youtubeURL: {
			type: String,
			default: "",
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ versionKey: false, timestamps: true },
);

newsSchema.pre("findOneAndUpdate", handleUpdateValidate);

newsSchema.post("save", handleMongooseError);

newsSchema.post("findOneAndUpdate", handleMongooseError);

const News = model("news", newsSchema);

const newsSchemaJoi = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	file: Joi.string().allow("").optional(),
	youtubeURL: Joi.string(),
});

export { News, newsSchemaJoi };
