import { hash } from "bcryptjs";

import prismaClient from "../../database";
import User from "../../entities/User";
import IUsersRepository, { Options } from "../IUsersRepository";

class PrismaUsersRepository implements IUsersRepository {
	async create({ first_name, last_name, email, password }: User): Promise<User> {
		const passwordMath = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				first_name,
				last_name,
				email,
				password: passwordMath
			}
		});

		await prismaClient.logUser.create({
			data: {
				user_id: user.id,
				type: "CREATED"
			}
		});

		return user;
	}

	async get(option: Options, value: string): Promise<User> {
		const user = await prismaClient.user.findUnique({
			where: {
				[option]: value
			}
		});

		return user;
	}

	async exists(option: Options, value: string): Promise<boolean> {
		const user = await prismaClient.user.findFirst({
			where: {
				[option]: value
			}
		});

		return !!user;
	}
}

export default PrismaUsersRepository;