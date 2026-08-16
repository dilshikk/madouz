import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Filter, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import DishForm from "../../_components/dish-form.tsx";

type DishStatus = "published" | "draft" | "hidden" | "out_of_stock" | "archived";

type Dish = {
  id: string;
  name: string;
  category: string;
  tab: string;
  price: string;
  status: DishStatus;
  isNew?: boolean;
  isSignature?: boolean;
  isVeg?: boolean;
  image: string;
};

const STATUS_META: Record<DishStatus, { label: string; color: string }> = {
  published: { label: "Published", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400" },
  draft: { label: "Draft", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400" },
  hidden: { label: "Hidden", color: "text-gray-500 bg-gray-100 dark:bg-gray-800" },
  out_of_stock: { label: "Out of stock", color: "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400" },
  archived: { label: "Archived", color: "text-red-500 bg-red-50 dark:bg-red-950 dark:text-red-400" },
};

const SAMPLE_DISHES: Dish[] = [
  { id: "1", name: "MADO Breakfast", category: "Breakfast", tab: "FOOD", price: "69,000 UZS", status: "published", isSignature: true, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=80&q=60" },
  { id: "2", name: "Menemen", category: "Breakfast", tab: "FOOD", price: "45,000 UZS", status: "published", isNew: true, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=80&q=60" },
  { id: "3", name: "Adana Kebab", category: "From the Grill", tab: "FOOD", price: "79,000 UZS", status: "published", isSignature: true, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=80&q=60" },
  { id: "4", name: "Pistachio Kebab", category: "Specialties", tab: "FOOD", price: "95,000 UZS", status: "published", isSignature: true, isNew: true, image: "https://images.unsplash.com/photo-1558030137-a56c1b002c72?w=80&q=60" },
  { id: "5", name: "Hummus Classic", category: "Cold Mezza", tab: "FOOD", price: "35,000 UZS", status: "published", isVeg: true, image: "https://images.unsplash.com/photo-1554998171-89445e31c52b?w=80&q=60" },
  { id: "6", name: "Turkish Tea", category: "Hot Drinks", tab: "BEVERAGE", price: "18,000 UZS", status: "published", isSignature: true, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=80&q=60" },
  { id: "7", name: "Baklava Pistachio", category: "Turkish Desserts", tab: "DESSERT", price: "35,000 UZS", status: "published", isSignature: true, image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=80&q=60" },
  { id: "8", name: "Dondurma", category: "Ice Cream", tab: "DESSERT", price: "28,000 UZS", status: "out_of_stock", isSignature: true, image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=80&q=60" },
  { id: "9", name: "New Dessert", category: "Turkish Desserts", tab: "DESSERT", price: "40,000 UZS", status: "draft", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=80&q=60" },
];

export default function DishesPage() {
  const [dishes, setDishes] = useState<Dish[]>(SAMPLE_DISHES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | DishStatus>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);

  const filtered = dishes.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((d) => d.id)));
  };

  const handleDelete = (id: string) => setDishes(dishes.filter((d) => d.id !== id));

  const handleBulkAction = (action: string) => {
    if (action === "delete") setDishes(dishes.filter((d) => !selected.has(d.id)));
    else setDishes(dishes.map((d) => selected.has(d.id) ? { ...d, status: action as DishStatus } : d));
    setSelected(new Set());
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Dishes</h1>
          <p className="text-sm text-muted-foreground mt-1">{dishes.length} dishes total</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Add Dish
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | DishStatus)}
            className="px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none"
          >
            <option value="all">All statuses</option>
            {(Object.keys(STATUS_META) as DishStatus[]).map((s) => (
              <option key={s} value={s}>{STATUS_META[s].label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <div className="flex gap-2 ml-auto">
            {(["published", "hidden", "draft"] as DishStatus[]).map((s) => (
              <button key={s} onClick={() => handleBulkAction(s)} className="px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-lg hover:bg-muted">
                Set {STATUS_META[s].label}
              </button>
            ))}
            <button onClick={() => handleBulkAction("delete")} className="px-3 py-1.5 text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/20">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">
                <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dish</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Price</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((dish) => (
              <tr key={dish.id} className={cn("group hover:bg-muted/30", selected.has(dish.id) && "bg-accent/5")}>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.has(dish.id)} onChange={() => toggleSelect(dish.id)} className="rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={dish.image} alt={dish.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{dish.name}</p>
                      <div className="flex gap-1 mt-0.5">
                        {dish.isSignature && <span className="text-[10px] bg-accent/20 text-accent-foreground px-1.5 rounded">Signature</span>}
                        {dish.isNew && <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 rounded">New</span>}
                        {dish.isVeg && <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 rounded">Veg</span>}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-sm text-muted-foreground">{dish.category}</span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-sm font-medium">{dish.price}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", STATUS_META[dish.status].color)}>
                    {STATUS_META[dish.status].label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                    <button className="p-1.5 rounded hover:bg-muted"><Edit2 className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button onClick={() => handleDelete(dish.id)} className="p-1.5 rounded hover:bg-destructive/10">
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No dishes found</p>
          </div>
        )}
      </div>

      {/* Dish form modal */}
      {showForm && <DishForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
