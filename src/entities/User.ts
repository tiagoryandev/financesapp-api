class User {
	id?: string;
	first_name: string;
	last_name: string;
	role?: "USER" | "ADMIN";
	email: string;
	is_checked?: boolean;
	password?: string;
	created_at?: Date;
	updated_at?: Date;
}

export default User;