import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, IceCreamCone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";

const NAV_LINKS = [
  { label: "Главная", href: "/" },
  { label: "Наша история", href: "/story" },
  { label: "Меню", href: "/#menu" },
  { label: "Кейтеринг", href: "/catering" },
  { label: "Рестораны", href: "/locations" },
  { label: "Карьера", href: "/careers" },
  { label: "Контакты", href: "/contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <IceCreamCone className="size-6 text-primary" />
          <span className="font-serif text-2xl font-bold tracking-wide text-primary">
            MADO
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() =>
              toast("Скоро будет доступно!", {
                description: "Онлайн-заказ уже в пути.",
              })
            }
          >
            Заказать
          </Button>
        </div>

        <button
          className="cursor-pointer text-foreground md:hidden"
          aria-label="Открыть меню"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden border-t border-border/60 md:hidden"
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                setOpen(false);
                toast("Скоро будет доступно!", {
                  description: "Онлайн-заказ уже в пути.",
                });
              }}
            >
              Заказать
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
