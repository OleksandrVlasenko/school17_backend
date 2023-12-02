import fs from "fs/promises";

import { HttpError } from "../../helpers/HttpError.js";
import { cloudinary } from "../../helpers/index.js";
import { News } from "../../models/news.js";

const addNews = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { title, description, youtubeURL } = req.body;
		const { files } = req;

		if (!title) {
			throw HttpError(400, "Поле 'Заголовок' обов'язкове");
		}

		const newNews = { title };
		description && (newNews.description = description);
		youtubeURL && (newNews.youtubeURL = youtubeURL);
		newNews.owner = _id;

		if (files) {
			newNews.imagesURL = [];

			const promices = files.map(async file => {
				const { path } = file;

				const { public_id, secure_url } = await cloudinary.uploader.upload(
					path,
					{
						folder: "imagesOfNews",
					},
				);
				newNews.imagesURL.push({ public_id, url: secure_url });
			});

			await Promise.all(promices);
		}

		const result = await News.create(newNews);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	} finally {
		if (req.files) {
			const { files } = req;

			await Promise.all(files.map(file => {
				fs.unlink(file.path);
			}));
		}
	}
};

export { addNews };
