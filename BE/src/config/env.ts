import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || "fallback_secret";
export const SALT_ROUNDS = 10;
export const NODE_ENV = process.env.NODE_ENV || "development";

export const CORS_CONFIG = {
    origin: [
        "http://localhost:5173",
        "http://localhost:3001",
        "https://on-up.vercel.app",
        ...(process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : [])
    ],
    optionsSuccessStatus: 200,
    credentials: true,
};
