import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

export const redis = new Redis(
  `rediss://default:${process.env.UPSTASH_REDIS_TOKEN}@${process.env.UPSTASH_REDIS_URL}`
);
