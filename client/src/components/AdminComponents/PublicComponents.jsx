import React, { useState } from "react";
import {  motion } from "motion/react";
import { TbBoxOff, TbCode, TbSearch, TbWorld } from "react-icons/tb";



const PublicComponents = ({ publicComponents }) => {
  const [componentSearch, setComponentSearch] = useState("");

 

  const filteredPublicComponents = componentSearch.trim()
    ? publicComponents.filter(
        (c) =>
          c.name?.toLowerCase().includes(componentSearch.toLowerCase()) ||
          c.props?.some((p) =>
            String(p).toLowerCase().includes(componentSearch.toLowerCase()),
          ),
      )
    : publicComponents;

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(59,232,255,0.1)",
              border: "1px solid rgba(59,232,255,0.2)",
            }}
          >
            <TbWorld size={14} style={{ color: "#3be8ff" }} />
          </div>
          <div>
            <p className="font-semibold text-sm">Public Components</p>
            <p className="text-white/35 text-[11px]">
              {publicComponents.length} components visible to all users
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-48">
          <TbSearch
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
          <input
            value={componentSearch}
            onChange={(e) => setComponentSearch(e.target.value)}
            placeholder="Search components..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-[#3be8ff]/40 transition-colors"
          />
        </div>
      </div>

      {/* List */}
      {filteredPublicComponents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 gap-3 text-white/20">
          <TbBoxOff size={32} />
          <p className="text-sm">
            {componentSearch
              ? "No components match your search"
              : "No public components yet"}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.04]">
          {filteredPublicComponents.map((comp, i) => (
            <motion.div
              key={comp._id || i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
            >
              {/* Left: icon + name + props */}
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0"
                  style={{
                    background: "rgba(167,139,250,0.1)",
                    border: "1px solid rgba(167,139,250,0.2)",
                  }}
                >
                  <TbCode size={14} style={{ color: "#a78bfa" }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {comp.name}
                  </p>
                  {/* Props tags */}
                  {comp.props?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {comp.props.slice(0, 4).map((p, idx) => (
                        <span
                          key={`${p}-${idx}`}
                          className="px-1.5 py-0.5 rounded-md text-[10px] font-medium"
                          style={{
                            background: "rgba(167,139,250,0.1)",
                            color: "rgba(167,139,250,0.7)",
                          }}
                        >
                          {p}
                        </span>
                      ))}
                      {comp.props.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] text-white/25">
                          +{comp.props.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: date + badge */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                {comp.createdAt || comp.created_at ? (
                  <span className="text-[11px] text-white/25 whitespace-nowrap">
                    {new Date(
                      comp.createdAt || comp.created_at,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                ) : null}
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: "rgba(59,232,255,0.08)",
                    color: "#3be8ff",
                    border: "1px solid rgba(59,232,255,0.2)",
                  }}
                >
                  <TbWorld size={9} /> public
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default PublicComponents;
