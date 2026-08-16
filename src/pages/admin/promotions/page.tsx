import { useState } from "react";
import { Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type PromoStatus = "active" | "scheduled" | "draft" | "expired";

type Promotion = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: PromoStatus;
  image: string;
};

const STATUS_META: Record<PromoStatus, { label: string; color: string }> = {
  active: { label: "Active", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
  scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" },
  draft: { label: "Draft", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
  expired: { label: "Expired", color: "bg-gray-100 text-gray-500 dark:bg-gray-800" },
};

const SAMPLE: Promotion[] = [
  { id: "1", title: "Summer Breakfast", description: "Special breakfast set for summer mornings", startDate: "1 Jun", endDate: "31 Aug 2026", status: "active", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=60" },
  { id: "2", title: "Weekend Brunch", description: "Extended brunch menu every Saturday & Sunday", startDate: "1 Sep", endDate: "30 Sep 2026", status: "scheduled", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=60" },
  { id: "3", title: "MADO Dessert Week", description: "Special discounts on all desserts", startDate: "20 Jul", endDate: "27 Jul 2026", status: "expired", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=60" },
];

export default function PromotionsPage() {
  const [promos, setPromos] = useState(SAMPLE);

  const handleDelete = (id: string) => setPromos(promos.filter((p) => p.id !== id));

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Promotions</h1>
          <p className="text-sm text-muted-foreground mt-1">{promos.filter((p) => p.status === "active").length} active promotions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Create Promotion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map((promo) => (
          <div key={promo.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors">
            <div className="relative">
              <img src={promo.image} alt={promo.title} className="w-full h-36 object-cover" />
              <span className={cn("absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_META[promo.status].color)}>
                {STATUS_META[promo.status].label}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{promo.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {promo.startDate} – {promo.endDate}
              </div>
            </div>
            <div className="px-4 pb-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm border border-border rounded-lg hover:bg-muted">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => handleDelete(promo.id)} className="p-2 border border-border rounded-lg hover:bg-destructive/10">
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
