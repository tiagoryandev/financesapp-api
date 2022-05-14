import * as express from "express";

import ensureAuthenticated from "./middlewares/ensureAuthenticated";

import GetUserModule from "./modules/GetUserModule";
import GetUserListModule from "./modules/GetUserListModule";
import GetCategoryListModule from "./modules/GetCategoryListModule";
import GetItemListModule from "./modules/GetItemListModule";
import AuthUserModule from "./modules/AuthUserModule";
import CreateUserModule from "./modules/CreateUserModule";
import CreateCategoryModule from "./modules/CreateCategoryModule";
import CreateItemModule from "./modules/CreateItemModule";
import DeleteCategoryModule from "./modules/DeleteCategoryModule";

const router = express.Router();

router.get("/users", ensureAuthenticated, (request, response) => GetUserListModule().execute(request, response));
router.get("/users/@me", ensureAuthenticated, (request, response) => GetUserModule().execute(request, response));
router.get("/categories", ensureAuthenticated, (request, response) => GetCategoryListModule().execute(request, response));
router.get("/items", ensureAuthenticated, (request, response) => GetItemListModule().execute(request, response));

router.post("/users", (request, response) => CreateUserModule().execute(request, response));
router.post("/auth", (request, response) => AuthUserModule().execute(request, response));
router.post("/categories", ensureAuthenticated, (request, response) => CreateCategoryModule().execute(request, response));
router.post("/items", ensureAuthenticated, (request, response) => CreateItemModule().execute(request, response));

router.delete("/categories/:category_id", ensureAuthenticated, (request: express.Request<{ category_id: string }>, response) => DeleteCategoryModule().execute(request, response));

export default router;