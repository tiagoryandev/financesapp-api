import IUsersRepository from "../repositories/IUsersRepository";

import statusMessages from "../config/statusMessages.json";

interface IUserRequest {
    id: string;
}

export default class GetUserService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ id }: IUserRequest) {
		const userAlreadyExists = await this.usersRepository.exists("id", id);

		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER",
			message: statusMessages.conflict.NOT_FOUND_USER
		};

		const user = await this.usersRepository.get("id", id);

		return {
			status: 200,
			code: "USER_SEARCHED",
			messages: statusMessages.getting.USER_SEARCHED,
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