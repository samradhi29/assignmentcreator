import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  marks: { type: Number, required: true },
});

const SectionSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  questions: [QuestionSchema],
});

const AnswerKeyItemSchema = new mongoose.Schema({
  qNum: { type: Number, required: true },
  sectionTitle: { type: String, default: "" },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  keyPoints: { type: [String], default: [] },
});

const AssignmentSchema = new mongoose.Schema(
  {
    dueDate: { type: String, required: true },
    additional: { type: String, default: "" },

    rows: [
      {
        topic: { type: String, required: true },
        questions: { type: Number, required: true, min: 1 },
        marks: { type: Number, required: true, min: 1 },
      },
    ],

    fileUrl: { type: String, default: "" },
    extractedText: { type: String, default: "" },

    generatedPaper: {
      type: {
        sections: [SectionSchema],
        answerKey: [AnswerKeyItemSchema],
      },
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    jobId: { type: String, default: "", index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", AssignmentSchema);