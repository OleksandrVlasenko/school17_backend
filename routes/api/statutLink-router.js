import express from "express";
import { statutLinkController } from "../../controlers/statutLink-controller/index.js";
import {
	validateBody,
	authenticate,
	isEmptyBody,
} from "../../middlewares/index.js";
import { statutLinkSchemaJoi } from "../../models/index.js";

const router = express.Router();

router.get("/", statutLinkController.getStatutLink);

router.post(
	"/",
	isEmptyBody,
	validateBody(statutLinkSchemaJoi),
	statutLinkController.addStatutLink,
);

export { router };
