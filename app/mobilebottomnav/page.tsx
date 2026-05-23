"use client";

import {
  LayoutGrid,
  FileText,
  BookOpen,
  Sparkles,
  Plus,
} from "lucide-react";

export default function MobileBottomNav() {
  return (
    <>
    
      <button className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center z-50">
        <Plus className="text-orange-500" />
      </button>

    
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] h-16 bg-[#0F172A] rounded-2xl flex items-center justify-around shadow-2xl z-40">

        <button className="flex flex-col items-center text-[#64748B] text-[11px]">
          <LayoutGrid size={18} />
          Home
        </button>

        <button className="flex flex-col items-center text-white text-[11px]">
          <FileText size={18} />
          Assignments
        </button>

        <button className="flex flex-col items-center text-[#64748B] text-[11px]">
          <BookOpen size={18} />
          Library
        </button>

        <button className="flex flex-col items-center text-[#64748B] text-[11px]">
          <Sparkles size={18} />
          AI Toolkit
        </button>
      </div>
    </>
  );
}