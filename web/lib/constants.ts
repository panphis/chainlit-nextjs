import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_CHAINLIT_SERVER_URL: z.url(),
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_BASE_PATH: z.string(),
});

const validatedEnv = envSchema.safeParse({
  NEXT_PUBLIC_CHAINLIT_SERVER_URL: process.env.NEXT_PUBLIC_CHAINLIT_SERVER_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
});

if (!validatedEnv.success) {
  throw new Error(`Invalid environment variables: ${validatedEnv.error.message}`);
}

const env = validatedEnv.data;

export const NEXT_PUBLIC_CHAINLIT_SERVER_URL = env.NEXT_PUBLIC_CHAINLIT_SERVER_URL;
export const NEXT_PUBLIC_API_URL = env.NEXT_PUBLIC_API_URL;
export const NEXT_PUBLIC_BASE_PATH = env.NEXT_PUBLIC_BASE_PATH;