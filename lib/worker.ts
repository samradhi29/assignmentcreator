import { Worker } from "bullmq";
import { generatePaper } from "@/services/paper-genration";
import { Redis } from "ioredis";

const connection = new Redis(process.env.REDIS_URL!);

export const assignmentWorker = new Worker(
  "assignmentQueue",
  async (job) => {
    return await generatePaper(job.data.assignmentId);
  },
  {
    connection,
  }
);