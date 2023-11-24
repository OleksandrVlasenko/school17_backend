import { StatutLink } from "../../models/index.js";
// import { HttpError } from "../../helpers/HttpError.js";

const addNews = async (req, res, next) => {
	console.log("addNews  res:", res)
	// const result = await StatutLink.find();

	// let newObj = {};

	// if (result.length === 0) {
	// 	newObj = await StatutLink.create({ ...req.body });
	// } else {
	// 	const { _id } = result[0];
	// 	newObj = await StatutLink.findByIdAndUpdate(
	// 		_id,
	// 		{ ...req.body },
	// 		{ new: true },
	// 	);
	// }

	// res.status(201).json({
	// 	link: newObj.link,
  // });
  res.json(req.body)
};

export { addNews };
