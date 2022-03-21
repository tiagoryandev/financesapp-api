import Category from "../entities/Category";

interface ICategoriesRepository {
    create(category: Category): Promise<Category>;
}

export default ICategoriesRepository;