"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  FileText,
  MonitorPlay,
  BookOpen,
  Settings,
  Plus,
  ChevronRight,
  Sparkles,
} from "lucide-react";

type NavItemId =
  | "home"
  | "my-groups"
  | "assignments"
  | "ai-toolkit"
  | "my-library";

interface NavItem {
  id: NavItemId;
  label: string;
  icon: React.ElementType;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: LayoutGrid, href: "/" },
  { id: "my-groups", label: "My Groups", icon: Users, href: "/groups" },
  { id: "assignments", label: "Assignments", icon: FileText, href: "/assignments" },
  { id: "ai-toolkit", label: "AI Teacher's Toolkit", icon: MonitorPlay, href: "/ai-toolkit" },
  { id: "my-library", label: "My Library", icon: BookOpen, href: "/library" },
];

const VedaLogo = () => (
  <div
    className="flex items-center justify-center flex-shrink-0"
    style={{
      width: 38,
      height: 38,
      borderRadius: 10,
      background: "linear-gradient(135deg, #FF8C55 0%, #E8470A 100%)",
      boxShadow: "0 2px 10px rgba(255,107,53,0.40)",
    }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L17.5 6.5V13.5L10 18L2.5 13.5V6.5L10 2Z"
        fill="white"
        fillOpacity="0.55"
      />
      <path
        d="M10 5.5L15 8.5V13L10 16L5 13V8.5L10 5.5Z"
        fill="white"
        fillOpacity="0.80"
      />
      <path
        d="M10 9L12.5 10.5V13L10 14.5L7.5 13V10.5L10 9Z"
        fill="white"
      />
    </svg>
  </div>
);

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-[#ECEEF2] relative">
      <aside className="w-[304px] min-h-screen bg-white rounded-2xl p-6 flex flex-col justify-between shadow-[0px_16px_40px_rgba(0,0,0,0.08)]">

        {/* TOP SECTION */}
        <div className="flex flex-col gap-6">

          {/* LOGO */}
          <div className="flex items-center gap-2.5">
            <VedaLogo />
            <span className="text-[17.5px] font-bold text-[#0F172A] tracking-[-0.5px]">
              VedaAI
            </span>
          </div>

          {/* CREATE BUTTON */}
          <button
            onClick={() => router.push("/createassigment")}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-[11px] rounded-full bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.97] text-white text-[13.5px] font-semibold transition-all duration-150 select-none"
            style={{ boxShadow: "0 2px 8px rgba(15,23,42,0.18)" }}
          >
            <Sparkles size={13} strokeWidth={2.2} />
            <Plus size={13} strokeWidth={2.5} />
            Create Assignment
          </button>

          {/* NAV ITEMS */}
          <nav>
            <ul className="flex flex-col gap-[2px]">
              {NAV_ITEMS.map(({ id, label, icon: Icon, href }) => {
                const active = isActive(href);

                return (
                  <li key={id}>
                    <button
                      onClick={() => router.push(href)}
                      className={`w-full flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13.5px] font-medium transition-all duration-150 select-none group ${
                        active
                          ? "bg-[#F1F5F9] text-[#0F172A]"
                          : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155]"
                      }`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={active ? 2 : 1.75}
                        className={`flex-shrink-0 transition-colors ${
                          active
                            ? "text-[#0F172A]"
                            : "text-[#94A3B8] group-hover:text-[#64748B]"
                        }`}
                      />

                      <span className="flex-1 text-left">{label}</span>

                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col gap-2">

          {/* SETTINGS */}
          <button className="flex items-center gap-3 px-3 py-[10px] rounded-xl text-[13.5px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#334155] transition-all">
            <Settings size={17} strokeWidth={1.75} />
            Settings
          </button>

          <div className="h-px bg-[#F1F5F9] mx-1" />

          {/* PROFILE */}
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">

            <div
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FCD34D 0%, #F97316 100%)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
              >
                <path d="M3 21h18M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
              </svg>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-semibold text-[#0F172A] truncate">
                Delhi Public School
              </span>
              <span className="text-[11.5px] text-[#94A3B8] truncate">
                Bokaro Steel City
              </span>
            </div>

            <ChevronRight size={14} className="text-[#CBD5E1]" />
          </div>
        </div>
      </aside>
    </div>
  );
}