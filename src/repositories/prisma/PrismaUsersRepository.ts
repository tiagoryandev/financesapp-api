import { hash } from "bcryptjs";

import prismaClient from "../../database";
import User from "../../entities/User";
import IUsersRepository, { Options } from "../IUsersRepository";

class PrismaUsersRepository implements IUsersRepository {
	async create({ first_name, last_name, email, password, role = "USER" }: User): Promise<User> {
		const passwordMath = await hash(password, 8);

		const user = await prismaClient.user.create({
			data: {
				first_name,
				last_name,
				email,
				role,
				password: passwordMath,
				log_users: {
					create: {
						type: "USER_CREATED"
					}
				}
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
		const user = await prismaClient.user.findUnique({
			where: {
				[option]: value
			}
		});

		return !!user;
	}

	async getAll(): Promise<User[]> {
		const users = await prismaClient.user.findMany({
			select: {
				id: true,
				first_name: true,
				last_name: true,
				email: true,
				is_checked: true,
				role: true,
				created_at: true,
				updated_at: true
			}
		});

		return users;
	}
}

export default PrismaUsersRepository;