import { News, User } from "../../models/index.js";

const getAllNews = async (req, res, next) => {
	const news = await News.find();

	const users = await User.find();

	const usersObj = users.reduce((acc, user) => {
		acc[user._id] = user.name;
		return acc;
	}, {});

	const newsWithOwnerName = news.map(news => {
		const plainObject = news.toObject();
		return {
			...plainObject,
			owner: usersObj[news.owner],
		};
  });
  
	res.json(newsWithOwnerName);
};

export { getAllNews };

