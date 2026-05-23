import "dotenv/config";

import express from "express";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { generatePaper } from "./services/paper-genration";
import { io as client } from "socket.io-client";

// ---------------- EXPRESS ----------------

const app = express();

const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

app.get("/", (_, res) => {
  res.send("Worker Running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Worker server running on port ${PORT}`);
});

// ---------------- SOCKET ----------------

const socket = client(process.env.SOCKET_URL!, {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to Socket Server");
});

socket.on("disconnect", () => {
  console.log("Socket Disconnected");
});

// ---------------- REDIS ----------------

export const connection = new IORedis(
  process.env.REDIS_URL!,
  {
    maxRetriesPerRequest: null,
    tls: {},
  }
);

// ---------------- WORKER ----------------

const worker = new Worker(
  "assignmentQueue",

  async (job) => {

    const assignmentId =
      job.data.assignmentId;

    console.log(
      "Job received:",
      assignmentId
    );

    socket.emit("assignment-update", {
      assignmentId,
      status: "extracting",
      message: "Extracting PDF...",
    });

    console.log("STEP 1 EMITTED");

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    socket.emit("assignment-update", {
      assignmentId,
      status: "generating",
      message: "Generating Questions...",
    });

    console.log("STEP 2 EMITTED");

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    await generatePaper(
      assignmentId
    );

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

// ---------------- EVENTS ----------------

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