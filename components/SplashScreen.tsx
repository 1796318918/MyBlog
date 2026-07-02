// components/SplashScreen.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../siteConfig";
import HandWritenOpenPage from "./HandWritenOpenPage"; // 导入你刚修复的组件

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash") === "true";

    if (!hasSeenSplash) {
      setShow(true);
      const timer = setTimeout(() => {
        exitSplash();
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      document.documentElement.classList.add("splash-seen");
    }
  }, []);

  const exitSplash = () => {
    setShow(false);
    sessionStorage.setItem("hasSeenSplash", "true");

    setTimeout(() => {
      document.documentElement.classList.add("splash-seen");
    }, 500);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash-screen-container"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-white dark:bg-slate-950"
        >
          <HandWritenOpenPage
            title={siteConfig.title || "My Blog"}
            subtitle={`Welcome to ${siteConfig.authorName}'s space`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}