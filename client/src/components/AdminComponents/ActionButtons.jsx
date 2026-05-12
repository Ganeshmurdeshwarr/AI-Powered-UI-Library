import { AnimatePresence, motion } from "motion/react";
import React, { useState } from 'react'
import { TbDeviceFloppy, TbLoader } from 'react-icons/tb';
import axios from "axios";
import { serverUrl } from "../../App";

const ActionButtons = ({
  code,
  showToast,
  setSavedId,
  onSaved,
  savedId,
  setIsPublished,
  isPublished,
  props,
  name,
}) => {
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !code.trim()) {
      showToast("Component name and code are required.", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/component/save`,
        { name: name.trim(), code, props },
        { withCredentials: true },
      );
      setSavedId(res.data.component._id);
      showToast("Component saved successfully!", "success");
      onSaved && onSaved();
    } catch (err) {
      showToast(err.response?.data?.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!savedId) return;
    setPublishing(true);
    try {
      await axios.post(
        `${serverUrl}/api/component/publish`,
        { componentId: savedId },
        { withCredentials: true },
      );
      setIsPublished(true);
      showToast("Published to npm successfully!", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Publish failed", "error");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <>
      {/* Save */}
      <motion.button
        onClick={handleSave}
        disabled={saving || !!savedId}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all border-none cursor-pointer"
        style={{
          background: savedId
            ? "rgba(16,185,129,0.12)"
            : "rgba(59,232,255,0.12)",
          color: savedId ? "#34d399" : "#3be8ff",
          border: `1px solid ${savedId ? "rgba(16,185,129,0.3)" : "rgba(59,232,255,0.25)"}`,
        }}
      >
        {saving ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <TbDeviceFloppy size={15} />
          </motion.span>
        ) : (
          <TbDeviceFloppy size={15} />
        )}
        {saving ? "Saving..." : savedId ? "Saved ✓" : "Save Component"}
      </motion.button>

      {/* Publish */}
      <AnimatePresence>
        {savedId && !isPublished && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            onClick={handlePublish}
            disabled={publishing}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all border-none cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
              boxShadow: publishing ? "none" : "0 0 20px rgba(6,182,212,0.25)",
              color: "#fff",
            }}
          >
            {publishing ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              >
                <TbLoader size={15} />
              </motion.span>
            ) : (
              <TbLoader size={15} />
            )}
            {publishing ? "Publishing..." : "Publish to npm"}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Published badge */}
      <AnimatePresence>
        {isPublished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#34d399",
            }}
          >
            ✓ Published
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActionButtons