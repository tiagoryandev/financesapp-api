import Category from "../entities/Category";

interface ICategoriesRepository {
    create(category: Category): Promise<Category>;
    getAll(user_id: string): Promise<Category[]>;
}

export default ICategoriesRepository;