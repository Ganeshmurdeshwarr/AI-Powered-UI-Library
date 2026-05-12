import React from 'react'
import { SiValorant } from 'react-icons/si'

const Footer = () => {
  return (
    <footer className="border border-white/5 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] ">
            <SiValorant size={15} color="#051c20" />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "'Syne','sans-serif'" }}
          >
            ReactUI
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-xs text-white/30">
          <span className="hover:text-white/60 transition-colors">
            Components
          </span>
          <span className="hover:text-white/60 transition-colors">
            admin@reactui.com
          </span>
        </div>
        <p className="text-sm text-white/25 order-last sm:order-0">
        @ {new Date().getFullYear()} ReactUI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer