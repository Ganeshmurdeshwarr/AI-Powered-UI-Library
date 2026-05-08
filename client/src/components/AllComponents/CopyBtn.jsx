import { useState } from "react";
import { TbCheck, TbCopy } from "react-icons/tb";

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);

  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer px-2 py-1 rounded-lg hover:bg-white/[0.04]"
    >
      {copied ? (
        <TbCheck size={13} className="text-[#3be8ff]" />
      ) : (
        <TbCopy size={13} />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}


export default CopyBtn