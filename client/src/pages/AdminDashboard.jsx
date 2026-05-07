import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import SidebarContent from "../components/AdminComponents/SidebarContent";
import AdminMainContent from "../components/AdminComponents/AdminMainContent";



export default function AdminDashboard() {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState("dashboard");


   
 
  // Close sidebar on outside click
  const sidebarRef = useRef(null);
  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);



  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @media (max-width: 480px) { .xs\\:inline { display: inline; } }
      `}</style>

      {/* ── DESKTOP SIDEBAR (md+) ── */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/[0.06] fixed top-0 left-0 z-20">
        <SidebarContent
          setSidebarOpen={setSidebarOpen}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </aside>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen bg-[#040e11] border-r border-white/[0.06] md:hidden"
            >
              <SidebarContent
                setSidebarOpen={setSidebarOpen}
                activeView={activeView}
                setActiveView={setActiveView}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ── */}
      <AdminMainContent
        activeView={activeView}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
