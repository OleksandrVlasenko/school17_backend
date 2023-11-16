import express from "express";
import { authController } from "../../controlers/auth-controller/index.js";
import {
	validateBody,
	// authenticate,
	isEmptyBody,
} from "../../middlewares/index.js";
import {
	// userLoginSchema,
	userRegisterSchema,
	// userUpdateSchema,
} from "../../models/index.js";

const router = express.Router();

router.post(
	"/register",
	isEmptyBody,
	validateBody(userRegisterSchema),
	authController.register,
);

// router.post(
// 	"/login",
// 	isEmptyBody,
// 	validateBody(userLoginSchema),
// 	authController.login,
// );

// router.get("/current", authenticate, authController.getCurrentUser);

// router.post("/signout", authenticate, authController.signOut);

// router.patch(
// 	"/update",
// 	authenticate,
// 	validateBody(userUpdateSchema),
// 	authController.updateUserData,
// );

export { router };
