"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo";
import { usePreloader } from "@/hooks/usePreloader";
import { preloaderVariants, preloaderLogoVariants, preloaderTitleVariants } from "@/motion/home";
import { useLoader } from "@/utils/loader";

export const Preloader = ({ assets = [], onDone }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const { showLoader } = useLoader.getState();

  useEffect(() => {
    if (!assets || assets.length === 0) {
      // No assets to preload; hide immediately
      setVisible(false);
      onDone && onDone();
      return;
    }

    let cancelled = false;
    (async () => {
      await usePreloader(assets, setProgress);
      if (cancelled) return;
      // Keep the preloader for a short time to allow animations
      setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        onDone && onDone();
      }, 1000);
    })();

    return () => {
      cancelled = true;
    };
  }, [assets]);

  if (!visible || !showLoader) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="page subgrid preloader"
        variants={preloaderVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <div className="intro">
          <motion.div className="logo-wrapper" layout="position" layoutId="logo" variants={preloaderLogoVariants} initial="hidden" animate="visible" transition={{ duration: 1, ease: "easeInOut" }}>
            <Logo/>
          </motion.div>
          <motion.h1
            className="body-text"
            layout="position"
            layoutId="home-title"
            transition={{ duration: 1, ease: "easeInOut" }}
            variants={preloaderTitleVariants}
            initial="hidden"
            animate="visible"
          >
            A Video Gallery of Poets
            <br />
            in Southern California
          </motion.h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}