import { z } from "zod";
const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  SENTRY_DSN: z.string().url().optional(),
  FEATURE_FLAGS: z.string().optional(), // JSON string
});
export const env = schema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  SENTRY_DSN: process.env.SENTRY_DSN,
  FEATURE_FLAGS: process.env.FEATURE_FLAGS,
});
