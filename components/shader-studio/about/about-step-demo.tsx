"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Download, Image, Code2, FileText, Video } from "lucide-react";

const STEP_MS = 2500;
const SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };

const stepShell = {
  initial: { opacity: 0, y: 10, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { ...SPRING, duration: 0.45 } },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const STEPS = [
  { id: "create", label: "Create a visual" },
  { id: "customize", label: "Customize & remix" },
  { id: "mockup", label: "Drop your mockup (optional)" },
  { id: "export", label: "Export anything" },
] as const;

const PALETTE_COLORS = ["#273DFF", "#00DDFF", "#FFDE00", "#FF4D4D", "#9B5CFF", "#34D399"] as const;

function DemoBloom({ className }: { className?: string }) {
  return <div className={`about-demo-visual-bloom${className ? ` ${className}` : ""}`} />;
}

function DemoPaletteSwatches({ activeIndex = 1, delay = 0.35 }: { activeIndex?: number; delay?: number }) {
  return (
    <div className="about-demo-palette">
      {PALETTE_COLORS.slice(0, 4).map((color, index) => (
        <motion.span
          key={color}
          className={`about-demo-swatch${index === activeIndex ? " is-active" : ""}`}
          style={{ background: color }}
          initial={{ opacity: 0, scale: 0.5, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...SPRING, delay: delay + index * 0.08 }}
        />
      ))}
    </div>
  );
}

function StepCreate() {
  return (
    <div className="about-demo-scene">
      <motion.div
        className="about-demo-visual"
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...SPRING, delay: 0.1 }}
      >
        <DemoBloom />
      </motion.div>
      <DemoPaletteSwatches />
    </div>
  );
}

function StepCustomize() {
  return (
    <div className="about-demo-scene">
      <motion.div
        className="about-demo-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.08 }}
      >
        <div className="about-demo-palette-ui">
          <span className="about-demo-palette-label">Palette</span>
          <div className="about-demo-palette-grid">
            {PALETTE_COLORS.map((color, index) => (
              <motion.span
                key={color}
                className={`about-demo-palette-cell${index === 2 ? " is-active" : ""}`}
                style={{ background: color }}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRING, delay: 0.2 + index * 0.05 }}
              />
            ))}
          </div>
        </div>
        {[
          { label: "Intensity", value: 72, delay: 0.45 },
          { label: "Motion", value: 48, delay: 0.62 },
        ].map(({ label, value, delay }) => (
          <div key={label} className="about-demo-slider-row">
            <span>{label}</span>
            <div className="about-demo-slider-track">
              <motion.div
                className="about-demo-slider-fill"
                initial={{ width: "18%" }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1.1, delay, ease: "easeOut" }}
              />
              <motion.div
                className="about-demo-slider-thumb"
                initial={{ left: "18%" }}
                animate={{ left: `${value}%` }}
                transition={{ duration: 1.1, delay, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
        <motion.span
          className="about-demo-chip"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 0.95 }}
        >
          Remix
        </motion.span>
      </motion.div>
    </div>
  );
}

function StepMockup() {
  return (
    <div className="about-demo-scene">
      <motion.div
        className="about-demo-dropzone"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <DemoBloom className="about-demo-dropzone-bloom" />
        <motion.div
          className="about-demo-mockup-card"
          initial={{ opacity: 0, x: 36, y: -28, rotate: 6, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          transition={{ ...SPRING, delay: 0.35 }}
        >
          <div className="about-demo-browser-bar">
            <span /><span /><span />
          </div>
          <div className="about-demo-mockup-screen">
            <div className="about-demo-mockup-line" />
            <div className="about-demo-mockup-line short" />
            <div className="about-demo-mockup-block" />
          </div>
        </motion.div>
        <motion.svg
          className="about-demo-cursor"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          initial={{ opacity: 0, x: 24, y: -20 }}
          animate={{ opacity: [0, 1, 1, 0], x: [24, 8, 0, -4], y: [-20, -8, 0, 4] }}
          transition={{ duration: 1.2, delay: 0.15, times: [0, 0.2, 0.75, 1] }}
        >
          <path d="M3 2L3 14L7 10L10 16L12 15L9 9L14 9L3 2Z" fill="white" stroke="rgba(0,0,0,0.35)" strokeWidth="0.8" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

const EXPORT_FORMATS = [
  { label: "PNG", icon: Image },
  { label: "MP4", icon: Video },
  { label: "React", icon: Code2 },
  { label: "GLSL", icon: FileText },
  { label: "Prompt", icon: FileText },
] as const;

function StepExport() {
  return (
    <div className="about-demo-scene about-demo-scene-export">
      <motion.button
        type="button"
        className="about-demo-export-btn"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...SPRING, delay: 0.1 }}
        tabIndex={-1}
        aria-hidden
      >
        <Download size={13} strokeWidth={2.2} />
        Export
      </motion.button>
      <div className="about-demo-formats">
        {EXPORT_FORMATS.map(({ label, icon: Icon }, index) => (
          <motion.div
            key={label}
            className={`about-demo-format${index === 0 ? " is-highlighted" : ""}`}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...SPRING, delay: 0.42 + index * 0.07 }}
          >
            <Icon size={11} strokeWidth={2} />
            <span>{label}</span>
            {index === 0 && (
              <motion.span
                className="about-demo-format-check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRING, delay: 1.05 }}
              >
                <Check size={9} strokeWidth={3} />
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const STEP_SCENES = [StepCreate, StepCustomize, StepMockup, StepExport] as const;

export function AboutStepDemo() {
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActiveStep((step) => (step + 1) % STEPS.length);
  }, []);

  const goToStep = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(advance, STEP_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance, paused, reducedMotion, activeStep]);

  const Scene = STEP_SCENES[activeStep];

  return (
    <div
      className="about-step-demo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="about-demo-card" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={STEPS[activeStep].id} className="about-demo-card-inner" {...stepShell}>
            <Scene />
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.p
        key={`label-${activeStep}`}
        className="about-step-label"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {STEPS[activeStep].label}
      </motion.p>
      <div className="about-step-dots" role="tablist" aria-label="How it works">
        {STEPS.map((step, index) => (
          <button
            key={step.id}
            type="button"
            role="tab"
            className={`about-step-dot${index === activeStep ? " is-active" : ""}`}
            aria-selected={index === activeStep}
            aria-label={step.label}
            onClick={() => goToStep(index)}
          />
        ))}
      </div>
    </div>
  );
}
