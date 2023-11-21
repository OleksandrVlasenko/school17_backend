import { StatutLink } from "../../models/index.js";

const getStatutLink = async (req, res) => {
	const result = await StatutLink.find();
	console.log("getStatutLink  result:", result);
	res.json({ link: result[0].link });
};

export { getStatutLink };
