import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import GetUserService from "../services/GetUserService";
import GetUserController from "../controllers/GetUserController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const getUser = new GetUserService(usersRepository);
	const getUserController = new GetUserController(getUser);

	return getUserController;
};