import express from "express";

import ensureAuthentication from "./middlewares/ensureAuthentication";

import GetUserModule from "./modules/GetUserModule";
import GetCategoryListModule from "./modules/GetCategoryListModule";
import GetItemListModule from "./modules/GetItemListModule";
import AuthUserModule from "./modules/AuthUserModule";
import CreateUserModule from "./modules/CreateUserModule";
import CreateCategoryModule from "./modules/CreateCategoryModule";
import CreateItemModule from "./modules/CreateItemModule";

const router = express.Router();

router.get("/@me", ensureAuthentication, (request, response) => GetUserModule().execute(request, response));
router.get("/categories", ensureAuthentication, (request, response) => GetCategoryListModule().execute(request, response));
router.get("/items", ensureAuthentication, (request, response) => GetItemListModule().execute(request, response));

router.post("/users", (request, response) => CreateUserModule().execute(request, response));
router.post("/auth", (request, response) => AuthUserModule().execute(request, response));
router.post("/categories", ensureAuthentication, (request, response) => CreateCategoryModule().execute(request, response));
router.post("/items", ensureAuthentication, (request, response) => CreateItemModule().execute(request, response));

export default router;