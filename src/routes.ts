import express from "express";

import ensureUserAuthentication from "./middlewares/ensureUserAuthentication";

import GetUserModule from "./modules/GetUserModule";
import GetCategoryListModule from "./modules/GetCategoryListModule";
import GetItemListModule from "./modules/GetItemListModule";
import AuthUserModule from "./modules/AuthUserModule";
import CreateUserModule from "./modules/CreateUserModule";
import CreateCategoryModule from "./modules/CreateCategoryModule";
import CreateItemModule from "./modules/CreateItemModule";

const router = express.Router();

router.get("/@me", ensureUserAuthentication, (request, response) => GetUserModule().execute(request, response));
router.get("/categories", ensureUserAuthentication, (request, response) => GetCategoryListModule().execute(request, response));
router.get("/items", ensureUserAuthentication, (request, response) => GetItemListModule().execute(request, response));

router.post("/users", (request, response) => CreateUserModule().execute(request, response));
router.post("/auth", (request, response) => AuthUserModule().execute(request, response));
router.post("/categories", ensureUserAuthentication, (request, response) => CreateCategoryModule().execute(request, response));
router.post("/items", ensureUserAuthentication, (request, response) => CreateItemModule().execute(request, response));

export default router;