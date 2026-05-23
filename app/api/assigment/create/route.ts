import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

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

    const rows = JSON.parse(
      formData.get("rows") as string
    ).map((row: any) => ({
      topic: row.type,
      questions: row.questions,
      marks: row.marks,
    }));

    const file = formData.get("file") as File | null;

    let fileUrl = "";

    let extractedText = "";

    let filePath = "";

    if (file) {

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(
        process.cwd(),
        "public/uploads"
      );

      if (!fs.existsSync(uploadDir)) {

        fs.mkdirSync(uploadDir, {
          recursive: true,
        });
      }

      const fileName = `${Date.now()}-${file.name}`;

      filePath = path.join(
        uploadDir,
        fileName
      );

      await writeFile(filePath, buffer);

      fileUrl = `/uploads/${fileName}`;

      try {

        extractedText = await extractPdfText(filePath);

      } catch (err) {

        console.log(
          "PDF extraction failed:",
          err
        );

        extractedText = "";
      }
    }

    const assignment = await Assignment.create({
      dueDate,
      additional,
      rows,
      fileUrl,
      extractedText,
      status: "pending",
    });

    
    await assignmentQueue.add(
      "generate-paper",
      {
        assignmentId: assignment._id,
      }
    );

   
    return NextResponse.json({
      success: true,
      assignment,
      assignmentId: assignment._id,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}