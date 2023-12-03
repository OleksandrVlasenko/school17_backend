import express from "express";
import { newsController } from "../../controlers/news-controller/index.js";
import {
	validateBody,
	authenticate,
	isEmptyBody,
  upload,
} from "../../middlewares/index.js";
import { newsSchemaJoi } from "../../models/index.js";

const router = express.Router();

router.get("/", newsController.getAllNews);

router.post(
	"/",
	authenticate,
	upload.array("files[]"),
	isEmptyBody,
	validateBody(newsSchemaJoi),
	newsController.addNews,
);

export { router };
