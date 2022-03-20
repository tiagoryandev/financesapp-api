import express from "express";
import ensureAuthentication from "./middlewares/ensureAuthentication";
import CreateUserModule from "./modules/CreateUserModule";
import AuthUserModule from "./modules/AuthUserModule";
import GetUserModule from "./modules/GetUserModule";

const router = express.Router();

router.get("/@me", ensureAuthentication, (request, response) => GetUserModule().execute(request, response));

router.post("/users", (request, response) => CreateUserModule().execute(request, response));
router.post("/auth", (request, response) => AuthUserModule().execute(request, response));

export default router;