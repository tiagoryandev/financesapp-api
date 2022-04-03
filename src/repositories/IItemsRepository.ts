import Item from "../entities/Item";

interface IItemsRepository {
    create(item: Item): Promise<Item>;
    getAll(user_id: string): Promise<Item[]>
}

export default IItemsRepository;