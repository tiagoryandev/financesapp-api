import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import IUsersRepository from "../repositories/IUsersRepository";
import statusMessages from "../config/statusMessages.json";

interface IUserRequest {
    email: string;
    password: string;
}

export default class AuthUserService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ email, password }: IUserRequest) {
		const userAlreadyExists = await this.usersRepository.exists("email", email);

		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER",
			message: statusMessages.conflict.NOT_FOUND_USER
		};

		const user = await this.usersRepository.get("email", email);
		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) return {
			status: 401,
			code: "EMAIL_OR_PASSWORD_INCORRECT",
			message: statusMessages.authentication.EMAIL_OR_PASSWORD_INCORRECT
		};

		const token = sign({
			email: user.email
		}, process.env.JWT_SECRET_KEY, {
			subject: user.id,
			expiresIn: "7d"
		});

		return {
			status: 200,
			code: "TOKEN_GENERATED",
			message: statusMessages.authentication.TOKEN_GENERATED,
			token,
			user: {
				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				role: user.role,
				email: user.email,
				is_checked: user.is_checked,
				created_at: user.created_at,
				updated_at: user.updated_at
			}
		};
	}
}