import { useEffect, useState } from "react";
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

export default function AtelierVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    atelierFetch<{ vendors: Vendor[] }>("/vendors")
      .then((d) => setVendors(d.vendors))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Applications</p>
          <h2 className="font-serif text-2xl text-foreground/80">Vendor Applications</h2>
        </div>
        {!loading && !error && (
          <span className="text-xs text-foreground/40 tracking-widest">{vendors.length} total</span>
        )}
      </div>

      {loading && (
        <div className="bg-white border border-[#e8e5df] p-12 text-center">
          <p className="text-xs uppercase tracking-widest text-foreground/30">Loading…</p>
        </div>
      )}

      {error && (
        <div className="bg-white border border-red-200 p-6">
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}

      {!loading && !error && vendors.length === 0 && (
        <div className="bg-white border border-[#e8e5df] p-12 text-center">
          <p className="text-xs uppercase tracking-widest text-foreground/30">No applications yet</p>
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
                  {v.website && (
                    <Field label="Website" value={
                      <a href={v.website} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block">
                        {v.website}
                      </a>
                    } />
                  )}
                  {v.instagram && <Field label="Instagram" value={v.instagram} />}
                  {v.portfolioUrl && (
                    <Field label="Portfolio" value={
                      <a href={v.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block">
                        {v.portfolioUrl}
                      </a>
                    } />
                  )}
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

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 mb-1">{label}</p>
      <p className="text-foreground/70">{value}</p>
    </div>
  );
}
