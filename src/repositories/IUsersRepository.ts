import User from "../entities/User";

export type Options = "id" | "email";

interface IUsersRepository {
    create(user: User): Promise<User>;
    get(option: Options, value: string): Promise<User>;
    exists(option: Options, value: string): Promise<boolean>;
    getAll(): Promise<User[]>;
}

export default IUsersRepository;