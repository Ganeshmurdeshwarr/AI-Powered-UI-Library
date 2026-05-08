import { AnimatePresence, motion } from "motion/react";


import { useState } from "react";
import PropsInput from "./PropsInput";
import CodeAndPreview from "./CodeAndPreview";
import ActionButtons from "./ActionButtons";
import { TbTrash } from "react-icons/tb";

function AddComponentForm({ onSaved }) {
  const [name, setName] = useState("");
  const [props, setProps] = useState([]);
  const [code, setCode] = useState("");
  const [codeTab, setCodeTab] = useState("code");
  const [savedId, setSavedId] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  



  return (
    <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-3xl w-full mx-auto">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium"
            style={{
              background:
                toast.type === "success"
                  ? "#0d9f6e"
                  : toast.type === "error"
                    ? "#e02424"
                    : "#1c1c2e",
              maxWidth: "calc(100vw - 2rem)",
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-base sm:text-lg font-bold mb-1">Add Component</h2>
      <p className="text-white/35 text-xs mb-5 sm:mb-6">
        Manually add a component — give it a name, define props, paste the code
        and preview it.
      </p>

      <div className="space-y-4 sm:space-y-5">
        {/* ── Component Name ── */}
        <div className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-2">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">
            Component Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g. "PricingCard", "HeroSection"'
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#3be8ff]/40 transition-colors"
          />
        </div>

        {/* ── Props ── */}
        <div className="p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] space-y-2">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block">
            Props
          </label>
          <PropsInput props={props} setProps={setProps} />
        </div>

        {/* ── Code + Preview ── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <CodeAndPreview
            codeTab={codeTab}
            setCodeTab={setCodeTab}
            code={code}
            setCode={setCode}
          />
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap pt-1">
          <ActionButtons
            code={code}
            showToast={showToast}
            setSavedId={setSavedId}
            savedId={savedId}
            setIsPublished={setIsPublished}
            isPublished={isPublished}
            props={props}
            name={name}
          />

          {/* Reset */}
          {(savedId || code || name || props.length > 0) && (
            <button
              onClick={() => {
                setName("");
                setProps([]);
                setCode("");
                setSavedId(null);
                setIsPublished(false);
                setCodeTab("code");
              }}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/60 transition-all bg-transparent border-none cursor-pointer"
            >
              <TbTrash size={13} /> Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


export default AddComponentForm