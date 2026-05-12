import { HiSparkles } from "react-icons/hi2";
import { TbBox, TbBrandNpm, TbCode, TbEye, TbX } from "react-icons/tb";
import { LiveComponentPreview } from "../LiveComponentPreview";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import CodeBlock from "./CodeBlock";

function DetailPanel({ component, onBack }) {
  const [activeTab, setActiveTab] = useState("preview");

  const importCode = `import { ${component.name} } from "ganesh-ui-library";`;
  const usageCode = `import { ${component.name} } from "ganesh-ui-library";\n\nexport default function App() {\n  return (\n    <div>\n      <${component.name}${
    component.props?.length
      ? `\n        ${component.props.map((p) => `${p}={/* value */}`).join("\n        ")}`
      : ""
  } />\n    </div>\n  );\n}`;

  return (
    <motion.div
      key={component._id}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06] gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          {/* Back button on mobile */}
          {onBack && (
            <button
              onClick={onBack}
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white/80 transition-colors cursor-pointer shrink-0"
            >
              <TbX size={14} />
            </button>
          )}
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white truncate">
              {component.name}
            </h2>
            <p className="text-white/35 text-[11px] sm:text-xs mt-0.5 truncate">
              {component.props?.length > 0
                ? `Props: ${component.props.join(", ")}`
                : "No props"}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 rounded-xl p-1 overflow-x-auto shrink-0"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          {[
            { id: "preview", icon: TbEye, label: "Preview" },
            { id: "code", icon: TbCode, label: "Code" },
            { id: "guide", icon: TbBox, label: "Guide" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all capitalize cursor-pointer border-none whitespace-nowrap"
              style={{
                background:
                  activeTab === id ? "rgba(59,232,255,0.15)" : "transparent",
                color: activeTab === id ? "#3be8ff" : "rgba(255,255,255,0.35)",
              }}
            >
              <Icon size={11} /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LiveComponentPreview code={component.code} />
            </motion.div>
          )}

          {activeTab === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CodeBlock code={component.code} lang="jsx" />
            </motion.div>
          )}

          {activeTab === "guide" && (
            <motion.div
              key="guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {component.props?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                    <TbBox size={13} /> Props
                  </p>
                  <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                          <th className="text-left px-4 py-2.5 text-white/35 font-medium">
                            Name
                          </th>
                          <th className="text-left px-4 py-2.5 text-white/35 font-medium">
                            Type
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {component.props.map((p, i) => (
                          <tr
                            key={i}
                            className="border-b border-white/[0.04] last:border-0"
                          >
                            <td className="px-4 py-2.5 font-mono text-[#3be8ff]/70">
                              {p}
                            </td>
                            <td className="px-4 py-2.5 text-white/30">any</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                  <TbBrandNpm size={13} /> Install
                </p>
                <CodeBlock code={`npm install ganesh-ui-library`} lang="bash" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                  <TbCode size={13} /> Import
                </p>
                <CodeBlock code={importCode} lang="jsx" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white/50 mb-3 flex items-center gap-2">
                  <HiSparkles size={13} /> Usage in App.jsx
                </p>
                <CodeBlock code={usageCode} lang="jsx" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


export default DetailPanel