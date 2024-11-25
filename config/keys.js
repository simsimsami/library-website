import dotenv from 'dotenv';

dotenv.config();

export const KEYS = {
    PORT: process.env.PORT || 8080,
}