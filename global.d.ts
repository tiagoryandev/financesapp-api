export declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvConfig {
            NODE_ENV: "development" | "production";
            CORS_ORIGIN: string;
            DATABASE_URL: string;
            PORT: string;
            JWT_SECRET_KEY: string;
            STORAGE_TYPE: "local" | "memory";
            PAYPAL_MODE: string;
            PAYPAL_CLIENT_ID: string;
            PAYPAL_SECRET_KEY: string;
        }
    }
}