// import { login } from "./login.js";
import { register } from "./register.js";

import { ctrlWrapper } from "../../helpers/index.js";

const authController = {
	// getCurrentUser: ctrlWrapper(getCurrentUser),
	register: ctrlWrapper(register),
	// signOut: ctrlWrapper(signOut),
	// login: ctrlWrapper(login),
	// updateUserData: ctrlWrapper(updateUserData),
};

export { authController };