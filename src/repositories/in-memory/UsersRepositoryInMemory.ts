import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

import User from "../../entities/User";
import IUsersRepository, { Options } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
	private users: User[] = [];

	async create({ first_name, last_name, email, password }: User) {
		const passwordMath = await hash(password, 8);

		const user: User = {
			id: uuid(),
			first_name,
			last_name,
			email,
			is_checked: false,
			password: passwordMath,
			created_at: new Date(),
			updated_at: new Date()
		};

		this.users.push(user);
		return user;
	}

	async get(option: Options, value: string): Promise<User> {
		const user = this.users.find(data => data[option] === value);

		return user;
	}	

	async exists(option: Options, value: string): Promise<boolean> {
		const user = this.users.some((user) => user[option] === value);

		return user;
	}
}

export default UsersRepositoryInMemory;