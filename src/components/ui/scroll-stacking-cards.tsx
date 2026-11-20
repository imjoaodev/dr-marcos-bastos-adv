/**
 * Service deck adapted from the Project Deck concept by Aakash Mehra.
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

type StackItem = { key: string; content: ReactNode };
type ScrollRange = [number, number, number, number];

const defaultRange: ScrollRange = [0, 1 / 3, 2 / 3, 1];

function StackingCard({ item, index, progress, range, last }: {
  item: StackItem;
  index: number;
  progress: MotionValue<number>;
  range?: ScrollRange;
  last: boolean;
}) {
  const points = range ?? defaultRange;
  const y = useTransform(progress, points, [index === 0 ? 0 : 24, 0, 0, last ? 0 : -3]);
  const rotateX = useTransform(progress, points, [index === 0 ? 0 : 9, 0, 0, last ? 0 : -5]);
  const scale = useTransform(progress, points, [index === 0 ? 1 : .98, 1, 1, last ? 1 : .97]);
  const filter = useTransform(progress, points, [
    `blur(${index === 0 ? 0 : 1.5}px) brightness(1)`,
    "blur(0px) brightness(1)",
    "blur(0px) brightness(1)",
    `blur(0px) brightness(${last ? 1 : .92})`,
  ]);

  return (
    <li className="scroll-stacking-card" style={{ "--stack-index": index } as CSSProperties}>
      <motion.div
        className="scroll-stacking-surface"
        style={range ? { y, rotateX, scale, filter, transformPerspective: 1000 } : undefined}
      >
        {item.content}
      </motion.div>
    </li>
  );
}

export function ScrollStackingCards({ id, items }: { id?: string; items: StackItem[] }) {
  const stackRef = useRef<HTMLOListElement>(null);
  const [ranges, setRanges] = useState<ScrollRange[]>([]);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 30, mass: .55 });

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(stack.querySelectorAll<HTMLLIElement>(":scope > li"));

    function measure() {
      if (!stack || !cards[0] || getComputedStyle(cards[0]).position !== "sticky") {
        setRanges([]);
        return;
      }

      const viewport = document.documentElement.clientHeight;
      const scrollLength = stack.offsetHeight + viewport;
      let offset = 0;
      const positions = cards.map((card) => {
        const style = getComputedStyle(card);
        offset += parseFloat(style.marginTop);
        const landing = offset + viewport - parseFloat(style.top);
        offset += card.offsetHeight;
        return { landing, approach: Math.min(card.offsetHeight * .55, 124) };
      });

      setRanges(positions.map(({ landing, approach }, index) => {
        const next = positions[index + 1];
        const settleEnd = next ? next.landing - next.approach * .35 : landing + 1;
        return [
          (landing - approach) / scrollLength,
          landing / scrollLength,
          settleEnd / scrollLength,
          (next?.landing ?? settleEnd + 1) / scrollLength,
        ];
      }));
    }

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(stack);
    cards.forEach((card) => observer?.observe(card));
    reducedMotion.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      observer?.disconnect();
      reducedMotion.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [items.length]);

  return (
    <ol id={id} className="scroll-stacking-cards" role="list" ref={stackRef}>
      {items.map((item, index) => (
        <StackingCard
          key={item.key}
          item={item}
          index={index}
          progress={progress}
          range={ranges[index]}
          last={index === items.length - 1}
        />
      ))}
    </ol>
  );
}
