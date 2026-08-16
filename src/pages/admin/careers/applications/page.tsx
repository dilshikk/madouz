import { useState } from "react";
import { Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type AppStatus = "new" | "reviewing" | "interview" | "accepted" | "rejected";

type Application = {
  id: string;
  name: string;
  position: string;
  branch: string;
  phone: string;
  status: AppStatus;
  date: string;
};

const STATUS_META: Record<AppStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" },
  reviewing: { label: "Reviewing", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
  interview: { label: "Interview", color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400" },
  accepted: { label: "Accepted", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" },
};

const SAMPLE: Application[] = [
  { id: "1", name: "Dilshod Shomuratov", position: "Waiter", branch: "Tashkent", phone: "+998 90 123 45 67", status: "new", date: "16 Aug 2026" },
  { id: "2", name: "Kamola Yusupova", position: "Barista", branch: "Tashkent", phone: "+998 93 456 78 90", status: "interview", date: "15 Aug 2026" },
  { id: "3", name: "Jasur Mirzayev", position: "Chef de Partie", branch: "Tashkent", phone: "+998 91 789 01 23", status: "reviewing", date: "14 Aug 2026" },
  { id: "4", name: "Nodira Khasanova", position: "Cashier", branch: "Tashkent", phone: "+998 99 234 56 78", status: "accepted", date: "12 Aug 2026" },
  { id: "5", name: "Bobur Toshmatov", position: "Runner", branch: "Tashkent", phone: "+998 94 567 89 01", status: "rejected", date: "10 Aug 2026" },
];

export default function ApplicationsPage() {
  const [apps, setApps] = useState(SAMPLE);
  const [filter, setFilter] = useState<"all" | AppStatus>("all");
  const [viewing, setViewing] = useState<Application | null>(null);

  const filtered = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  const updateStatus = (id: string, status: AppStatus) => {
    setApps(apps.map((a) => a.id === id ? { ...a, status } : a));
    if (viewing?.id === id) setViewing({ ...viewing, status });
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold">Applications</h1>
        <p className="text-sm text-muted-foreground mt-1">{apps.filter((a) => a.status === "new").length} new applications</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["all", ...Object.keys(STATUS_META)] as ("all" | AppStatus)[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
              filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {s === "all" ? "All" : STATUS_META[s as AppStatus].label}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map((app) => (
            <div key={app.id} className="flex items-center justify-between px-4 py-4 hover:bg-muted/30 group">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary-foreground">{app.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{app.name}</p>
                    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", STATUS_META[app.status].color)}>
                      {STATUS_META[app.status].label}
                    </span>
                  </div>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-xs text-muted-foreground">{app.position}</span>
                    <span className="text-xs text-muted-foreground">{app.branch}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {app.date}
                  </p>
                </div>
                <button
                  onClick={() => setViewing(app)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="w-3 h-3" /> View
                </button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No applications</p>
          </div>
        )}
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setViewing(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-serif font-bold">{viewing.name}</h2>
              <p className="text-sm text-muted-foreground">{viewing.position} · {viewing.branch}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{viewing.phone}</p></div>
                <div><p className="text-xs text-muted-foreground">Applied</p><p className="text-sm font-medium">{viewing.date}</p></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STATUS_META) as AppStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(viewing.id, s)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
                        viewing.status === s ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                      )}
                    >
                      {STATUS_META[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-5">
              <button onClick={() => setViewing(null)} className="w-full py-2.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
