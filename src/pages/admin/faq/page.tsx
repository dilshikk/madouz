import { useState } from "react";
import { Plus, Edit2, Trash2, GripVertical, Check, X } from "lucide-react";

type FaqItem = { id: string; question: string; answer: string };

const INITIAL: FaqItem[] = [
  { id: "1", question: "What types of events do you cater?", answer: "We cater all types of events including corporate events, weddings, birthdays, conferences, and private parties." },
  { id: "2", question: "Can you handle dietary requirements?", answer: "Yes, we offer vegetarian, vegan, halal, and gluten-free options. Please specify your requirements when submitting the form." },
  { id: "3", question: "Do you provide event setup?", answer: "Yes, our team handles full setup and breakdown including tables, linens, and serving equipment." },
  { id: "4", question: "What is the minimum guest count for catering?", answer: "Our minimum is 20 guests for full catering service. For smaller events, please contact us for custom options." },
  { id: "5", question: "How far in advance should I book?", answer: "We recommend booking at least 2 weeks in advance. For large events (100+ guests), please book 4-6 weeks ahead." },
];

export default function FaqPage() {
  const [items, setItems] = useState(INITIAL);
  const [editing, setEditing] = useState<string | null>(null);
  const [editQ, setEditQ] = useState("");
  const [editA, setEditA] = useState("");
  const [adding, setAdding] = useState(false);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  const startEdit = (item: FaqItem) => {
    setEditing(item.id); setEditQ(item.question); setEditA(item.answer);
  };

  const saveEdit = (id: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, question: editQ, answer: editA } : i));
    setEditing(null);
  };

  const handleAdd = () => {
    if (!newQ.trim()) return;
    setItems([...items, { id: Date.now().toString(), question: newQ, answer: newA }]);
    setNewQ(""); setNewA(""); setAdding(false);
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">FAQ</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} questions</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      {adding && (
        <div className="bg-card border border-accent/50 rounded-xl p-4 space-y-3">
          <input
            autoFocus
            value={newQ}
            onChange={(e) => setNewQ(e.target.value)}
            placeholder="Question"
            className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            rows={3}
            value={newA}
            onChange={(e) => setNewA(e.target.value)}
            placeholder="Answer"
            className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Add</button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="group bg-card border border-border rounded-xl overflow-hidden">
            {editing === item.id ? (
              <div className="p-4 space-y-3">
                <input
                  value={editQ}
                  onChange={(e) => setEditQ(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <textarea
                  rows={3}
                  value={editA}
                  onChange={(e) => setEditA(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(item.id)} className="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200"><Check className="w-4 h-4" /></button>
                  <button onClick={() => setEditing(null)} className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 px-4 py-4">
                <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-0.5 cursor-grab shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.question}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => startEdit(item)} className="p-1.5 rounded hover:bg-muted">
                    <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => setItems(items.filter((i) => i.id !== item.id))} className="p-1.5 rounded hover:bg-destructive/10">
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
