import Item from "../entities/Item";

interface IItemsRepository {
    create(item: Item): Promise<Item>;
}

export default IItemsRepository;