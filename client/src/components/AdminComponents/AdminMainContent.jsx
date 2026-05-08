import React from 'react'
import { AnimatePresence, motion } from "motion/react";
import {  TbCode, TbMenu2, TbPlus,TbUsers } from 'react-icons/tb';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "./CustomTooltip";
import PublicComponents from "./PublicComponents";
import AddComponentForm from "./AddComponentForm";

const AdminMainContent = ({ setSidebarOpen, activeView }) => {
  const { userData, allComponents ,  allUsers } = useSelector((s) => s.user);

    const navigate = useNavigate();


     const publicComponents =
       allComponents?.filter((c) => c.visibility === "public") || [];



     const stats = [
       {
         label: "Total Users",
         value: allUsers?.length || 0,
         icon: TbUsers,
         color: "#3be8ff",
       },
       {
         label: "Components Made",
         value: publicComponents?.length || 0,
         icon: TbCode,
         color: "#a78bfa",
       },
     ];


    //  DATA FOR CHART
      const chartData = (() => {
        if (!publicComponents.length) return [];
        const map = {};
        publicComponents.forEach((c) => {
          const raw = c.createdAt || c.created_at;
          if (!raw) return;
          const label = new Date(raw).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          map[label] = (map[label] || 0) + 1;
        });
        return Object.entries(map)
          .map(([date, count]) => ({ date, components: count }))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(-12);
      })();


 


  return (
    <main className="flex-1 md:ml-60 min-h-screen overflow-y-auto">
      {/* Topbar */}
      <div className="sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#030b0d]/90 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between gap-2">
        {/* Left: Hamburger (mobile) + Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger – mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-all shrink-0"
          >
            <TbMenu2 size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold truncate">
              {activeView === "dashboard" ? "Dashboard" : "Add Component"}
            </h1>
            <p className="text-white/35 text-xs truncate">
              Welcome back, {userData?.name?.split(" ")[0] || "Admin"} 👋
            </p>
          </div>
        </div>

        {/* Right: Generate button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => navigate("/generate")}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#030b0d] bg-gradient-to-r from-[#3be8ff] to-[#0ab5d4] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(59,232,255,0.2)] cursor-pointer border-none shrink-0"
        >
          <TbPlus size={14} />
          <span className="hidden xs:inline">Generate</span>
          <span className="hidden sm:inline">AI Component</span>
        </motion.button>
      </div>

      {/* ── VIEW: DASHBOARD ── */}
      <AnimatePresence mode="wait">
        {activeView === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map(({ label, value, icon: Icon, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] transition-all"
                >
                  <div className="mb-2.5 sm:mb-3">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${color}15`,
                        border: `1px solid ${color}25`,
                      }}
                    >
                      <Icon size={15} style={{ color }} />
                    </div>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold">
                    {value.toLocaleString()}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{label}</p>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-4 sm:p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
            >
              <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-5 gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">
                    Public Components Published
                  </p>
                  <p className="text-white/35 text-xs mt-0.5">
                    Date-wise breakdown
                  </p>
                </div>
                <span className="text-[10px] font-semibold px-2 sm:px-2.5 py-1 rounded-full bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20 flex-shrink-0">
                  Last 12 days
                </span>
              </div>

              {chartData.length === 0 ? (
                <div className="h-[180px] sm:h-[220px] flex items-center justify-center text-white/20 text-sm">
                  No public components yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 5, right: 5, bottom: 0, left: -25 }}
                  >
                    <defs>
                      <linearGradient
                        id="componentGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#a78bfa"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="#a78bfa"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.04)"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      width={30}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ stroke: "rgba(255,255,255,0.06)" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="components"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      fill="url(#componentGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#a78bfa", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </motion.div>

            {/* ── Public Components List ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
            >
              <PublicComponents publicComponents={publicComponents} />

             
            </motion.div>
          </motion.div>
        )}

        {/* ── VIEW: ADD COMPONENT ── */}
        {activeView === "add" && (
          <motion.div
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <AddComponentForm  />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AdminMainContent