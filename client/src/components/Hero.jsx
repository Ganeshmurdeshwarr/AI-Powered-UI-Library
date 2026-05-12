import React, { useState } from "react";
import { motion } from "motion/react";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import {
  TbArrowRight,
  TbCopy,
  TbCheck,
} from "react-icons/tb";
import { useSelector } from "react-redux";

const Hero = ({ setShowAuth }) => {
  const [copied, setCopied] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install ganesh-ui-library");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleGenerateClick = () => {
    if (userData) {
      navigate("/generate");
    } else {
      setShowAuth(true);
    }
  };

  return (
    <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 sm:pb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.6 }}
        className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase text-[#3be8ff]/70 border border-[#3be8ff]/20 bg-[#3be8ff]/5 rounded-full px-4 py-1.5 mb-6 sm:mb-7 "
      >
        <span className="w-1 h-1.5 rounded-full bg-[#3be8ff]/5 animate-pulse" />
        AI-Powered React ui library
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5 sm:mb-6"
        style={{ fontFamily: "'Syne','sans-serif'" }}
      >
        Build React UI <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4] ">
          Faster with AI
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb:8 sm:mb-10 font-light px-2"
      >
        Use prebuild React UI components or generate custom ones with AI.  Copy
        clean JSX directly into your project in seconds
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex justify-center mb-7 sm:mb-8 px-2"
      >
        <div className="flex items-center gap-2 sm:gap-3 bg-white/4 border border-white/10 rounded-xl px-4 sm:px-5 py-3 text-xs sm:text-sm font-mono w-full max-w-xs sm:mx-w-fit">
          <span className="text-[#3be8ff]/60">$</span>
          <span className="text-white/80 truncate">
            npm install ganesh-ui-library
          </span>
          <button
            onClick={handleCopy}
            className="ml-1 text-white/30 hover:text-[#3be8ff] transition-colors cursor-pointer bg-transparent border-none shrink-0"
          >
            {copied ? (
              <TbCheck size={15} className="text-#3be8ff]" />
            ) : (
              <TbCopy size={15} />
            )}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.33, duration: 0.6 }}
        className="flex-col flex sm:flex-row justify-center gap-3 px-4 sm:px-0"
      >
        <motion.button
          onClick={() => {
            `${userData ? navigate("/component") : setShowAuth(true)}`;
          }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 font-semibold text-sm px-6 sm:px-7 py-3.5 bg-white text-[#030b0d] rounded-xl cursor-pointer border-none shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.18)] transition-shadow w-full sm:w-auto "
        >
          Get Started <TbArrowRight size={15} />
        </motion.button>
        <motion.button
          onClick={handleGenerateClick}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 font-semibold text-sm px-6 sm:px-7 py-3.5 border-white/15 border hover:border-white/25 rounded-xl  text-white/70 cursor-pointer hover:text-white transition-all w-full sm:w-auto bg-transparent "
        >
          <HiSparkles size={15} /> Generate AI Components
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.7 }}
        className="mt-12 sm:mt-16 mx-auto mx-w-2xl bg-[#0a1a1e]/80 border border-white/7 rounded-2xl p-4 sm:p-5 text-left shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm overflow-x-auto "
      >
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-12 text-white/20 font-mono">App.jsx</span>
        </div>

        <div className="font-mono text-[11px] sm:text-[12.5px] leading-6 space-y-0.5 min-w-[280px]">
          <p>
            <span className="text-[#3be8ff]/60">import</span>{" "}
            <span className="text-white/60">{"{ Button, Card}"}</span>{" "}
            <span className="text-[#3be8ff]/60">From</span>{" "}
            <span className="text-[#aaff80]/60">ganesh-ui-library</span>
            <span className="text-white/30">;</span>
          </p>
          <p> </p>
          <p>
            <span className="text-[#3be8ff]/60">export default function</span>{" "}
            <span className="text-[#ffd589]/60">App</span>
            <span className="text-white/50">() {"{"}</span>
          </p>
          <p>
            <span className="text-white/30">{" return ("}</span>
          </p>
          <p>
            <span className="text-white/30">{"   <"}</span>
            <span className="text-[#3be8ff]/30">Card</span>{" "}
            <span className="text-[#aaff80]/60">title</span>
            <span className="text-white/30">{"="}</span>
            <span className="text-[#aaff80]/70">{'"Dashboard"'}</span>
            <span className="text-white/30">{">"}</span>
            <span className="text-white/30">;</span>
          </p>
          <p>
            <span className="text-white/30">{"   <"}</span>
            <span className="text-[#3be8ff]/30">Button</span>{" "}
            <span className="text-[#aaff80]/60">text</span>
            <span className="text-white/30">{"="}</span>
            <span className="text-[#aaff80]/70">{'"hello"'}</span>
            <span className="text-white/30">{"/>"}</span>
            <span className="text-white/30">;</span>
          </p>
          <p>
            <span className="text-white/30">{" </"}</span>
            <span className="text-[#3be8ff]/30">Card</span>
            <span className="text-white/30">{">"}</span>
          </p>
          <p>
            <span className="text-white/30">{"  );"}</span>
          </p>
          <p>
            <span className="text-white/50">{"}"}</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
