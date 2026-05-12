import React from 'react'
import { SiValorant } from 'react-icons/si';
import { TbChevronLeft, TbLayoutDashboard, TbLogout, TbPackage } from 'react-icons/tb';
import { setUserData } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../../App';

const SidebarContent = ({ setSidebarOpen, setActiveView, activeView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const navItems = [
    { id: "dashboard", label: "Dashboard", Icon: TbLayoutDashboard },
    { id: "add", label: "Add Component", Icon: TbPackage },
  ];

  // Close sidebar on route/view change
  const handleNavClick = (id) => {
    setActiveView(id);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] flex-shrink-0">
          <SiValorant size={15} color="#051c20" />
        </div>
        <div>
          <span className="text-base font-bold block">ReactAI</span>
          <span className="text-[10px] text-[#3be8ff]/60 font-semibold tracking-[2px] uppercase">
            Admin
          </span>
        </div>
        {/* Close button – mobile only */}
        <button
          onClick={() => setSidebarOpen?.(false)}
          className="ml-auto md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors"
        >
          <TbChevronLeft size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all bg-transparent border-none cursor-pointer text-left"
              style={{
                background: isActive ? "rgba(59,232,255,0.08)" : "transparent",
                color: isActive ? "#3be8ff" : "rgba(255,255,255,0.45)",
                borderLeft: isActive
                  ? "2px solid #3be8ff"
                  : "2px solid transparent",
              }}
            >
              <Icon size={16} style={{ opacity: isActive ? 1 : 0.7 }} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/[0.05]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all cursor-pointer bg-transparent border-none text-left"
        >
          <TbLogout size={16} /> Logout
        </button>
      </div>
    </>
  );
};

export default SidebarContent