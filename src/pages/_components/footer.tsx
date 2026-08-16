import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, IceCreamCone } from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
  { label: "Contact Us", href: "#contact" },
] as const;

const SOCIALS = [
  { icon: SiFacebook, href: "https://www.facebook.com/Madouae", label: "Facebook" },
  { icon: SiInstagram, href: "https://www.instagram.com/madouae/", label: "Instagram" },
  { icon: SiTiktok, href: "https://www.tiktok.com/@mado.uae", label: "Tiktok" },
] as const;

export default function Footer() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: ContactFormValues) => {
    toast.success("Message sent!", {
      description: `Thanks ${values.name}, our team will get back to you shortly.`,
    });
    form.reset();
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-border bg-[#143968] text-primary-foreground bg-cover bg-center bg-no-repeat max-[1535px]:!bg-none"
      style={{
        backgroundImage:
          "url(https://hercules-cdn.com/file_A2x69jw8GXlfnDc64BEyN6yi)",
      }}
    >
      <div className="relative mx-auto max-w-[1140px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <IceCreamCone className="size-6 text-accent" />
              <span className="font-serif text-2xl font-bold">MADO</span>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/75">
              This is the official website of MADO Dubai, United Arab
              Emirates.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/75">
              <Mail className="size-4 text-accent" />
              <a href="mailto:marketing@mado.ae" className="hover:text-accent">
                marketing@mado.ae
              </a>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/75">
              <Phone className="size-4 text-accent" />
              <a href="tel:+971504831675" className="hover:text-accent">
                +971 50 483 1675
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold">Quick Links</h3>
            <nav className="mt-4 flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-primary-foreground/75 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold">Contact Us</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/80">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Smith"
                          className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/80">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/80">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Send
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row">
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} MADO UAE
          </p>
          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-primary-foreground/75 transition-colors hover:text-accent"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
