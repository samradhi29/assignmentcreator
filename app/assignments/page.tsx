"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  MoreVertical,
  Home,
  Users,
  ClipboardList,
  Wrench,
  BookOpen,
  Settings,
  Search,
  SlidersHorizontal,
  Bell,
  ChevronDown,
  LayoutGrid,
  Eye,
  Trash2,
} from "lucide-react";



type Assignment = {
  _id: string;
  title?: string;
  dueDate: string;
  createdAt: string;
  additional?: string;
};


function Sidebar() {
  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "My Groups", href: "/groups" },
    { icon: ClipboardList, label: "Assignments", href: "/assignments", active: true, badge: 10 },
    { icon: Wrench, label: "AI Teacher's Toolkit", href: "/toolkit" },
    { icon: BookOpen, label: "My Library", href: "/library" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-[200px] min-w-[200px] h-screen bg-white border-r border-gray-100 px-3 py-5 fixed left-0 top-0 z-30">

      <div className="flex items-center gap-2 px-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#E8500A] flex items-center justify-center text-white font-bold text-sm">
          V
        </div>
        <span className="text-[15px] font-semibold text-[#0F172A]">VedaAI</span>
      </div>

      <button className="flex items-center gap-2 bg-[#0F172A] text-white text-[13px] font-medium rounded-full px-4 py-2.5 mb-5 hover:bg-[#1E293B] transition-colors">
        <Plus size={14} />
        Create Assignment
      </button>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] transition-colors ${
              item.active
                ? "bg-[#F1F3F8] text-[#0F172A] font-medium"
                : "text-gray-500 hover:bg-gray-50 hover:text-[#0F172A]"
            }`}
          >
            <item.icon size={16} />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-[#E8500A] text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 leading-none">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

    
      <div className="mt-auto flex flex-col gap-1">
        <a
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-gray-500 hover:bg-gray-50 hover:text-[#0F172A] transition-colors"
        >
          <Settings size={16} />
          Settings
        </a>
        <div className="flex items-center gap-2 bg-[#F8F8F8] rounded-xl px-3 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-[#E8500A] flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">
            DP
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[#0F172A] truncate">Delhi Public School</p>
            <p className="text-[11px] text-gray-400 truncate">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </aside>
  );
}


function Topbar() {
  return (
    <header className="fixed top-0 left-0 md:left-[200px] right-0 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-20">
      <div className="flex items-center gap-2 text-[14px] text-gray-400">
        <LayoutGrid size={15} />
        <span>Assignment</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Bell size={16} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#E8500A] rounded-full border border-white" />
        </button>
        <button className="flex items-center gap-2 text-[13px] font-medium text-[#0F172A]">
          <div className="w-7 h-7 rounded-full bg-[#E8500A] flex items-center justify-center text-white text-[10px] font-semibold">
            JD
          </div>
          <span className="hidden sm:block">John Doe</span>
          <ChevronDown size={13} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}



function MobileBottomNavbar() {
  const mobileNavItems = [
    { icon: Home, label: "Home" },
    { icon: ClipboardList, label: "Assignments", active: true },
    { icon: BookOpen, label: "Library" },
    { icon: Wrench, label: "AI Toolkit" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F172A] flex items-center justify-around z-40 border-t border-white/10">
      {mobileNavItems.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
            item.active ? "text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function AssignmentCard({
  assignment,
  onDelete,
}: {
  assignment: Assignment;
  onDelete: (id: string) => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (str: string) => {
    const d = new Date(str);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    return `${dd}-${mm}-${yy}`;
  };

  return (
    <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-4 h-[140px] flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <h3 className="text-[14px] font-semibold text-[#0F172A] leading-snug pr-2">
          {assignment.title ?? "assignment"}
        </h3>

        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
            aria-label="Options"
          >
            <MoreVertical size={16} />
          </button>

          {open && (
            <div className="absolute right-0 top-8 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-10">
              <button
                onClick={() => {
                  setOpen(false);
                  router.push(`/assignment/${assignment._id}`);
                }}
                className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 text-[13px] text-[#0F172A] hover:bg-gray-50 transition-colors"
              >
                <Eye size={14} className="text-gray-400" />
                View Assignment
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onDelete(assignment._id);
                }}
                className="w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 text-[13px] text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto text-[12px] text-gray-400 space-y-1">
        <p>
          <span className="font-medium text-gray-600">Assigned on : </span>
          {formatDate(assignment.createdAt)}
        </p>
        <p>
          <span className="font-medium text-gray-600">Due : </span>
          {assignment.dueDate}
        </p>
      </div>
    </div>
  );
}


export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/assigment");
      const data = await res.json();
      setAssignments(data);
    };
    fetchData();
  }, []);

  const filtered = assignments.filter((a) =>
    (a.title ?? "Quiz on Electricity").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a._id !== id));
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="min-h-screen bg-[#ECEEF2] md:pl-[200px] pt-14 pb-16 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6">

      
          <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-[#EEF2FF] to-[#E8F4FF] border border-[#C7D7F5] rounded-xl px-5 py-3.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            <div>
              <h2 className="text-[15px] font-semibold text-[#0F172A]">Assignments</h2>
              <p className="text-[12px] text-gray-400 mt-0.5">
                Manage and create assignments for your classes.
              </p>
            </div>
          </div>

     
          <div className="md:hidden flex items-center justify-between mb-4">
            <h1 className="text-[18px] font-semibold text-[#0F172A]">Assignments</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/50 shadow-sm mb-5">
            <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-2 text-[13px] text-gray-500 hover:border-gray-300 transition-colors w-fit">
              <SlidersHorizontal size={13} />
              Filter By
            </button>
            <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-2 flex-1 sm:max-w-[280px]">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Assignment"
                className="bg-transparent text-[13px] outline-none w-full text-[#0F172A] placeholder:text-gray-400"
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((a) => (
              <AssignmentCard key={a._id} assignment={a} onDelete={handleDelete} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16 text-gray-400 text-[14px]">
                No assignments found.
              </div>
            )}
          </div>
        </div>
      </div>


      <button className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-[#0F172A] text-white rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-[#1E293B] transition-colors">
        <Plus size={22} />
      </button>

      <MobileBottomNavbar />
    </>
  );
}