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
		const userAlreadyExists = await this.usersRepository.exists(email);

		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER",
			message: statusMessages.NOT_FOUND_USER
		};

		const user = await this.usersRepository.get(email);
		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) return {
			status: 401,
			code: "EMAIL_OR_PASSWORD_INCORRECT",
			message: statusMessages.EMAIL_OR_PASSWORD_INCORRECT
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
			message: statusMessages.TOKEN_GENERATED,
			token
		};
	}
}