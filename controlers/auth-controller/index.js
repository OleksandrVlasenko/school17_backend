import { login } from "./login.js";
import { register } from "./register.js";
import { logOut } from "./logOut.js";
import { getCurrentUser } from "./getCurrentUser.js";

import { ctrlWrapper } from "../../helpers/index.js";

const authController = {
	getCurrentUser: ctrlWrapper(getCurrentUser),
	register: ctrlWrapper(register),
	logOut: ctrlWrapper(logOut),
	login: ctrlWrapper(login),
	// updateUserData: ctrlWrapper(updateUserData),
};

export { authController };