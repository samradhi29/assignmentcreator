import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/db";
import Assignment from "@/models/schema";
import { assignmentQueue } from "@/lib/queue";

export async function POST(
  req: NextRequest
) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      dueDate,
      additional,
      rows,
      fileUrl,
    } = body;

    const formattedRows = rows.map(
      (row: any) => ({
        topic: row.type,
        questions: row.questions,
        marks: row.marks,
      })
    );

    

    const assignment =
      await Assignment.create({
        dueDate,
        additional,
        rows: formattedRows,
        fileUrl,
        extractedText: "",
        status: "pending",
      });



    await assignmentQueue.add(
      "generate-paper",
      {
        assignmentId:
          assignment._id.toString(),
      }
    );

    

    return NextResponse.json({
      success: true,
      assignmentId: assignment._id,
    });
  } catch (error) {
    console.log(
      "CREATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed",
      },
      { status: 500 }
    );
  }
}