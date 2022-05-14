import Category from "../entities/Category";

interface ICategoriesRepository {
    create(category: Category): Promise<Category>;
    exists(id: number): Promise<boolean>;
    getAll(user_id: string): Promise<Category[]>;
    delete(category_id: number): Promise<void>;
}

export default ICategoriesRepository;