import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, GripVertical, ChevronDown, ChevronRight, Check, X, Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { MENU_CATEGORIES } from "../../../menu/data.ts";
import type { Category } from "../../../menu/data.ts";

type LocalCategory = {
  id: string;
  label: string;
  tab: string;
  dishCount: number;
  image?: string;
};

const TAB_COLORS: Record<string, string> = {
  food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  beverage: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  dessert: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  takeaway: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const TAB_LABELS: Record<string, string> = {
  food: "FOOD",
  beverage: "BEVERAGE",
  dessert: "DESSERT",
  takeaway: "TAKEAWAY",
};

const TABS = ["all", "food", "beverage", "dessert", "takeaway"];

const initialCategories: LocalCategory[] = MENU_CATEGORIES.map((c: Category) => ({
  id: c.id,
  label: c.label,
  tab: c.tab,
  dishCount: c.dishes.length,
  image: c.image || "",
}));

const PLACEHOLDER = "https://placehold.co/400x200/e8e0d5/5c4a2a?text=Нет+фото";

/**
 * Returns true only if the string is a safe, loadable image source:
 * - absolute http/https URL
 * - data: URI (base64 from FileReader)
 * - root-relative path starting with /
 * Bare filenames like "avatar-1-123.jpg" are rejected.
 */
function isValidImageSrc(src: string | undefined | null): boolean {
  if (!src || src.trim() === "") return false;
  return (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("/")
  );
}

// ── Image upload cell ──────────────────────────────────────────────────────────
function CategoryImageCell({
  image,
  categoryId,
  onUpdate,
}: {
  image?: string;
  categoryId: string;
  onUpdate: (id: string, imageUrl: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  // Only use the stored image if it's a valid src; otherwise start with empty
  const [preview, setPreview] = useState<string>(isValidImageSrc(image) ? (image as string) : "");
  const [uploading, setUploading] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onUpdate(categoryId, result);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const currentImg = preview || PLACEHOLDER;

  return (
    <div className="shrink-0">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleChange}
      />
      <div
        className="relative w-16 h-10 rounded-lg overflow-hidden border border-border cursor-pointer group"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        title="Нажмите или перетащите фото"
      >
        <img
          src={currentImg}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
          }}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5 text-white" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<LocalCategory[]>(initialCategories);
  const [activeTab, setActiveTab] = useState("all");
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newTab, setNewTab] = useState("food");
  const [newImage, setNewImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");

  const newImageRef = useRef<HTMLInputElement>(null);

  const filtered = activeTab === "all" ? categories : categories.filter((c) => c.tab === activeTab);

  const grouped = ["food", "beverage", "dessert", "takeaway"].reduce<Record<string, LocalCategory[]>>((acc, tab) => {
    acc[tab] = categories.filter((c) => c.tab === tab);
    return acc;
  }, {});

  const handleNewImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setNewImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    setCategories([
      ...categories,
      { id: Date.now().toString(), label: newLabel, tab: newTab, dishCount: 0, image: newImage },
    ]);
    setNewLabel("");
    setNewImage("");
    setAdding(false);
  };

  const handleDelete = (id: string) => setCategories(categories.filter((c) => c.id !== id));

  const saveEdit = (id: string) => {
    setCategories(categories.map((c) => c.id === id ? { ...c, label: editLabel } : c));
    setEditingId(null);
  };

  const startEdit = (cat: LocalCategory) => {
    setEditingId(cat.id);
    setEditLabel(cat.label);
  };

  const updateImage = (id: string, imageUrl: string) => {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, image: imageUrl } : c));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Menu Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {categories.length} categories · {categories.reduce((s, c) => s + c.dishCount, 0)} dishes total
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors uppercase",
              activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {tab === "all" ? "All" : TAB_LABELS[tab]}
            <span className="ml-1.5 text-xs opacity-70">
              {tab === "all" ? categories.length : categories.filter((c) => c.tab === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* Add form */}
      {adding && (
        <div className="bg-card border border-accent/50 rounded-xl p-4 space-y-4">
          <div className="flex flex-wrap items-end gap-3">
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
              <label className="text-xs text-muted-foreground mb-1 block">Section</label>
              <select
                value={newTab}
                onChange={(e) => setNewTab(e.target.value)}
                className="px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none"
              >
                {["food", "beverage", "dessert", "takeaway"].map((t) => (
                  <option key={t} value={t}>{TAB_LABELS[t]}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Add</button>
              <button onClick={() => { setAdding(false); setNewImage(""); }} className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm">Cancel</button>
            </div>
          </div>

          {/* Photo upload for new category */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Category Photo (optional)</label>
            <input
              ref={newImageRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleNewImageFile(file);
              }}
            />
            {newImage ? (
              <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border group">
                <img src={newImage} alt="preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => setNewImage("")}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => newImageRef.current?.click()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleNewImageFile(f); }}
                onDragOver={(e) => e.preventDefault()}
                className="flex items-center gap-3 w-full max-w-xs px-4 py-3 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/40 transition-colors"
              >
                <ImageIcon className="w-5 h-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Click or drag to upload</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">PNG, JPG, WebP · max 5 MB</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category list */}
      {activeTab === "all" ? (
        <div className="space-y-4">
          {["food", "beverage", "dessert", "takeaway"].map((tab) => (
            <TabGroup
              key={tab}
              tab={tab}
              categories={grouped[tab]}
              editingId={editingId}
              editLabel={editLabel}
              setEditLabel={setEditLabel}
              onStartEdit={startEdit}
              onSaveEdit={saveEdit}
              onCancelEdit={() => setEditingId(null)}
              onDelete={handleDelete}
              onUpdateImage={updateImage}
            />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <CategoryList
            categories={filtered}
            editingId={editingId}
            editLabel={editLabel}
            setEditLabel={setEditLabel}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={() => setEditingId(null)}
            onDelete={handleDelete}
            onUpdateImage={updateImage}
          />
        </div>
      )}
    </div>
  );
}

type ListProps = {
  categories: LocalCategory[];
  editingId: string | null;
  editLabel: string;
  setEditLabel: (v: string) => void;
  onStartEdit: (cat: LocalCategory) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onUpdateImage: (id: string, url: string) => void;
};

function TabGroup({
  tab, categories, editingId, editLabel, setEditLabel, onStartEdit, onSaveEdit, onCancelEdit, onDelete, onUpdateImage,
}: { tab: string } & ListProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
      >
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded", TAB_COLORS[tab])}>{TAB_LABELS[tab]}</span>
        <span className="text-sm text-muted-foreground">{categories.length} categories</span>
      </button>
      {open && (
        <CategoryList
          categories={categories}
          editingId={editingId}
          editLabel={editLabel}
          setEditLabel={setEditLabel}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDelete={onDelete}
          onUpdateImage={onUpdateImage}
        />
      )}
    </div>
  );
}

function CategoryList({
  categories, editingId, editLabel, setEditLabel, onStartEdit, onSaveEdit, onCancelEdit, onDelete, onUpdateImage,
}: ListProps) {
  return (
    <div className="divide-y divide-border">
      {categories.map((cat) => (
        <div key={cat.id} className="flex items-center gap-3 px-4 py-3 group hover:bg-muted/30">
          <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab shrink-0" />

          {/* Image upload thumbnail */}
          <CategoryImageCell
            image={cat.image}
            categoryId={cat.id}
            onUpdate={onUpdateImage}
          />

          <div className="flex-1 min-w-0">
            {editingId === cat.id ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") onSaveEdit(cat.id); if (e.key === "Escape") onCancelEdit(); }}
                  className="px-2 py-1 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button onClick={() => onSaveEdit(cat.id)} className="p-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200"><Check className="w-3.5 h-3.5" /></button>
                <button onClick={onCancelEdit} className="p-1 rounded bg-muted text-muted-foreground"><X className="w-3.5 h-3.5" /></button>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground truncate">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.dishCount} dishes</p>
              </>
            )}
          </div>
          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded shrink-0", TAB_COLORS[cat.tab])}>{TAB_LABELS[cat.tab]}</span>
          {editingId !== cat.id && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onStartEdit(cat)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => onDelete(cat.id)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      ))}
      {categories.length === 0 && (
        <div className="text-center py-10 text-sm text-muted-foreground">No categories</div>
      )}
    </div>
  );
}
