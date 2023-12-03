import { addNews } from "./addNews.js";
import { getAllNews } from "./getAllNews.js";

import { ctrlWrapper } from "../../helpers/index.js";

const newsController = {
	addNews: ctrlWrapper(addNews),
	getAllNews: ctrlWrapper(getAllNews),
};

export { newsController };
