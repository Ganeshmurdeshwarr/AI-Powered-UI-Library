import React from 'react'
import { SiValorant } from 'react-icons/si';
import { TbLayoutSidebarLeftExpand, TbMenu2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const AllComponentNavbar = ({ setDrawerOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/[0.05] bg-[#030b0d]/90 backdrop-blur-md shrink-0">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 sm:gap-2.5 bg-transparent border-none cursor-pointer"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.35)]">
          <SiValorant size={13} color="#051c20" />
        </div>
        <span
          className="text-sm sm:text-base font-bold text-white"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          VirtualAI
        </span>
      </button>

      <div className="flex items-center gap-2">


        {/* Desktop label */}

        <div className="hidden sm:flex items-center gap-2 text-xs text-white/30">
          <TbLayoutSidebarLeftExpand size={14} />
          <span>Component Explorer</span>
        </div>

        {/* Mobile hamburger — opens sidebar drawer */}
        
        <button
          onClick={() => setDrawerOpen(true)}
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 transition-colors cursor-pointer"
        >
          <TbMenu2 size={16} />
        </button>
      </div>
    </nav>
  );
};

export default AllComponentNavbar