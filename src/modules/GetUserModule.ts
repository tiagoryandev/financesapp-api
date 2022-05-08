import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import GetUserService from "../services/GetUserService";
import GetUserController from "../controllers/GetUserController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const getUserService = new GetUserService(usersRepository);
	const getUserController = new GetUserController(getUserService);

	return getUserController;
};