import React from 'react'

const CustomTooltip = ({ active, payload, label }) => {
 if (!active || !payload?.length) return null;
 return (
   <div className="bg-[#0a1f24] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
     <p className="text-white/50 mb-1">{label}</p>
     <p className="text-[#a78bfa] font-bold">{payload?.[0].value} components</p>
   </div>
 );
}

export default CustomTooltip