"use client";

import {
  ArrowLeft,
  LayoutGrid,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full h-[56px] bg-white rounded-2xl px-4 md:px-6 flex items-center justify-between shadow-[0px_8px_24px_rgba(0,0,0,0.08)]">

   
      <div className="flex items-center gap-3">

   
        <button className="md:hidden">
          <Menu size={20} />
        </button>

       
        <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-[#64748B] hover:bg-[#F1F5F9]">
          <ArrowLeft size={18} />
        </button>

        <div className="hidden md:block w-px h-4 bg-[#E2E8F0]" />

        <div className="hidden md:flex items-center gap-2">
          <LayoutGrid size={16} className="text-[#94A3B8]" />

          <span className="text-sm font-semibold text-[#0F172A]">
            Assignment
          </span>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500" />

          <span className="font-bold text-lg">VedaAI</span>
        </div>
      </div>

    
      <div className="flex items-center gap-2">

        <button className="relative flex items-center justify-center w-9 h-9 rounded-xl text-[#64748B] hover:bg-[#F1F5F9]">
          <Bell size={18} />

          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="hidden md:block w-px h-4 bg-[#E2E8F0]" />

        <button className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[#F1F5F9]">

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-orange-500" />

          <span className="hidden md:block text-[13.5px] font-semibold text-[#0F172A]">
            John Doe
          </span>

          <ChevronDown size={14} className="hidden md:block" />
        </button>
      </div>
    </header>
  );
}