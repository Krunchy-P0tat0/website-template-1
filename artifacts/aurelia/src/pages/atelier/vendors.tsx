import { useEffect, useState, useCallback } from "react";
import { RotateCcw, Download } from "lucide-react";
import { atelierFetch } from "@/lib/atelierAuth";

interface Vendor {
  id: number;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  category: string;
  regions: string;
  bio: string;
  portfolioUrl: string | null;
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

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-1">{label}</p>
      <p className="text-foreground/70">{value}</p>
    </div>
  );
}

export default function AtelierVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const fetchVendors = useCallback(() => {
    setLoading(true);
    setError(false);
    atelierFetch<{ vendors: Vendor[] }>("/vendors")
      .then((d) => setVendors(d.vendors))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchVendors(); }, [fetchVendors]);

  function handleExport() {
    downloadCsv(
      `vendor-applications-${new Date().toISOString().slice(0, 10)}.csv`,
      vendors.map((v) => ({
        id: v.id,
        businessName: v.businessName,
        contactName: v.contactName,
        email: v.email,
        phone: v.phone ?? "",
        category: v.category,
        regions: v.regions,
        website: v.website ?? "",
        instagram: v.instagram ?? "",
        portfolioUrl: v.portfolioUrl ?? "",
        bio: v.bio,
        createdAt: v.createdAt,
      })),
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Applications</p>
          <h2 className="font-serif text-2xl text-foreground/80">Vendor Applications</h2>
        </div>
        <div className="flex items-center gap-3">
          {!loading && !error && vendors.length > 0 && (
            <span className="text-xs text-foreground/40 tracking-widest">
              {vendors.length} {vendors.length === 1 ? "application" : "applications"}
            </span>
          )}
          {!loading && !error && vendors.length > 0 && (
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
          <p className="font-serif text-xl text-foreground/40 mb-2">Unable to retrieve applications</p>
          <p className="text-xs text-foreground/30 leading-relaxed max-w-xs mx-auto mb-8">
            Something prevented the data from loading. Please try again.
          </p>
          <button
            onClick={fetchVendors}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#e8e5df] px-4 py-2.5 text-foreground/40 hover:border-foreground/20 hover:text-foreground/70 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Try again
          </button>
        </div>
      )}

      {!loading && !error && vendors.length === 0 && (
        <div className="bg-white border border-[#e8e5df] p-16 text-center">
          <Ornament />
          <p className="font-serif text-xl text-foreground/40 mb-2">No applications received</p>
          <p className="text-xs text-foreground/30 leading-relaxed max-w-xs mx-auto">
            Vendor submissions from the partner application form will appear here once received.
          </p>
        </div>
      )}

      {!loading && !error && vendors.length > 0 && (
        <div className="flex flex-col gap-2">
          {vendors.map((v) => (
            <div key={v.id} className="bg-white border border-[#e8e5df]">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-[#f7f6f3] transition-colors"
                onClick={() => setExpanded(expanded === v.id ? null : v.id)}
              >
                <div className="flex items-center gap-6 min-w-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground/80 truncate">{v.businessName}</p>
                    <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-0.5">{v.category}</p>
                  </div>
                  <span className="hidden sm:block text-xs text-foreground/40 truncate">{v.regions}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden md:block text-[10px] text-foreground/30">
                    {new Date(v.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="text-foreground/30 text-xs">{expanded === v.id ? "▲" : "▼"}</span>
                </div>
              </button>
              {expanded === v.id && (
                <div className="px-6 pb-6 border-t border-[#e8e5df] pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                  <Field label="Contact" value={v.contactName} />
                  <Field label="Email" value={<a href={`mailto:${v.email}`} className="hover:underline">{v.email}</a>} />
                  {v.phone && <Field label="Phone" value={v.phone} />}
                  {v.website && <Field label="Website" value={<a href={v.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block">{v.website}</a>} />}
                  {v.instagram && <Field label="Instagram" value={v.instagram} />}
                  {v.portfolioUrl && <Field label="Portfolio" value={<a href={v.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block">{v.portfolioUrl}</a>} />}
                  <div className="md:col-span-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-1.5">Bio</p>
                    <p className="text-foreground/60 leading-relaxed whitespace-pre-wrap">{v.bio}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
