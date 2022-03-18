import express from "express";
import CreateUserModule from "./modules/CreateUserModule";

const router = express.Router();

router.post("/users", (request, response) => CreateUserModule().execute(request, response));

export default router;