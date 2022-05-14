import IUsersRepository from "../repositories/IUsersRepository";

type RequestData = {
	user_id: string;
};

export default class GetUserListService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ user_id }: RequestData) {
		const user = await this.usersRepository.get("id", user_id);

		if (!user) return {
			status: 401,
			code: "NOT_FOUND_USER"
		};

		if (user.role !== "ADMIN") return {
			status: 401,
			code: "PERMISSION_DENIED"
		};

		const users = await this.usersRepository.getAll();

		return {
			status: 200,
			code: "USER_LIST_SEARCHED",
			users
		};
	}
}