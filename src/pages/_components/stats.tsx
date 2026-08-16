import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const STATS: Stat[] = [
  { label: "Dishes", value: 250, suffix: "+" },
  { label: "Years of Heritage", value: 300, suffix: "+" },
  { label: "Locations in the UAE", value: 8 },
];

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    let frameId: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="text-center"
          >
            <div className="font-serif text-5xl font-bold text-primary">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
