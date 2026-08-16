import { useState } from "react";
import { X, Upload } from "lucide-react";

type Props = { onClose: () => void };

const LANGS = [
  { code: "ru", flag: "🇷🇺", label: "Russian" },
  { code: "uz", flag: "🇺🇿", label: "Uzbek" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "tr", flag: "🇹🇷", label: "Turkish" },
];

export default function DishForm({ onClose }: Props) {
  const [activeLang, setActiveLang] = useState("ru");
  const [status, setStatus] = useState("published");
  const [form, setForm] = useState({
    name_ru: "", desc_ru: "",
    name_uz: "", desc_uz: "",
    name_en: "", desc_en: "",
    name_tr: "", desc_tr: "",
    price: "",
    category: "",
    isNew: false,
    isSignature: false,
    isVeg: false,
    isSpicy: false,
  });

  const set = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-serif font-bold">Add Dish</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic */}
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Name (RU)</label>
                <input value={form.name_ru} onChange={(e) => set("name_ru", e.target.value)} placeholder="e.g. Адана-кебаб" className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-muted-foreground mb-1 block">Category</label>
                <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none">
                  <option value="">Select category</option>
                  <option>Breakfast</option><option>Soups</option><option>Cold Mezza</option>
                  <option>Hot Mezza</option><option>From the Grill</option><option>Specialties</option>
                  <option>Hot Drinks</option><option>Cold Drinks</option><option>Ice Cream</option>
                  <option>Turkish Desserts</option><option>Combo Sets</option>
                </select>
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Translations */}
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Translations</h3>
            <div className="flex gap-2 mb-4">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setActiveLang(l.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    activeLang === l.code ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <span>{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                <input
                  value={form[`name_${activeLang}` as keyof typeof form] as string}
                  onChange={(e) => set(`name_${activeLang}`, e.target.value)}
                  placeholder="Dish name"
                  className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                <textarea
                  rows={3}
                  value={form[`desc_${activeLang}` as keyof typeof form] as string}
                  onChange={(e) => set(`desc_${activeLang}`, e.target.value)}
                  placeholder="Short description"
                  className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Pricing */}
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Pricing</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Price</label>
                <input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="99000" className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Currency</label>
                <select className="px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none">
                  <option>UZS</option>
                </select>
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Media */}
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Media</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Properties */}
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Properties</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["isNew", "isSignature", "isVeg", "isSpicy"] as const).map((prop) => (
                <label key={prop} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form[prop]}
                    onChange={(e) => set(prop, e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm capitalize">{prop.replace("is", "")}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Status & actions */}
          <section>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Status</h3>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="hidden">Hidden</option>
              <option value="out_of_stock">Out of stock</option>
            </select>
          </section>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border flex gap-3 px-6 py-4">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80">Save Draft</button>
          <button className="flex-1 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Publish</button>
        </div>
      </div>
    </div>
  );
}
