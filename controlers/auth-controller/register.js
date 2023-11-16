import { User } from "../../models/index.js";
import bcrypt from "bcrypt";
import { HttpError } from "../../helpers/index.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;
console.log("SECRET_KEY:", SECRET_KEY)

export const register = async (req, res) => {
	console.log("aaa")
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) throw HttpError(409, "Email already exists");

	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		authorizationTokens: [],
	});
	console.log("register  newUser:", newUser)

	const payload = {
		id: newUser._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	console.log("register  token:", token);

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
