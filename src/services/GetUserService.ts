import IUsersRepository from "../repositories/IUsersRepository";

type RequestData = {
    id: string;
};

export default class GetUserService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ id }: RequestData) {
		const userAlreadyExists = await this.usersRepository.exists("id", id);

		if (!userAlreadyExists) return {
			status: 401,
			code: "NOT_FOUND_USER"
		};

		const user = await this.usersRepository.get("id", id);

		return {
			status: 200,
			code: "USER_SEARCHED",
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