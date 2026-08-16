import { useState } from "react";
import { Save } from "lucide-react";

const TABS = ["General", "Contact", "Social", "Restaurant"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-serif font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage site configuration</p>
      </div>

      <div className="flex gap-2 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        {activeTab === "General" && (
          <>
            <Field label="Site Name" defaultValue="MADO UZ" />
            <Field label="Default Language" type="select" options={["Russian", "Uzbek", "English", "Turkish"]} />
            <Field label="Timezone" type="select" options={["Asia/Tashkent (UTC+5)", "Europe/Moscow (UTC+3)"]} />
          </>
        )}
        {activeTab === "Contact" && (
          <>
            <Field label="Phone" defaultValue="+998 71 123 45 67" />
            <Field label="Email" defaultValue="hello@madouz.uz" />
            <Field label="WhatsApp" defaultValue="+998 90 000 00 00" />
            <Field label="Address" defaultValue="Tashkent, Uzbekistan" />
          </>
        )}
        {activeTab === "Social" && (
          <>
            <Field label="Instagram" defaultValue="@mado.uz" />
            <Field label="Telegram" defaultValue="@madouz" />
            <Field label="Facebook" defaultValue="" />
            <Field label="YouTube" defaultValue="" />
          </>
        )}
        {activeTab === "Restaurant" && (
          <>
            <Field label="Currency" type="select" options={["UZS", "USD", "EUR"]} />
            <Field label="Min. Reservation Guests" defaultValue="2" />
            <Field label="Max. Reservation Guests" defaultValue="20" />
          </>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue = "",
  type = "text",
  options = [],
}: {
  label: string;
  defaultValue?: string;
  type?: "text" | "select";
  options?: string[];
}) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
      {type === "select" ? (
        <select defaultValue={options[0]} className="w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring">
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input defaultValue={defaultValue} className="w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
      )}
    </div>
  );
}
