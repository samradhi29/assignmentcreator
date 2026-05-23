import { connectDB } from "@/lib/db";
import Assignment from "@/models/schema";

export async function GET() {
  try {
    await connectDB();

    const assignments = await Assignment.find().sort({ createdAt: -1 });

    return Response.json(assignments);
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}