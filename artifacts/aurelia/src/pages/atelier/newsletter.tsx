import { useEffect, useState, useCallback } from "react";
import { RotateCcw, Download } from "lucide-react";
import { atelierFetch } from "@/lib/atelierAuth";

interface Subscriber {
  id: number;
  email: string;
  source: string | null;
  createdAt: string;
}

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    const s = String(v ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <span className="flex-1 h-px bg-[#e8e5df] max-w-[60px]" />
      <span className="text-[#d4cfc8] text-sm">◇</span>
      <span className="flex-1 h-px bg-[#e8e5df] max-w-[60px]" />
    </div>
  );
}

export default function AtelierNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSubscribers = useCallback(() => {
    setLoading(true);
    setError(false);
    atelierFetch<{ subscribers: Subscriber[] }>("/newsletter")
      .then((d) => setSubscribers(d.subscribers))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  function handleExport() {
    downloadCsv(
      `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`,
      subscribers.map((s) => ({ id: s.id, email: s.email, source: s.source ?? "", createdAt: s.createdAt })),
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Subscribers</p>
          <h2 className="font-serif text-2xl text-foreground/80">Newsletter</h2>
        </div>
        <div className="flex items-center gap-3">
          {!loading && !error && subscribers.length > 0 && (
            <span className="text-xs text-foreground/40 tracking-widest">
              {subscribers.length.toLocaleString()} {subscribers.length === 1 ? "subscriber" : "subscribers"}
            </span>
          )}
          {!loading && !error && subscribers.length > 0 && (
            <button
              onClick={handleExport}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#e8e5df] px-3 py-2 text-foreground/50 hover:border-foreground/30 hover:text-foreground/80 transition-colors rounded"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="bg-white border border-[#e8e5df] p-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/25">Loading…</p>
        </div>
      )}

      {!loading && error && (
        <div className="bg-white border border-[#e8e5df] p-16 text-center">
          <Ornament />
          <p className="font-serif text-xl text-foreground/40 mb-2">Unable to retrieve subscribers</p>
          <p className="text-xs text-foreground/30 leading-relaxed max-w-xs mx-auto mb-8">
            Something prevented the data from loading. Please try again.
          </p>
          <button
            onClick={fetchSubscribers}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#e8e5df] px-4 py-2.5 text-foreground/40 hover:border-foreground/20 hover:text-foreground/70 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Try again
          </button>
        </div>
      )}

      {!loading && !error && subscribers.length === 0 && (
        <div className="bg-white border border-[#e8e5df] p-16 text-center">
          <Ornament />
          <p className="font-serif text-xl text-foreground/40 mb-2">No subscribers yet</p>
          <p className="text-xs text-foreground/30 leading-relaxed max-w-xs mx-auto">
            Newsletter sign-ups from the public site will appear here once received.
          </p>
        </div>
      )}

      {!loading && !error && subscribers.length > 0 && (
        <div className="bg-white border border-[#e8e5df] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#e8e5df] bg-[#f7f6f3]">
                  {["Email", "Source", "Subscribed"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub, i) => (
                  <tr key={sub.id} className={`border-b border-[#e8e5df] last:border-0 hover:bg-[#f7f6f3] transition-colors ${i % 2 === 0 ? "" : "bg-[#fbfaf8]"}`}>
                    <td className="px-4 py-3 text-foreground/80">
                      <a href={`mailto:${sub.email}`} className="hover:text-foreground transition-colors">{sub.email}</a>
                    </td>
                    <td className="px-4 py-3 text-foreground/40 capitalize">{sub.source ?? "—"}</td>
                    <td className="px-4 py-3 text-foreground/40">
                      {new Date(sub.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
