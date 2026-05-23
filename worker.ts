import "dotenv/config";

import { Worker } from "bullmq";

import IORedis from "ioredis";

import { generatePaper } from "./services/paper-genration";

import { io as client } from "socket.io-client";

const socket = client("http://localhost:4000", {
  transports: ["websocket"],
});

export const connection = new IORedis(
  process.env.REDIS_URL!,
  {
    maxRetriesPerRequest: null,
    tls: {},
  }
);

// ✅ SOCKET CONNECT LOG
socket.on("connect", () => {
  console.log("Connected to Socket Server");
});

socket.on("disconnect", () => {
  console.log("Socket Disconnected");
});

const worker = new Worker(
  "assignmentQueue",

  async (job) => {

    const assignmentId =
      job.data.assignmentId;

    console.log(
      "Job received:",
      assignmentId
    );

    // =========================
    // STEP 1
    // =========================
    socket.emit("assignment-update", {
      assignmentId,
      status: "extracting",
      message: "Extracting PDF...",
    });

    console.log("STEP 1 EMITTED");

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    // =========================
    // STEP 2
    // =========================
    socket.emit("assignment-update", {
      assignmentId,
      status: "generating",
      message: "Generating Questions...",
    });

    console.log("STEP 2 EMITTED");

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    // =========================
    // MAIN AI GENERATION
    // =========================
    await generatePaper(
      assignmentId
    );

    // =========================
    // STEP 3
    // =========================
    socket.emit("assignment-update", {
      assignmentId,
      status: "formatting",
      message:
        "Formatting Assignment...",
    });

    console.log("STEP 3 EMITTED");

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    // =========================
    // COMPLETED
    // =========================
    socket.emit("assignment-update", {
      assignmentId,
      status: "completed",
      message:
        "Assignment Generated Successfully",
    });

    console.log("COMPLETED EMITTED");

    return true;
  },

  {
    connection,
  }
);

// =========================
// WORKER EVENTS
// =========================

worker.on(
  "completed",
  (job) => {

    console.log(
      `Job ${job.id} completed`
    );
  }
);

worker.on(
  "failed",
  (job, err) => {

    console.error(
      `Job ${job?.id} failed:`,
      err.message
    );

    socket.emit(
      "assignment-update",
      {
        assignmentId:
          job?.data.assignmentId,

        status: "failed",

        message:
          "Assignment Generation Failed",
      }
    );
  }
);

console.log(
  "Worker is running..."
);