export declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvConfig {
            NODE_ENV: "development" | "production";
            DATABASE_URL: string;
            PORT: string;
            JWT_SECRET_KEY: string;
        }
    }
}