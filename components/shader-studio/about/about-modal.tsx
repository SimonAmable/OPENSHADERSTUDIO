"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ShaderCanvas } from "../canvas";
import type { Recipe } from "../types";
import { AboutStepDemo } from "./about-step-demo";

type AboutModalProps = {
  recipe: Recipe;
  onClose: () => void;
};

export function AboutModalPanel({ recipe, onClose }: AboutModalProps) {
  return (
    <div
      className="about-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-title"
      aria-describedby="about-desc"
    >
      <button type="button" className="about-close" onClick={onClose} aria-label="Close">
        <X />
      </button>
      <div className="about-stage">
        <div className="about-media">
          <ShaderCanvas recipe={recipe} frozen={false} onError={() => undefined} />
        </div>
        <div className="about-demo-overlay">
          <AboutStepDemo />
        </div>
      </div>
      <div className="about-body">
        <h2 id="about-title">Shader Studio</h2>
        <p id="about-desc">
          Free unlimited animated shaders you can customize, remix, and share. Export as image, video, React, GLSL, or an
          LLM-ready prompt for landing pages, product mockups, demo videos, and any creative work.
        </p>
        <button type="button" className="button primary about-cta" onClick={onClose}>
          Start creating
        </button>
      </div>
    </div>
  );
}

type AboutModalBackdropProps = AboutModalProps & {
  onBackdropClose: () => void;
};

export function AboutModalBackdrop({ recipe, onClose, onBackdropClose }: AboutModalBackdropProps) {
  return (
    <motion.div
      className="about-backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onBackdropClose}
      onKeyDown={(event) => event.key === "Escape" && onBackdropClose()}
    >
      <motion.div
        className="about-shell"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 28 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        onClick={(event) => event.stopPropagation()}
      >
        <AboutModalPanel recipe={recipe} onClose={onClose} />
      </motion.div>
    </motion.div>
  );
}
