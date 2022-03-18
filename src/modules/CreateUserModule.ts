import PrismaUsersRepository from "../repositories/prisma/PrismaUsersRepository";
import CreateUserService from "../services/CreateUserService";
import CreateUserController from "../controllers/CreateUserController";

export default () => {
	const usersRepository = new PrismaUsersRepository();
	const createUser = new CreateUserService(usersRepository);
	const createUserController = new CreateUserController(createUser);

	return createUserController;
};