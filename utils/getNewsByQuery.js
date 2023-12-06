import { News } from "../models/index.js";

async function getNewsByQuery(filterQuery, pageNumber, pageSize) {
	return await News.aggregate([
		{
			$match: {
				...filterQuery,
			},
    },
    
		{ $sort: { createdAt: -1 } },

		{
			$facet: {
				news: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }],
				totalCount: [{ $group: { _id: null, count: { $sum: 1 } } }],
			},
		},

		{ $unwind: "$totalCount" },

		{
			$project: {
				_id: 0,
				news: {
					$map: {
						input: "$news",
						in: {
							_id: "$$this._id",
							title: "$$this.title",
							description: "$$this.description",
							imagesURL: "$$this.imagesURL",
							youtubeURL: "$$this.youtubeURL",
							owner: "$$this.owner",
							createdAt: "$$this.createdAt",
							createdAt: "$$this.createdAt",
						},
					},
				},
				totalNews: "$totalCount.count",
				totalPages: { $ceil: { $divide: ["$totalCount.count", pageSize] } },
			},
		},
	]);
}

export { getNewsByQuery };
