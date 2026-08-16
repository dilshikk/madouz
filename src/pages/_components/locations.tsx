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
    name: "Jumeirah",
    phone: "04 222 2338",
    address: "553 Jumeirah St – Umm Suqeim First – Umm Suqeim 1",
    timings: "Monday – Sunday (8am – 1am)",
    mapUrl: "https://maps.app.goo.gl/R9L13Cva59Brxpvv5",
  },
  {
    name: "Dubai Mall",
    phone: "04 388 2588",
    address:
      "Unit GS-039, The District, 1st Floor, Dubai Mall, Financial Ctr St – Burj Khalifa – Downtown Dubai",
    timings: "Mon–Thu (9am–12am) · Fri–Sun (9am–1am)",
    mapUrl: "https://maps.app.goo.gl/i2BXBJ3QN2F5aagR6",
  },
  {
    name: "Dubai Hills Mall",
    phone: "04 343 5400",
    address:
      "1st Floor, Dubai Hills Mall, Al Khail Rd – Hadaeq Sheikh Mohammed Bin Rashid",
    timings: "Mon–Thu (9am–12am) · Fri–Sun (9am–1am)",
    mapUrl: "https://maps.app.goo.gl/GQcgsRaENWcTG7vv6",
  },
  {
    name: "Sharjah Corniche",
    phone: "06 567 7776",
    address: "Villa No. 5 – Al Muntazah St – Al Fisht – Alheera Suburb",
    timings: "Mon–Thu (8am–1am) · Fri–Sat (8am–2am) · Sun (8am–1am)",
    mapUrl: "https://maps.app.goo.gl/EYHNbh5cS7SiVD487",
  },
  {
    name: "Rahmania Mall",
    phone: "06 731 4864",
    address: "100a Abu Amr Al Basri St – Al Rahmania Suburb – Kshishah 6",
    timings: "Monday – Sunday (9am – 11pm)",
    mapUrl: "https://maps.app.goo.gl/mz5suYAwsLiNCbFD6",
  },
  {
    name: "Ajman City Centre",
    phone: "06 749 9929",
    address: "City Centre – Al Jerf 2 – Ajman",
    timings: "Monday – Sunday (9am – 12am)",
    mapUrl: "https://maps.app.goo.gl/dDYwjE9xABD9okATA",
  },
  {
    name: "RAK Al Manar Mall",
    phone: "07 227 0058",
    address: "Dafan Al Nakheel – Ras Al Khaimah",
    timings: "Mon–Thu (8am–11pm) · Fri–Sat (8am–12am) · Sun (8am–11pm)",
    mapUrl: "https://maps.app.goo.gl/75psEECTrkB6AEXy6",
  },
  {
    name: "Fujairah City Center",
    phone: "09 244 2168",
    address: "Ground Floor, City Center Fujairah, Next to Pandora",
    timings: "Monday – Sunday (9am – 12:30am)",
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
            Find Us
          </p>
          <h2 className="text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
            Our Locations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah
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
                      View Map
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
