import { motion } from "motion/react";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";

type Location = {
  name: string;
  phone: string;
  address: string;
  timings: string;
  mapUrl: string;
};

const LOCATIONS: Location[] = [
  {
    name: "Джумейра",
    phone: "04 222 2338",
    address: "553 Jumeirah St – Umm Suqeim First – Umm Suqeim 1",
    timings: "Понедельник – воскресенье (8:00 – 01:00)",
    mapUrl: "https://maps.app.goo.gl/R9L13Cva59Brxpvv5",
  },
  {
    name: "Dubai Mall",
    phone: "04 388 2588",
    address:
      "Unit GS-039, The District, 1st Floor, Dubai Mall, Financial Ctr St – Burj Khalifa – Downtown Dubai",
    timings: "Пн–Чт (9:00–00:00) · Пт–Вс (9:00–01:00)",
    mapUrl: "https://maps.app.goo.gl/i2BXBJ3QN2F5aagR6",
  },
  {
    name: "Dubai Hills Mall",
    phone: "04 343 5400",
    address:
      "1st Floor, Dubai Hills Mall, Al Khail Rd – Hadaeq Sheikh Mohammed Bin Rashid",
    timings: "Пн–Чт (9:00–00:00) · Пт–Вс (9:00–01:00)",
    mapUrl: "https://maps.app.goo.gl/GQcgsRaENWcTG7vv6",
  },
  {
    name: "Шарджа, Корниш",
    phone: "06 567 7776",
    address: "Villa No. 5 – Al Muntazah St – Al Fisht – Alheera Suburb",
    timings: "Пн–Чт (8:00–01:00) · Пт–Сб (8:00–02:00) · Вс (8:00–01:00)",
    mapUrl: "https://maps.app.goo.gl/EYHNbh5cS7SiVD487",
  },
  {
    name: "Rahmania Mall",
    phone: "06 731 4864",
    address: "100a Abu Amr Al Basri St – Al Rahmania Suburb – Kshishah 6",
    timings: "Понедельник – воскресенье (9:00 – 23:00)",
    mapUrl: "https://maps.app.goo.gl/mz5suYAwsLiNCbFD6",
  },
  {
    name: "Аджман, Сити-Центр",
    phone: "06 749 9929",
    address: "City Centre – Al Jerf 2 – Ajman",
    timings: "Понедельник – воскресенье (9:00 – 00:00)",
    mapUrl: "https://maps.app.goo.gl/dDYwjE9xABD9okATA",
  },
  {
    name: "Рас-эль-Хайма, Al Manar Mall",
    phone: "07 227 0058",
    address: "Dafan Al Nakheel – Ras Al Khaimah",
    timings: "Пн–Чт (8:00–23:00) · Пт–Сб (8:00–00:00) · Вс (8:00–23:00)",
    mapUrl: "https://maps.app.goo.gl/75psEECTrkB6AEXy6",
  },
  {
    name: "Фуджейра, Сити-Центр",
    phone: "09 244 2168",
    address: "Ground Floor, City Center Fujairah, Next to Pandora",
    timings: "Понедельник – воскресенье (9:00 – 00:30)",
    mapUrl: "https://maps.app.goo.gl/4uPgxtaBB3Vk6NeC9",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="bg-background py-24">
      <div className="mx-auto max-w-[1140px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-accent uppercase">
            Найдите нас
          </p>
          <h2 className="text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Наши рестораны
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Дубай, Шарджа, Аджман, Рас-эль-Хайма, Фуджейра
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08, ease: "easeOut" }}
            >
              <Card className="h-full border-border/60 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-3">
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {loc.name}
                  </h3>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{loc.timings}</span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-auto cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    asChild
                  >
                    <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                      Показать на карте
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
