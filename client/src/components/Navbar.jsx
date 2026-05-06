import React from 'react' 
import { SiValorant } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from "motion/react";
import { TbComponents, TbLogout, TbMenu2, TbX } from 'react-icons/tb';
import { HiSparkles } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


const Navbar = ({
  setShowAuth,
  setMenuOpen,
  menuOpen,
  getName,
  setProfileOpen,
  profileOpen,
  handleLogout,
}) => {

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px10 py-4 border border-white/[0.05] bg-[#030b0d]/85 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] ">
          <SiValorant size={15} color="#051c20" />
        </div>
        <span
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: "'Syne','sans-serif'" }}
        >
          VirtualUI
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/50">
        <button
          onClick={() =>{`${userData ? navigate("/component") : setShowAuth(true)}`}}
          className="duration-200 px-6 py-2.5 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent w-full "
        >
          Components
        </button>

        {userData ? (
          <div className="relative">
            <motion.button
              onClick={() => setProfileOpen(!profileOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 bg-white/[0.06] border border-white/10 hover:border-[#3be8ff]/30 px-3 py-1 rounded-xl transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#3be8ff] to[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold ">
                {getName(userData.name)}
              </div>
              <span className="text-white/80 text-sm font-medium max-w-[100px] truncate ">
                {userData.name}
              </span>
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-12 w-52 bg-gray-900 border border-white/[0.09] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 "
                >
                  <div className="px-4 py-3.5 border-b border-white/[0.07]">
                    <p className="text-white/90 font-semibold text-sm truncate">
                      {userData.name}
                    </p>
                    <p className="text-white/40 text-xs truncate mt-0.5">
                      {userData.email}
                    </p>
                  </div>
                  <div className="py-1.5">
                    <button
                      onClick={() => {(setProfileOpen(false), navigate("/my-components"));}}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/4 transition-colors cursor-pointer bg-transparent border-none text-left"
                    >
                      <TbComponents size={16} className="text-[#3be8ff]/70" />{" "}
                      My-components
                    </button>
                  </div>
                  <div className="border-t border-white/07 py-1.5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/6 transition-colors cursor-pointer bg-transparent border-none text-left"
                    >
                      <TbLogout size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAuth(true)}
            className="flex items-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none shadow-[0_0_20px_rgba(59,232,255,0.25)] hover:shadow-[0_0_30px_rgba(59,232,255,0.4)] transition-shadow text-nowrap "
          >
            <HiSparkles size={14} /> Generate AI Components
          </motion.div>
        )}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
      >
        {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
      </button>
    </nav>
  );
};

export default Navbar