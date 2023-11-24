import { addNews } from "./addNews.js";

import { ctrlWrapper } from "../../helpers/index.js";

const newsController = {
	addNews: ctrlWrapper(addNews),
};

export { newsController };
