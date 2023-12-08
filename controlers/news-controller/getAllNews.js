import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";
import { getNewsByQuery } from "../../utils/index.js";

const getAllNews = async (req, res, next) => {
  console.log("getAllNews  req:", req)
  try {
    
		const { page, limit, dateFrom, dateTo } = req.query;
		console.log("getAllNews  dateTo:", dateTo)
		console.log("getAllNews  dateFrom:", dateFrom)

		const pageNumber = page ? Number(page) : 1;
		const pageSize = limit ? Number(limit) : 5;

		// var date = new Date("false");
		// console.log(date instanceof Date && !isNaN(date.valueOf()));

		if (Number.isNaN(pageNumber) || Number.isNaN(pageSize)) {
			throw HttpError(400);
		}

    const filter = {};
    
		if (Boolean(dateFrom) !== Boolean(dateTo)) {
			throw HttpError(400, "Поля 'Від' та 'До' мають бути заповнені");
    }
    
		if (dateFrom > dateTo) {
			throw HttpError(400, "Некоректно заповнена дата");
    }
    
		dateFrom &&
			dateTo &&
			(filter.createdAt = {
				$gte: new Date(new Date(dateFrom)),
				$lte: new Date(new Date(dateTo).setHours(23, 59, 59)),
			});

		const result = await getNewsByQuery(filter, pageNumber, pageSize);

		if (result.length === 0) {
			result.push({ news: [], totalNews: 0, totalPages: 0 });
		} else if (pageNumber > result[0].totalPages) {
			throw HttpError(400);
		}

		const users = await User.find();

		const usersObj = users.reduce((acc, user) => {
			acc[user._id] = user.name;
			return acc;
		}, {});

		result[0].news = result[0].news.map(oneNews => ({
			...oneNews,
			owner: usersObj[oneNews.owner],
		}));

		res.json(result[0]);
	} catch (error) {
		next(error);
	}
};

export { getAllNews };
