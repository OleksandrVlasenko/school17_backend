import { User } from "../../models/index.js";

const logOut = async (req, res) => {
	const { _id } = req.user;

	const { authorization } = req.headers;
	const result = authorization.split(" ");
	const token = result[1];
	await User.findByIdAndUpdate(_id, {
		$pull: { authorizationTokens: { token } },
	});

	res.json({
		message: "LogOut succes",
	});
};

export { logOut };
