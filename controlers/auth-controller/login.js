import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) throw HttpError(400, "Email or password invalid");

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) throw HttpError(400, "Email or password invalid");

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, {
		$push: { authorizationTokens: { token } },
	});

	res.json({
		token,
		user: {
			name: user.name,
			email: user.email,
		},
	});
};

export { login };
