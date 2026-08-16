import { Eye, Clock, MessageSquare, Briefcase, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

const requests = [
  { id: "124", type: "Catering", icon: UtensilsCrossed, name: "John Smith", detail: "Corporate event · 120 guests · 24 Aug", status: "New", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400", date: "16 Aug 06:30", href: "/admin/catering/requests" },
  { id: "123", type: "Career", icon: Briefcase, name: "Dilshod Shomuratov", detail: "Waiter position · Tashkent", status: "New", statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400", date: "16 Aug 06:10", href: "/admin/careers/applications" },
  { id: "122", type: "Contact", icon: MessageSquare, name: "Maria Brown", detail: "General inquiry about menu", status: "Pending", statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400", date: "15 Aug 14:20", href: "/admin/requests" },
  { id: "121", type: "Catering", icon: UtensilsCrossed, name: "Alex Kim", detail: "Birthday party · 50 guests · 5 Sep", status: "Confirmed", statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400", date: "14 Aug 09:15", href: "/admin/catering/requests" },
];

export default function RequestsPage() {
  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold">All Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">Unified inbox for catering, career, and contact requests</p>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <div key={req.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-4 hover:border-accent/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <req.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">#{req.id}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{req.type}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${req.statusColor}`}>{req.status}</span>
                </div>
                <p className="font-semibold text-foreground mt-0.5">{req.name}</p>
                <p className="text-sm text-muted-foreground">{req.detail}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {req.date}
                </div>
              </div>
            </div>
            <Link
              to={req.href}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted"
            >
              <Eye className="w-3.5 h-3.5" /> View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
