import React from 'react'
import { motion } from "motion/react";
import { useSelector } from 'react-redux';
import { HiSparkles } from 'react-icons/hi';
import { TbComponents } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';


const steps =[
  {n:"01" , title:"Install Library" , text:"npm install ganesh-ui-library to access all prebuild UI components."},
  {n:"02" , title:"Use Components" , text:"Import and customize with props for any design requirement."},
  {n:"03" , title:"Generate with AI" , text:"Describe your UI and AI build the component for you"},
  {n:"04" , title:"Copy & Use" , text:"Paste the clean JSX code straight into your project."},
]


const Steps = ({setShowAuth}) => {
  const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();


  return (
    <>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3 ">
            Simple process
          </p>

          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Syne','sans-serif'" }}
          >
            How it works
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#3be8ff]/20 to-transparent" />

          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="relative text-center group"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-[#0e2528] to-[#071518] border border-[#3be8ff]/20 flex flex-col items-center justify-center group-hover:[#3be88ff]/40 group-hover:shadow-[0_0_20px_rgba(59,232,255,0.1)] transition-all duration-300 ">
                <span className="text-[9px] text-[#3be8ff]/60 font-bold tracking-widest ">
                  {item.n}
                </span>
              </div>
              <h3 className="font-semibold text-white/90 mb-2 text-[13px] sm:text-[14px]">
                {item.text}
              </h3>
              <p className="text-[11px] sm:text-xs text-white/40">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl border border-[#3be8ff]/15 bg-gradient-to-r from-[#0715198] to-[#040f12] p-8 sm:p-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,232,255,0.08)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3 sm:mb-4">
              Start building
            </p>
            <h3
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Ready to generate <br />
              your new component?
            </h3>

            {userData ? (
              <>
                <p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed">
                  Welcome back,{" "}
                  <span className="text-[#3be8ff]/70">{userData.name}</span>!
                  Continue building amazing components
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <motion.button
                    onClick={() => navigate("/generate")}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0,0.45)] transition-shadow "
                  >
                    <HiSparkles size={15} /> Generate AI Component
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2  px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/60 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent "
                  >
                    <TbComponents size={16} className="text-[#3be8ff]/70" /> My
                    Component
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed">
                  Sign in with Google, get 150 free AI Credits, and start
                  generating production-ready UI components instantly
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <motion.button
                    onClick={() => setShowAuth(true)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0,0.45)] transition-shadow "
                  >
                    <HiSparkles size={15} /> Get Started Free
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2  px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/60 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent "
                  >
                    <TbComponents size={16} className="text-[#3be8ff]/70" />
                    Component
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Steps