import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

import User from "../../entities/User";
import IUsersRepository from "../IUsersRepository";

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

	async get(email: string) {
		const user = this.users.find(data => data.email == email);

		return user;
	}	

	async exists(email: string): Promise<boolean> {
		const user = this.users.some((user) => user.email === email);

		return user;
	}
}

export default UsersRepositoryInMemory;