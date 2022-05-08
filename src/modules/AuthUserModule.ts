import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import AuthUserService from "../services/AuthUserService";
import AuthUserController from "../controllers/AuthUserController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const authUserService = new AuthUserService(usersRepository);
	const authUserController = new AuthUserController(authUserService);

	return authUserController;
};