import User from "../entities/User";

interface IUsersRepository {
    create(user: User): Promise<User>;
    get(email: string): Promise<User>;
    exists(email: string): Promise<boolean>;
}

export default IUsersRepository;