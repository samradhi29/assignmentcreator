import Sidebar from "./sidebar/page";
import Navbar from "./navbar/page";
import Assignments from "./assignments/page";
import MobileBottomNav from "./mobilebottomnav/page";
import CreateAssignment from "./createassigment/page";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#ECEEF2] p-3 flex gap-3">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-3">

        <Navbar />


      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
}