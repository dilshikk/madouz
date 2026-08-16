import { useState } from "react";
import { Plus, Edit2, Trash2, MapPin, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type VacancyStatus = "published" | "draft" | "closed";

type Vacancy = {
  id: string;
  position: string;
  department: string;
  branch: string;
  type: string;
  status: VacancyStatus;
  applications: number;
};

const STATUS_META: Record<VacancyStatus, { label: string; color: string }> = {
  published: { label: "Published", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" },
  draft: { label: "Draft", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400" },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

const SAMPLE: Vacancy[] = [
  { id: "1", position: "Waiter", department: "Service", branch: "Tashkent", type: "Full Time", status: "published", applications: 5 },
  { id: "2", position: "Barista", department: "Bar", branch: "Tashkent", type: "Full Time", status: "published", applications: 3 },
  { id: "3", position: "Runner", department: "Service", branch: "Tashkent", type: "Part Time", status: "draft", applications: 0 },
  { id: "4", position: "Chef de Partie", department: "Kitchen", branch: "Tashkent", type: "Full Time", status: "published", applications: 2 },
  { id: "5", position: "Cashier", department: "Service", branch: "Tashkent", type: "Full Time", status: "closed", applications: 8 },
];

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState(SAMPLE);

  const handleDelete = (id: string) => setVacancies(vacancies.filter((v) => v.id !== id));

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Vacancies</h1>
          <p className="text-sm text-muted-foreground mt-1">{vacancies.filter((v) => v.status === "published").length} active positions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add Vacancy
        </button>
      </div>

      <div className="space-y-3">
        {vacancies.map((vac) => (
          <div key={vac.id} className="group bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4 hover:border-accent/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{vac.position}</p>
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", STATUS_META[vac.status].color)}>
                    {STATUS_META[vac.status].label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {vac.branch}
                  </span>
                  <span className="text-sm text-muted-foreground">{vac.department}</span>
                  <span className="text-sm text-muted-foreground">{vac.type}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-lg font-bold text-foreground">{vac.applications}</p>
                <p className="text-xs text-muted-foreground">applications</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-muted"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                <button onClick={() => handleDelete(vac.id)} className="p-2 rounded-lg hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
