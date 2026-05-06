import React from 'react'
import { HiSparkles } from "react-icons/hi";
import {  motion } from "motion/react";
import {
  TbArrowRight,
  TbBrandNpm,
  TbCode,
  TbLayout,
  TbAdjustments,
  TbPlayerPlay,
  TbCopy,
  TbCheck,
  TbMenu2,
  TbX,
  TbLogout,
  TbComponents,
} from "react-icons/tb";


const features =[
  {icon:TbLayout , title:"Prebuild UI Components" , text:"Install VirtualUI and use ready-made, production-garde components instantly."},
  {icon:HiSparkles , title:"AI Component Generator" , text:"Describe your UI in plain English and generate React component in seconds."},
  {icon:TbAdjustments , title:"Customizable Props" , text:"Modify components props and preview change in real-time rebuilding."},
  {icon:TbCode , title:"Clean JSX Code" , text:"Copy production-ready JSX directly into your project - zero boilerplate."},
  {icon:TbBrandNpm , title:"NPM Library" , text:"Import Virtual UI components with simple nmp install command."},
  {icon:TbPlayerPlay , title:"Live Preview" , text:"Instantly preview AI-Generated components before exporting your code."}
]

const Features = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-10 sm:mb-14"
      >
        <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/60 mb-3 ">
          What's inside
        </p>

        <h2
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: "'Syne','sans-serif'" }}
        >
          Everything you need
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{delay:i * 0.07 ,  duration: 0.55 }}
            key={i}
            className="group p-5 sm:p-6 rounded-2xl border border-white/7 bg-white/2 hover:bg-[#3be8ff]/20 hover:border-[#3be8ff]/20 transition-all duration-300"
          >

<div className="w-10 h-10 rounded-xl bg-[#3be8ff]/8 border border-[#3be8ff]/15 flex items-center justify-center mb-4 group-hover:bg-[#3be8ff]/15 transition-colors"><item.icon size={18} className='text-[#3b38ff]'/></div>
<h3 className='font-semibold text-white/90 mb-2 text-[15px]'>{item.title}</h3>
<p className="text-sm text-white/45 leading-relaxed">{item.text}</p>

          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Features