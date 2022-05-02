class Item { 
	id?: number;
	user_id: string;
	title: string;
	note: string;
	value: number;
	category_id: number;
	created_at: Date;
	updated_at?: Date;
}

export default Item;