import IUsersRepository from "../repositories/IUsersRepository";

import statusMessages from "../config/statusMessages.json";

interface IUserRequest {
    email: string;
}

export default class GetUserService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ email }: IUserRequest) {
		const userAlreadyExists = await this.usersRepository.exists(email);

		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER",
			message: statusMessages.NOT_FOUND_USER
		};

		const user = await this.usersRepository.get(email);

		return {
			status: 200,
			code: "GET_USER",
			messages: statusMessages.GET_USER,
			user: {
				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				is_checked: user.is_checked,
				created_at: user.created_at,
				updated_at: user.updated_at
			}
		};
	}
}