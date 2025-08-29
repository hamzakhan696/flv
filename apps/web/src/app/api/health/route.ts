import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import IORedis from "ioredis";
import { env } from "shared/src/env";
import { queues } from "shared/src/queue";
import { logger } from "shared/src/logger";
const prisma = new PrismaClient();
const redis = new IORedis(env.REDIS_URL);
export async function GET() {
  const out = {
    db: false,
    redis: false,
    queue: false,
    version: process.env.VERCEL_GIT_COMMIT_SHA || "local",
  };
  try {
    await prisma.$queryRaw`SELECT 1`;
    out.db = true;
  } catch {}
  try {
    await redis.ping();
    out.redis = true;
  } catch {}
  try {
    await queues.health.add("probe", { ts: Date.now() });
    out.queue = true;
  } catch {}
  const ok = out.db && out.redis && out.queue;
  logger.info({ health: out }, "healthcheck");
  return NextResponse.json({ ok, ...out }, { status: ok ? 200 : 503 });
}
