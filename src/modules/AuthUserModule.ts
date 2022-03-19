import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import AuthUserService from "../services/AuthUserService";
import AuthUserController from "../controllers/AuthUserController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const authUser = new AuthUserService(usersRepository);
	const authUserController = new AuthUserController(authUser);

	return authUserController;
};