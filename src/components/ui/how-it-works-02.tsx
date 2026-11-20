import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Step = {
  icon: LucideIcon;
  title: string;
  body: string;
};

function TimelineStep({ step, index, animated }: { step: Step; index: number; animated: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 99%", "start 77%"] });
  const opacity = useTransform(scrollYProgress, [0, .85], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const lineProgress = useTransform(scrollYProgress, [.2, 1], [0, 1]);
  const { icon: Icon, title, body } = step;

  return (
    <li className="timeline-step" ref={ref}>
      <motion.span
        className="timeline-line"
        aria-hidden="true"
        style={animated ? { scaleY: lineProgress } : undefined}
      />
      <motion.div className="timeline-entry" style={animated ? { opacity, y } : undefined}>
        <span className="timeline-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <div className="timeline-card">
          <span className="timeline-icon"><Icon aria-hidden="true" /></span>
          <div><h3>{title}</h3><p>{body}</p></div>
        </div>
      </motion.div>
    </li>
  );
}

export default function HowItWorks02({ steps }: { steps: Step[] }) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ol className="process-steps" role="list">
      {steps.map((step, index) => (
        <TimelineStep key={step.title} step={step} index={index} animated={mounted && !reducedMotion} />
      ))}
    </ol>
  );
}
