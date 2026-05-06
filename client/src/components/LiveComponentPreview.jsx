import React, { useCallback, useEffect, useRef, useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import {  motion } from "motion/react";
import { FiRefreshCw } from "react-icons/fi";



export const LiveComponentPreview = ({code}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);
  };

  let sanitized = code
    .replace(/import\s+.*?from\s+["'].*?["'];?/g, "")
    .replace(/export\s+/g, "");

  sanitized = sanitized
    .replace(/position\s*:\s*["']fixed["']/g, 'position:"absolute"')
    .replace(/position\s*:s*`fixed`/g, 'position:"absolute"')
    .replace(/\bfixed\b/g, "absolute");

  const match = sanitized.match(/const\s+([A-Z]\w+)/);
  const componentName = match ? match[1] : null;
  const wrappedCode = componentName
    ? `${sanitized}\n\nrender(<${componentName} />)`
    : sanitized;

    
  return (
    <div
    className="relative w-full max-w-full">
      <motion.div
        onClick={refreshPreview}
        whileTap={{ scale: 0.9, rotate: 90 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="absolute right-2 top-2 bg-[#1e293b] border-none text-[#94a3b8] p-1.5 border-[8px] cursor-pointer z-10">
        <FiRefreshCw size={16} />
      </motion.div>

      <LiveProvider
        key={refreshKey}
        code={wrappedCode}
        scope={{ React, useState, useEffect, useRef, useCallback }}
        noInline
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full min-h-[300px] max-w-full border border-[#1e293b] rounded-xl bg-[#020617] relative overflow-hidden"
          style={{ padding: "clamp(10px, 2vw, 20px)"}}
        >
          <motion.div className="w-full h-full relative overflow-auto">
            <LivePreview />
          </motion.div>
        </motion.div>

          <LiveError 
          style={{fontSize:"clamp(12px, 1.5vw, 14px)"}}
          className="mt-2.5 p-2.5 bg-[#450a0a] text-[#f87171] border-[6px]  overflow-auto " />

          {!componentName && (
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            className="mt-2.5 p-2.5 bg-[#1e293b] border-[6px] text-[#94a3b8]"
            style={{fontSize:"clam(12px, 1.5vw, 14px)"}}
            >
              Preview is not available. Copy the code and paste it into your project.
            </motion.div>
          )}
        
      </LiveProvider>
    </div>
  );
};
