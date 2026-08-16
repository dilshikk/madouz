import { motion } from "motion/react";
import { ArrowRight, IceCreamCone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import Navbar from "./_components/navbar.tsx";
import Footer from "./_components/footer.tsx";

const GALLERY = [
  {
    src: "https://hercules-cdn.com/file_IUbrA2y7LoDS590BCXoZDMXC",
    alt: "Мехмет Саит Канбур готовит традиционное мороженое MADO",
  },
  {
    src: "https://hercules-cdn.com/file_yZgdagcUptsyh3vAhJ1PW2mL",
    alt: "Старинный способ взбивания мороженого maras dondurma",
  },
  {
    src: "https://hercules-cdn.com/file_n7Thyh5sztIT3wyuOTrqmKOT",
    alt: "Сейчас мороженое растягивается как тесто вручную",
  },
  {
    src: "https://hercules-cdn.com/file_UtqAtW60KCa6eusilKYLKX1H",
    alt: "Мороженое MADO нарезают ножом по традиционной технологии",
  },
] as const;

export default function Story() {
  return (
    <div>
      <Navbar />

      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/80" />
        <div className="relative mx-auto max-w-[1140px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/20"
          >
            <IceCreamCone className="size-7 text-accent" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mt-6 text-sm font-semibold tracking-[0.3em] text-accent uppercase"
          >
            Наша история
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-balance font-serif text-4xl font-bold text-primary-foreground sm:text-5xl"
          >
            Настоящий турецкий опыт. Настоящий праздник вкуса.
          </motion.h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              MADO означает <strong className="text-foreground">Maraş Dondurması</strong> —
              «Мараш» это регион Кахраманмараш, а «Дондурма» — мороженое,
              приготовленное из трёх главных ингредиентов: сахара, козьего
              молока и салепа.
            </p>
            <p>
              История MADO началась с Османа Аги, предка семьи Канбур,
              который собирал снег с горы Ахир в Кахраманмараше и смешивал
              его с ароматной патокой, превращая его в освежающий десерт.
              Опыт и секреты передавались из поколения в поколение — от
              деда к внуку, а вкус совершенствовался и раскрывался всё
              глубже с каждым новым поколением.
            </p>
            <p>
              В какой-то момент MADO пришлось модернизироваться и перейти
              от традиционного мороженого ручной работы к
              машинному производству, чтобы предлагать десерт круглый год
              и в больших объёмах. Команда MADO работала день и ночь, чтобы
              внести необходимые изменения и при этом сохранить тот самый
              неповторимый вкус.
            </p>
            <p>
              Сегодня MADO — это сеть турецких ресторанов с более чем 300
              филиалами по всему миру. MADO — это история успеха бренда,
              который начинался с простой цели — подарить как можно большему
              числу людей традиционную мараш-дондурму, а вырос до целой
              фабрики, рынка и международной ресторанной сети.
            </p>
            <p className="font-serif text-2xl font-bold text-foreground">
              С 1850 года.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-[1140px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-accent uppercase">
              С 1850 года
            </p>
            <h2 className="text-balance font-serif text-4xl font-bold text-foreground sm:text-5xl">
              Моменты нашей истории
            </h2>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {GALLERY.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-4/3 w-full object-cover grayscale transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-[1140px] px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                title: "Аутентичная турецкая кухня",
                text: "Почувствуйте настоящий вкус турецких традиций благодаря проверенным временем рецептам и тшательно отборанным ингредиентам.",
              },
              {
                title: "Фирменное мороженое",
                text: "Насыщенное moraženoго (dondurma), приготовленное вручную по традиционным турецким рецептам, известное по всему миру.",
              },
              {
                title: "Сервис и атмосфера",
                text: "Мы совмещаем искренее гостеприимство с современным сервисом, создавая атмосферу, где традиция встречается с элегантностью.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="text-center"
              >
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Button
              size="lg"
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link to="/#menu">
                Смотреть меню <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
