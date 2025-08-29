import { env } from "./env";
let parsed: Record<string, boolean> = {};
try {
  parsed = env.FEATURE_FLAGS ? JSON.parse(env.FEATURE_FLAGS) : {};
} catch {
  parsed = {};
}
export const flags = parsed;
export const isEnabled = (name: string) => !!flags[name];
