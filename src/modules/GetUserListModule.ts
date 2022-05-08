import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import GetUserListService from "../services/GetUserListService";
import GetUserListController from "../controllers/GetUserListController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const getUserListService = new GetUserListService(usersRepository);
	const getUserListController = new GetUserListController(getUserListService);

	return getUserListController;
};