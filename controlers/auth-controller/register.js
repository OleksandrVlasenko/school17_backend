import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) throw HttpError(409, "Email already exists");

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		authorizationTokens: [],
	});

	const payload = {
		id: newUser._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

	await User.findByIdAndUpdate(newUser._id, {
		$push: { authorizationTokens: { token } },
	});


	res.status(201).json({
		token,
		user: {
			name: newUser.name,
			email: newUser.email,
		},
	});
};

export default { register };
