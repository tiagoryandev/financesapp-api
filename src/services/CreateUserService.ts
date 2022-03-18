import IUsersRepository from "../repositories/IUsersRepository";

interface IUserRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
	constructor(private usersRepository: IUsersRepository) { }

	async execute({ first_name, last_name, email, password }: IUserRequest) {
		const userAlreadyExists = await this.usersRepository.exists(email);

		if (userAlreadyExists) return {
			status: 401,
			code: "USER_ALREADY_EXISTS"
		};

		const user = await this.usersRepository.create({
			first_name,
			last_name,
			email,
			password
		});

		return {
			status: 201,
			code: "USER_CREATED",
			user
		};
	}
}