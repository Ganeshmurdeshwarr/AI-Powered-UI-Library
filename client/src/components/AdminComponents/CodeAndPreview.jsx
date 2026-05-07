import React from 'react'
import { LiveComponentPreview } from "../LiveComponentPreview";
import { AnimatePresence, motion } from "motion/react";
import { TbCodeDots, TbEye } from 'react-icons/tb';

const CodeAndPreview = ({ codeTab, setCodeTab , code ,setCode }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-3 border-b border-white/[0.06]">
        <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
          Component Code
        </label>
        <div
          className="flex gap-1 rounded-xl p-1"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          {["code", "preview"].map((tab) => (
            <button
              key={tab}
              onClick={() => setCodeTab(tab)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize border-none cursor-pointer"
              style={{
                background:
                  codeTab === tab ? "rgba(59,232,255,0.2)" : "transparent",
                color: codeTab === tab ? "#3be8ff" : "rgba(255,255,255,0.4)",
              }}
            >
              {tab === "code" ? <TbCodeDots size={12} /> : <TbEye size={12} />}
              <span className="hidden xs:inline">{tab}</span>
            </button>
          ))}
        </div>
        </div>
        <AnimatePresence mode="wait">
          {codeTab === "code" ? (
            <motion.div
              key="code-editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                spellCheck={false}
                placeholder={`export default function MyComponent({ title }) {\n  return (\n    <div>\n      <h1>{title}</h1>\n    </div>\n  );\n}`}
                className="w-full bg-[#0d1117] px-4 sm:px-5 py-4 text-xs leading-relaxed text-green-300 font-mono resize-none outline-none placeholder-white/10"
                style={{ minHeight: 220 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="code-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-3.5 sm:p-4"
            >
              {code.trim() ? (
                <LiveComponentPreview code={code} />
              ) : (
                <div
                  className="h-36 sm:h-40 flex items-center justify-center text-white/20 text-sm rounded-xl"
                  style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
                >
                  Paste some code first to see the preview
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    
  );
};

export default CodeAndPreview


