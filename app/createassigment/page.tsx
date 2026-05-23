"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  X,
  Plus,
  Minus,
  Upload,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Sidebar from "../sidebar/page";
import Navbar from "../navbar/page";

interface QuestionRow {
  id: number;
  type: string;
  questions: number;
  marks: number;
}

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Diagram/Graph-Based Questions",
  "Numerical Problems",
  "Essay Questions",
  "True/False Questions",
  "Fill in the Blanks",
];

/* ---------------- STEPPR (PURE UI ONLY) ---------------- */
function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 w-full max-w-[110px]">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-50"
      >
        <Minus size={12} className="text-gray-500" />
      </button>

      <span className="text-sm font-medium text-gray-800">{value}</span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-50"
      >
        <Plus size={12} className="text-gray-500" />
      </button>
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */
let nextId = 5;

export default function CreateAssignment() {
  const router = useRouter();

  const [rows, setRows] = useState<QuestionRow[]>([
    { id: 1, type: "Multiple Choice Questions", questions: 4, marks: 1 },
    { id: 2, type: "Short Questions", questions: 3, marks: 2 },
  ]);

  const [dueDate, setDueDate] = useState("");
  const [additional, setAdditional] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const totalQuestions = rows.reduce((a, r) => a + r.questions, 0);
  const totalMarks = rows.reduce((a, r) => a + r.questions * r.marks, 0);

  function updateRow(
    id: number,
    field: keyof QuestionRow,
    value: number | string
  ) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function removeRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      {
        id: nextId++,
        type: QUESTION_TYPES[0],
        questions: 3,
        marks: 2,
      },
    ]);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      formData.append("dueDate", dueDate);
      formData.append("additional", additional);
      formData.append("rows", JSON.stringify(rows));

      const response = await fetch("/api/assigment/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) return;

      const data = await response.json();

      if (!data.assignmentId) return;

      router.push(`/assignment/${data.assignmentId}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <Navbar />

      <div className="flex min-h-screen bg-[#f0f0ec] pt-16">
        {/* SIDEBAR (DESKTOP ONLY) */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-4 py-6 lg:px-8">
          <div className="w-full max-w-4xl mx-auto rounded-[24px] p-6 bg-white">

            {/* FILE UPLOAD */}
            <label className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl bg-white py-8 px-4 cursor-pointer">
              <Upload size={28} className="text-gray-300" />
              <span className="text-sm font-medium text-gray-600">
                Choose file
              </span>

              <div className="mt-2 px-4 py-1.5 border rounded-lg text-xs">
                {fileName ?? "Browse Files"}
              </div>

              <input
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setFileName(file.name);
                  }
                }}
              />
            </label>

            {/* DUE DATE */}
            <div className="mt-6">
              <label className="text-sm font-medium">Due Date</label>

              <div className="relative mt-2">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3"
                />
                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* ROWS */}
            <div className="mt-6 flex flex-col gap-4">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_140px_120px] gap-4"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>

                    <select
                      value={row.type}
                      onChange={(e) =>
                        updateRow(row.id, "type", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-3 py-3"
                    >
                      {QUESTION_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <Stepper
                    value={row.questions}
                    onChange={(n) =>
                      updateRow(row.id, "questions", n)
                    }
                  />

                  <Stepper
                    value={row.marks}
                    onChange={(n) =>
                      updateRow(row.id, "marks", n)
                    }
                  />
                </div>
              ))}

              <button onClick={addRow} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                  <Plus size={14} />
                </div>
                <span>Add Question Type</span>
              </button>
            </div>

            {/* ADDITIONAL */}
            <div className="mt-6">
              <textarea
                value={additional}
                onChange={(e) => setAdditional(e.target.value)}
                placeholder="Additional Information..."
                className="w-full border border-gray-200 rounded-xl p-4 h-24"
              />
            </div>

            {/* TOTAL */}
            <div className="mt-4 text-right text-sm text-gray-600">
              Total Questions: {totalQuestions} | Total Marks: {totalMarks}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between mt-8">
              <button className="px-6 py-3 border rounded-full flex items-center gap-2">
                <ArrowLeft size={14} />
                Previous
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 rounded-full bg-black text-white flex items-center gap-2"
              >
                {loading ? "Uploading..." : "Generate Assignment"}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}