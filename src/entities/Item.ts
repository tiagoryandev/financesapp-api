class Item { 
	id?: string;
	user_id: string;
	title: string;
	note: string;
	value: number;
	category_id: string;
	created_at: Date;
	updated_at?: Date;
}

export default Item;