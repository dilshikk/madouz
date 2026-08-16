import { motion } from "motion/react";
import { ArrowRight, IceCreamCone, Cake, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type Highlight = {
  title: string;
  description: string;
  image: string;
  icon: typeof IceCreamCone;
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Signature Ice Cream",
    description:
      "Rich, handcrafted Turkish ice cream (dondurma) made with traditional recipes and premium ingredients.",
    image: "https://hercules-cdn.com/file_pufuhQShef4uFjB7yOwT4cM8",
    icon: IceCreamCone,
  },
  {
    title: "Handcrafted Desserts",
    description:
      "From golden baklava to filled profiteroles, every dessert is crafted with generations of expertise.",
    image: "https://hercules-cdn.com/file_VKPbNpeYeiy5CmAhJ20YwDHt",
    icon: Cake,
  },
  {
    title: "Ice Cream Cakes",
    description:
      "Celebration-worthy cakes layered with our signature ice creams, perfect for any occasion.",
    image: "https://hercules-cdn.com/file_c9jJ1YCm3AMZ6M4kB4c9FIEZ",
    icon: Coffee,
  },
];

export default function Highlights() {
  return (
    <section id="menu" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-[1140px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-accent uppercase">
            A Real Taste Feast
          </p>
          <h2 className="text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Experience the Authentic Turkish Cuisine
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover centuries-old flavors, handcrafted desserts, and iconic
            Turkish dishes made with tradition and passion.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
            >
              <Card className="h-full overflow-hidden border-border/60 pt-0 shadow-sm transition-shadow hover:shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-4/3 w-full object-cover"
                />
                <CardHeader className="pt-6">
                  <div className="mb-1 flex items-center gap-2">
                    <item.icon className="size-5 text-accent" />
                    <CardTitle className="font-serif text-xl">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            size="lg"
            className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a
              href="https://oddmenu.com/p/mado-restaurant"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Menu <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
