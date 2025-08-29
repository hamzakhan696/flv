import { NextResponse } from "next/server";
import { queues } from "shared/src/queue";
export async function POST() {
  await queues.health.add(
    "probe",
    { ts: Date.now() },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    }
  );
  return NextResponse.json({ ok: true });
}
