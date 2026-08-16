import { useState } from "react";
import { Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type RequestStatus = "new" | "in_progress" | "contacted" | "confirmed" | "completed" | "cancelled";

type CateringRequest = {
  id: string;
  name: string;
  phone: string;
  event: string;
  date: string;
  guests: number;
  message: string;
  status: RequestStatus;
  createdAt: string;
};

const STATUS_META: Record<RequestStatus, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" },
  in_progress: { label: "In Progress", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
  contacted: { label: "Contacted", color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400" },
  confirmed: { label: "Confirmed", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400" },
};

const SAMPLE: CateringRequest[] = [
  { id: "124", name: "John Smith", phone: "+998 90 123 45 67", event: "Corporate", date: "24 Aug 2026", guests: 120, message: "Need catering for corporate event", status: "new", createdAt: "16 Aug 06:30" },
  { id: "123", name: "Sarah Jones", phone: "+998 93 456 78 90", event: "Wedding", date: "10 Sep 2026", guests: 200, message: "Traditional Turkish menu preferred", status: "contacted", createdAt: "15 Aug 14:20" },
  { id: "122", name: "Alex Kim", phone: "+998 91 789 01 23", event: "Birthday", date: "5 Sep 2026", guests: 50, message: "Kids friendly menu needed", status: "confirmed", createdAt: "14 Aug 09:15" },
  { id: "121", name: "Maria Brown", phone: "+998 99 234 56 78", event: "Workshop", date: "28 Aug 2026", guests: 30, message: "Business lunch setup", status: "completed", createdAt: "10 Aug 11:00" },
];

const FILTERS: { label: string; value: "all" | RequestStatus }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in_progress" },
  { label: "Contacted", value: "contacted" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function CateringRequestsPage() {
  const [requests, setRequests] = useState(SAMPLE);
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const [viewing, setViewing] = useState<CateringRequest | null>(null);

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const updateStatus = (id: string, status: RequestStatus) => {
    setRequests(requests.map((r) => r.id === id ? { ...r, status } : r));
    if (viewing?.id === id) setViewing({ ...viewing, status });
  };

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <h1 className="text-2xl font-serif font-bold">Catering Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">{requests.filter((r) => r.status === "new").length} new requests</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              filter === f.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 text-xs opacity-70">
                {requests.filter((r) => r.status === f.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((req) => (
          <div key={req.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-4 hover:border-accent/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono">#{req.id}</span>
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_META[req.status].color)}>
                  {STATUS_META[req.status].label}
                </span>
              </div>
              <p className="font-semibold text-foreground">{req.name}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{req.phone}</span>
                <span>Event: {req.event}</span>
                <span>Date: {req.date}</span>
                <span>Guests: {req.guests}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {req.createdAt}
              </div>
            </div>
            <button
              onClick={() => setViewing(req)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted"
            >
              <Eye className="w-3.5 h-3.5" /> Open
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No requests in this category</p>
          </div>
        )}
      </div>

      {/* View modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setViewing(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-serif font-bold">Request #{viewing.id}</h2>
              <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_META[viewing.status].color)}>
                {STATUS_META[viewing.status].label}
              </span>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">Name</p><p className="text-sm font-medium">{viewing.name}</p></div>
                <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm font-medium">{viewing.phone}</p></div>
                <div><p className="text-xs text-muted-foreground">Event Type</p><p className="text-sm font-medium">{viewing.event}</p></div>
                <div><p className="text-xs text-muted-foreground">Date</p><p className="text-sm font-medium">{viewing.date}</p></div>
                <div><p className="text-xs text-muted-foreground">Guests</p><p className="text-sm font-medium">{viewing.guests}</p></div>
                <div><p className="text-xs text-muted-foreground">Received</p><p className="text-sm font-medium">{viewing.createdAt}</p></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Message</p>
                <p className="text-sm bg-muted rounded-lg p-3">{viewing.message}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STATUS_META) as RequestStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(viewing.id, s)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
                        viewing.status === s
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-muted"
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
