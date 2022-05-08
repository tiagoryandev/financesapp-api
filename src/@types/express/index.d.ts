declare namespace Express {
    export interface Request {
        user_id: string;
        user_email: string;
        user_role: "USER" | "ADMIN";
    }
}