import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Assignment from "@/models/schema";
import { assignmentQueue } from "@/lib/queue";
import { extractPdfText } from "@/lib/pdf";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const dueDate = formData.get("dueDate") as string;
    const additional = formData.get("additional") as string;

    const rows = JSON.parse(formData.get("rows") as string).map((row: any) => ({
      topic: row.type,
      questions: row.questions,
      marks: row.marks,
    }));

    const file = formData.get("file") as File | null;

    let fileUrl = "";
    let extractedText = "";

    // ---------------- FILE HANDLING ----------------

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      fileUrl = file.name;

      try {
        extractedText = await extractPdfText(buffer);
      } catch (err) {
        console.log("PDF extraction failed:", err);
        extractedText = "";
      }
    }

    // ---------------- SAVE TO DB ----------------

    const assignment = await Assignment.create({
      dueDate,
      additional,
      rows,
      fileUrl,
      extractedText,
      status: "pending",
    });

    // ---------------- ADD TO QUEUE ----------------

    await assignmentQueue.add("generate-paper", {
      assignmentId: assignment._id,
    });

    // ---------------- RESPONSE ----------------

    return NextResponse.json({
      success: true,
      assignment,
      assignmentId: assignment._id,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Failed" },
      { status: 500 }
    );
  }
}