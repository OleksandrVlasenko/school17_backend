import { getStatutLink } from "./getStatutLink.js";
import { addStatutLink } from "./addStatutLink.js";

import { ctrlWrapper } from "../../helpers/index.js";

const statutLinkController = {
	getStatutLink: ctrlWrapper(getStatutLink),
	addStatutLink: ctrlWrapper(addStatutLink),
};

export { statutLinkController };
