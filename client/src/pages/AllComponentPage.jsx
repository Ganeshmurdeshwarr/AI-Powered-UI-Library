import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbX } from "react-icons/tb";
import { useSelector } from "react-redux";
import Navbar from "../components/AllComponents/Navbar";
import SidebarContent from "../components/AllComponents/SidebarContent";
import DetailPanel from "../components/AllComponents/DetailPanel";
import GuidePanel from "../components/AllComponents/GuidePanel";




 function AllComponentsPage() {

  const { allComponents } = useSelector((s) => s.user);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const publicComponents = (allComponents || [])
    .filter((c) => c.visibility === "public")
    .filter((c) => c.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name?.localeCompare(b.name));

  const handleSelect = (c) => {
    setSelected(c);
    setDrawerOpen(false); // close drawer on mobile after selecting
  };

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white flex flex-col overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* ── NAVBAR ── */}
      <Navbar setDrawerOpen={setDrawerOpen} />

      {/* ── BODY ── */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{ height: "calc(100vh - 57px)" }}
      >
        {/* ── DESKTOP SIDEBAR (hidden on mobile) ── */}
        <aside className="hidden sm:flex w-52 md:w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#040e11] overflow-hidden">
          <SidebarContent
            publicComponents={publicComponents}
            selected={selected}
            onSelect={handleSelect}
            search={search}
            setSearch={setSearch}
          />
        </aside>

        {/* ── MOBILE DRAWER OVERLAY ── */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setDrawerOpen(false)}
                className="sm:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />

              {/* Drawer panel */}
              <motion.div
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="sm:hidden fixed top-0 left-0 z-50 h-full w-72 flex flex-col bg-[#040e11] border-r border-white/[0.08]"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-white/40 tracking-widest uppercase">
                    Components
                  </span>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <TbX size={14} />
                  </button>
                </div>

                <SidebarContent
                  publicComponents={publicComponents}
                  selected={selected}
                  onSelect={handleSelect}
                  search={search}
                  setSearch={setSearch}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-auto bg-[#030b0d] min-w-0">
          {selected ? (
            <DetailPanel
              component={selected}
              onBack={() => setSelected(null)}
            />
          ) : (
            <GuidePanel />
          )}
        </main>
      </div>
    </div>
  );
}

export default AllComponentsPage
