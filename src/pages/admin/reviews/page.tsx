import { useState } from "react";
import { Star, Check, EyeOff, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type ReviewStatus = "new" | "approved" | "hidden";

type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: string;
  date: string;
  status: ReviewStatus;
};

const STATUS_META: Record<ReviewStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
  hidden: { label: "Hidden", color: "bg-gray-100 text-gray-500 dark:bg-gray-800" },
};

const SAMPLE: Review[] = [
  { id: "1", author: "Anna K.", rating: 5, text: "Amazing food and service! The Pistachio Kebab is absolutely incredible.", source: "Google", date: "16 Aug", status: "new" },
  { id: "2", author: "Rustam M.", rating: 5, text: "Best Turkish restaurant in Tashkent. Authentic flavors, great atmosphere.", source: "Google", date: "15 Aug", status: "approved" },
  { id: "3", author: "Maria S.", rating: 4, text: "Lovely place, great desserts. The baklava is to die for!", source: "Website", date: "14 Aug", status: "approved" },
  { id: "4", author: "John D.", rating: 3, text: "Food was good but service was slow.", source: "Google", date: "12 Aug", status: "hidden" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(SAMPLE);
  const [filter, setFilter] = useState<"all" | ReviewStatus>("all");

  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.status === filter);

  const setStatus = (id: string, status: ReviewStatus) =>
    setReviews(reviews.map((r) => r.id === id ? { ...r, status } : r));

  const handleDelete = (id: string) => setReviews(reviews.filter((r) => r.id !== id));

  const avg = (reviews.filter((r) => r.status === "approved").reduce((a, r) => a + r.rating, 0) / reviews.filter((r) => r.status === "approved").length).toFixed(1);

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Reviews</h1>
          <p className="text-sm text-muted-foreground mt-1">{reviews.filter((r) => r.status === "new").length} new reviews</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-2xl font-bold">{avg}</span>
          </div>
          <p className="text-xs text-muted-foreground">Average rating</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["all", "new", "approved", "hidden"] as ("all" | ReviewStatus)[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
              filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {s === "all" ? "All" : STATUS_META[s as ReviewStatus].label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((rev) => (
          <div key={rev.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary-foreground">{rev.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{rev.author}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={cn("w-3 h-3", i < rev.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{rev.source} · {rev.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80">{rev.text}</p>
              </div>
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0", STATUS_META[rev.status].color)}>
                {STATUS_META[rev.status].label}
              </span>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              {rev.status !== "approved" && (
                <button onClick={() => setStatus(rev.id, "approved")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 rounded-lg hover:opacity-80">
                  <Check className="w-3 h-3" /> Approve
                </button>
              )}
              {rev.status !== "hidden" && (
                <button onClick={() => setStatus(rev.id, "hidden")} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-muted text-muted-foreground rounded-lg hover:bg-muted/80">
                  <EyeOff className="w-3 h-3" /> Hide
                </button>
              )}
              <button onClick={() => handleDelete(rev.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 ml-auto">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
