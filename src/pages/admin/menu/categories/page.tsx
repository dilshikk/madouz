import { useState } from "react";
import { Plus, Edit2, Trash2, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type Category = {
  id: string;
  label: string;
  tab: string;
  dishCount: number;
};

const INITIAL_CATEGORIES: Category[] = [
  { id: "breakfast", label: "Breakfast", tab: "FOOD", dishCount: 4 },
  { id: "soup", label: "Soups", tab: "FOOD", dishCount: 3 },
  { id: "cold-mezza", label: "Cold Mezza", tab: "FOOD", dishCount: 2 },
  { id: "hot-mezza", label: "Hot Mezza", tab: "FOOD", dishCount: 3 },
  { id: "grill", label: "From the Grill", tab: "FOOD", dishCount: 3 },
  { id: "specialties", label: "Specialties", tab: "FOOD", dishCount: 4 },
  { id: "pizza", label: "Sourdough Pizza", tab: "FOOD", dishCount: 3 },
  { id: "burgers", label: "Burger & Durum", tab: "FOOD", dishCount: 3 },
  { id: "hot-drinks", label: "Hot Drinks", tab: "BEVERAGE", dishCount: 3 },
  { id: "cold-drinks", label: "Cold Drinks", tab: "BEVERAGE", dishCount: 3 },
  { id: "ice-cream", label: "Ice Cream", tab: "DESSERT", dishCount: 2 },
  { id: "turkish-dessert", label: "Turkish Desserts", tab: "DESSERT", dishCount: 3 },
  { id: "combos", label: "Combo Sets", tab: "TAKEAWAY", dishCount: 3 },
];

const TAB_COLORS: Record<string, string> = {
  FOOD: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  BEVERAGE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  DESSERT: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  TAKEAWAY: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const TABS = ["ALL", "FOOD", "BEVERAGE", "DESSERT", "TAKEAWAY"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [activeTab, setActiveTab] = useState("ALL");
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newTab, setNewTab] = useState("FOOD");

  const filtered = activeTab === "ALL" ? categories : categories.filter((c) => c.tab === activeTab);

  const grouped = TABS.slice(1).reduce<Record<string, Category[]>>((acc, tab) => {
    acc[tab] = categories.filter((c) => c.tab === tab);
    return acc;
  }, {});

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    setCategories([
      ...categories,
      { id: newLabel.toLowerCase().replace(/\s+/g, "-"), label: newLabel, tab: newTab, dishCount: 0 },
    ]);
    setNewLabel("");
    setAdding(false);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">{categories.length} categories total</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Tabs filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add form */}
      {adding && (
        <div className="bg-card border border-border rounded-xl p-4 flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="text-xs text-muted-foreground mb-1 block">Category Name</label>
            <input
              autoFocus
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="e.g. Salads"
              className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Tab</label>
            <select
              value={newTab}
              onChange={(e) => setNewTab(e.target.value)}
              className="px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none"
            >
              {TABS.slice(1).map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Add</button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Category tree */}
      {activeTab === "ALL" ? (
        <div className="space-y-4">
          {TABS.slice(1).map((tab) => (
            <TabGroup key={tab} tab={tab} categories={grouped[tab]} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <CategoryList categories={filtered} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}

function TabGroup({ tab, categories, onDelete }: { tab: string; categories: Category[]; onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(true);
  const colors = TAB_COLORS[tab];
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
      >
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded", colors)}>{tab}</span>
        <span className="text-sm text-muted-foreground">{categories.length} categories</span>
      </button>
      {open && <CategoryList categories={categories} onDelete={onDelete} />}
    </div>
  );
}

function CategoryList({ categories, onDelete }: { categories: Category[]; onDelete: (id: string) => void }) {
  return (
    <div className="divide-y divide-border">
      {categories.map((cat) => (
        <div key={cat.id} className="flex items-center gap-3 px-4 py-3 group hover:bg-muted/30">
          <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{cat.label}</p>
            <p className="text-xs text-muted-foreground">{cat.dishCount} dishes</p>
          </div>
          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded", TAB_COLORS[cat.tab])}>{cat.tab}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(cat.id)}
              className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
