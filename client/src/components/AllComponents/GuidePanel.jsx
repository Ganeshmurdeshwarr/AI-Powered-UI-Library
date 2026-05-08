import { TbPackage } from "react-icons/tb";
import { useSelector } from "react-redux";
import { motion } from "motion/react"
import CodeBlock from "./CodeBlock";

function GuidePanel() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 sm:px-8 text-center py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#3be8ff]/[0.07] border border-[#3be8ff]/15 flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <TbPackage size={24} className="text-[#3be8ff]/60" />
        </div>

        {userData ? (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-2 text-white/80">
              Select a component
            </h2>
            <p className="text-white/35 text-xs sm:text-sm mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed">
              Click any component from the sidebar to see its preview, code, and
              usage guide.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-base sm:text-lg font-bold mb-2 text-white/80">
              Sign in to explore components
            </h2>
            <p className="text-white/35 text-xs sm:text-sm mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed">
              Sign in first to browse prebuilt components, live previews, and
              usage guides.
            </p>
          </>
        )}

        <div className="w-full max-w-md mx-auto text-left space-y-4 mb-8">
          <p className="text-[10px] font-bold tracking-[3px] uppercase text-[#3be8ff]/50 mb-4">
            Quick Start Guide
          </p>

          <div>
            <p className="text-xs text-white/40 mb-2 flex items-center gap-1.5">
              <span className="text-[#3be8ff]/60 font-bold">01</span> Install
              the package
            </p>
            <CodeBlock code={`npm install virtual-ui-lib`} lang="bash" />
          </div>

          <div>
            <p className="text-xs text-white/40 mb-2 flex items-center gap-1.5">
              <span className="text-[#3be8ff]/60 font-bold">02</span> Import
              your component
            </p>
            <CodeBlock
              code={`import { ComponentName } from "virtual-ui-lib";`}
              lang="jsx"
            />
          </div>

          <div>
            <p className="text-xs text-white/40 mb-2 flex items-center gap-1.5">
              <span className="text-[#3be8ff]/60 font-bold">03</span> Use in
              your App.jsx
            </p>
            <CodeBlock
              code={`import { UserAvatar, PricingCard } from "virtual-ui-lib";\n\nexport default function App() {\n  return (\n    <div>\n      <UserAvatar src="/user.png" />\n      <PricingCard title="Pro" price={99} />\n    </div>\n  );\n}`}
              lang="jsx"
            />
          </div>
        </div>

        <p className="text-white/20 text-xs">
          ← Select a component from the sidebar to get started
        </p>
      </motion.div>
    </div>
  );
}


export default GuidePanel