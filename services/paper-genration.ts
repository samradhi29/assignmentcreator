import Assignment from "@/models/schema";

import { connectDB } from "@/lib/db";

import { buildPrompt } from "@/lib/buildprompt";

import { callGemini } from "@/lib/gemini";

export async function generatePaper(
  assignmentId: string
) {

  await connectDB();

  const assignment =
    await Assignment.findById(
      assignmentId
    );

  if (!assignment) {

    throw new Error(
      "Assignment not found"
    );
  }

 
  assignment.status =
    "processing";

  await assignment.save();

  try {

    const prompt =
      buildPrompt(assignment);

    console.log(
     
      !!process.env.GEMINI_API_KEY
    );

    console.log(
   
      process.env.GEMINI_API_KEY?.slice(
        0,
        8
      )
    );

    // AI CALL
    const aiResponse =
      await callGemini(prompt);

    // PARSE AI RESPONSE
    const parsed =
      JSON.parse(aiResponse);

    // SAVE TO DATABASE
    await Assignment.findByIdAndUpdate(
      assignmentId,
      {
        generatedPaper: parsed,
        status: "completed",
      }
    );

    console.log(
      "Assignment Generated Successfully"
    );

    return parsed;

  } catch (error: any) {

    console.error(
      "generatePaper error:"
    );

    console.error(
      "Status:",
      error?.response?.status
    );

    console.error(
      "Message:",
      error?.response?.data?.error
        ?.message
    );

    console.error(
      "URL:",
      error?.config?.url
    );

    
    assignment.status =
      "failed";

    await assignment.save();

    throw error;
  }
}