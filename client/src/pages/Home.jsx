import React, {  useState } from "react";
import Auth from "../components/Auth";
import Feature from "../components/Features";
import { AnimatePresence, motion } from "motion/react";
import { HiSparkles } from "react-icons/hi";
import {TbLogout,TbComponents} from "react-icons/tb";
import Hero from "../components/Hero";
import Steps from "../components/Steps";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { serverUrl } from "../App";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()


   const getName = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .slice(0, 1)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

   const handleLogout = async () => {
      try {
        await axios.get(serverUrl + "/api/auth/logout", {
          withCredentials: true,
        });
        dispatch(setUserData(null));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
      setProfileOpen(false);
    };
  

  return (
    <div
      className="min-h-screen bg-[#030b0d] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans','sans-serif'" }}
    >
      <div className="fixed inset-0 bg-[radial-gradient(circle,rgba(59,232,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-64 bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)] pointer-events-none "></div>

      <Navbar
        setShowAuth={setShowAuth}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
        getName={getName}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        handleLogout={handleLogout}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden sticky top-[65px] z-30 bg-[#030b0d]/95 backdrop:-blur-md border-b border-white/5 px-4 py-4 flex flex-col gap-3"
          >
            <button className="duration-200 px-6 py-2.5 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent w-full">
              Components
            </button>

            {userData ? (
              <>
                <div className="flex items-center gap-2.5 py-2 border-t border-white/7">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold">
                    {getName(userData.name)}
                  </div>
                  <span className="text-white/80 text-sm font-medium">
                    {userData.name}
                  </span>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors py-1 bg-transparent border-none cursor-pointer text-left "
                >
                  <TbComponents size={15} className="text-[#3be8ff]/70" />{" "}
                  My-components
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-red-400/80 hover:text-red-400 transition-colors py-1 bg-transparent border-none cursor-pointer"
                >
                  <TbLogout size={15} /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border-none mt-1"
              >
                <HiSparkles size={14} /> Generate AI Components
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* hero section */}

      <Hero setShowAuth={setShowAuth} />
      <Feature />
      <Steps setShowAuth={setShowAuth} />
      <Footer />

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Home;
