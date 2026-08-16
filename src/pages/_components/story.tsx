import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export default function Story() {
  return (
    <section id="story" className="overflow-hidden bg-background py-24">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-accent uppercase">
            Наша история
          </p>
          <h2 className="text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
            300 лет традиций.
            <br />
            Один мир вкуса.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Более 300 лет наследия и более 300 ресторанов по всему миру — MADO
            дарит гостям подлинный вкус турецкой кухни за каждым столом. Это
            больше, чем место с мороженым — это полноценный гастрономический
            опыт: от фирменных десертов и насыщенного мороженого до
            тортов-мороженого, профитролей с начинкой и освежающих напитков —
            всё приготовлено с традицией и заботой.
          </p>
          <Button
            size="lg"
            className="mt-8 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="#locations">
              Узнать больше <ArrowRight className="size-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 hidden h-full w-full rounded-2xl border-2 border-accent/50 sm:block" />
          <img
            src="https://hercules-cdn.com/file_c9jJ1YCm3AMZ6M4kB4c9FIEZ"
            alt="Турецкий торт-мороженое MADO"
            className="relative aspect-4/3 w-full rounded-2xl object-cover shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
