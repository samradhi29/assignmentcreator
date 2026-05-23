import { create } from "zustand";

interface QuestionRow {
  id: number;
  type: string;
  questions: number;
  marks: number;
}

interface AssignmentState {
  dueDate: string;
  additional: string;
  rows: QuestionRow[];

  setDueDate: (date: string) => void;
  setAdditional: (text: string) => void;
  setRows: (rows: QuestionRow[]) => void;
}

export const useAssignmentStore = create<AssignmentState>((set) => ({
  dueDate: "",
  additional: "",
  rows: [],

  setDueDate: (date) => set({ dueDate: date }),

  setAdditional: (text) => set({ additional: text }),

  setRows: (rows) => set({ rows }),
}));