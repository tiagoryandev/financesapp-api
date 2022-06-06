import Item from "../entities/Item";

interface IItemsRepository {
    create(item: Item): Promise<Item>;
    getAll(user_id: string): Promise<Item[]>;
    exists(item_id: number, user_id: string): Promise<boolean>;
    delete(item_id: number): Promise<void>;
}

export default IItemsRepository;