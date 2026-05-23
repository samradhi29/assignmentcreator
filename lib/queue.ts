import { Queue } from "bullmq";
import { redis } from "./redis";

export const assignmentQueue = new Queue("assignmentQueue", {
  connection: redis,
});