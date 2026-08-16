import { useState } from "react";
import { Plus, Edit2, MapPin, Phone, Clock, ToggleLeft, ToggleRight } from "lucide-react";

type Location = {
  id: string;
  name: string;
  district: string;
  phone: string;
  hours: string;
  status: "open" | "closed" | "disabled";
  services: string[];
};

const INITIAL_LOCATIONS: Location[] = [
  { id: "1", name: "MADO Tashkent — Chilanzar", district: "Chilanzar", phone: "+998 71 123 45 67", hours: "08:00 – 02:00", status: "open", services: ["Dine-in", "Takeaway", "Delivery"] },
  { id: "2", name: "MADO Tashkent — Yunusabad", district: "Yunusabad", phone: "+998 71 234 56 78", hours: "09:00 – 01:00", status: "open", services: ["Dine-in", "Takeaway"] },
  { id: "3", name: "MADO Tashkent — Mirzo Ulugbek", district: "Mirzo Ulugbek", phone: "+998 71 345 67 89", hours: "08:00 – 00:00", status: "open", services: ["Dine-in"] },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type EditingHours = { day: string; open: string; close: string }[];

export default function LocationsPage() {
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [selected, setSelected] = useState<Location | null>(null);
  const [editingHours, setEditingHours] = useState<EditingHours>(DAYS.map((d) => ({ day: d, open: "08:00", close: "02:00" })));
  const [sameHours, setSameHours] = useState(true);

  const toggle = (id: string) => {
    setLocations(locations.map((l) => l.id === id ? { ...l, status: l.status === "open" ? "disabled" : "open" } : l));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Locations</h1>
          <p className="text-sm text-muted-foreground mt-1">{locations.length} branches</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{loc.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {loc.district}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  loc.status === "open" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
                }`}>
                  {loc.status === "open" ? "● Open" : "○ Disabled"}
                </span>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-3.5 h-3.5" /> {loc.phone}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" /> {loc.hours}
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {loc.services.map((s) => (
                <span key={s} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setSelected(loc)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm border border-border rounded-lg hover:bg-muted"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => toggle(loc.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm border border-border rounded-lg hover:bg-muted"
              >
                {loc.status === "open"
                  ? <><ToggleRight className="w-3.5 h-3.5 text-emerald-500" /> Disable</>
                  : <><ToggleLeft className="w-3.5 h-3.5 text-red-500" /> Enable</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Working hours editor panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-serif font-bold text-lg">{selected.name}</h2>
              <p className="text-sm text-muted-foreground">Edit working hours</p>
            </div>
            <div className="p-6 space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={sameHours} onChange={(e) => setSameHours(e.target.checked)} className="rounded" />
                <span className="text-sm">Same hours every day</span>
              </label>
              {sameHours ? (
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Opens</label>
                    <input type="time" defaultValue="08:00" className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Closes</label>
                    <input type="time" defaultValue="02:00" className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {editingHours.map((h, i) => (
                    <div key={h.day} className="flex items-center gap-3">
                      <span className="text-sm w-24 font-medium">{h.day}</span>
                      <input type="time" value={h.open} onChange={(e) => {
                        const next = [...editingHours]; next[i] = { ...h, open: e.target.value }; setEditingHours(next);
                      }} className="px-2 py-1.5 text-sm border border-input rounded-lg bg-background focus:outline-none" />
                      <span className="text-muted-foreground">–</span>
                      <input type="time" value={h.close} onChange={(e) => {
                        const next = [...editingHours]; next[i] = { ...h, close: e.target.value }; setEditingHours(next);
                      }} className="px-2 py-1.5 text-sm border border-input rounded-lg bg-background focus:outline-none" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg">Cancel</button>
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
