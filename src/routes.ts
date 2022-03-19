import express from "express";
import CreateUserModule from "./modules/CreateUserModule";
import AuthUserModule from "./modules/AuthUserModule";

const router = express.Router();

router.post("/users", (request, response) => CreateUserModule().execute(request, response));
router.post("/auth", (request, response) => AuthUserModule().execute(request, response));

export default router;