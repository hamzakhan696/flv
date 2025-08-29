import { Queue, QueueEvents, Worker, JobsOptions } from "bullmq";
import IORedis from "ioredis";
import { env } from "./env";
import { logger } from "./logger";

const connection = new IORedis(env.REDIS_URL);

export type JobKind = "health.probe";
export type HealthProbePayload = { ts: number };

export const queues = {
  health: new Queue<HealthProbePayload>("health", { connection }),
};
export const events = {
  health: new QueueEvents("health", { connection }),
};

export function registerHealthWorker(
  handler?: (p: HealthProbePayload) => Promise<void>
) {
  const worker = new Worker<HealthProbePayload>(
    "health",
    async (job) => {
      logger.info(
        { jobId: job.id, kind: "health.probe" },
        "health job received"
      );
      if (handler) await handler(job.data);
    },
    { connection, concurrency: 5 }
  );
  worker.on("failed", (job, err) =>
    logger.error({ jobId: job?.id, err }, "job failed")
  );
  return worker;
}
