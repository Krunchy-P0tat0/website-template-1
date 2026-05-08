import { useEffect, useState } from "react";
import { atelierFetch } from "@/lib/atelierAuth";

interface Subscriber {
  id: number;
  email: string;
  source: string | null;
  createdAt: string;
}

export default function AtelierNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    atelierFetch<{ subscribers: Subscriber[] }>("/newsletter")
      .then((d) => setSubscribers(d.subscribers))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Subscribers</p>
          <h2 className="font-serif text-2xl text-foreground/80">Newsletter</h2>
        </div>
        {!loading && !error && (
          <span className="text-xs text-foreground/40 tracking-widest">
            {subscribers.length.toLocaleString()} subscribers
          </span>
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

      {!loading && !error && subscribers.length === 0 && (
        <div className="bg-white border border-[#e8e5df] p-12 text-center">
          <p className="text-xs uppercase tracking-widest text-foreground/30">No subscribers yet</p>
        </div>
      )}

      {!loading && !error && subscribers.length > 0 && (
        <div className="bg-white border border-[#e8e5df] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#e8e5df] bg-[#f7f6f3]">
                  {["Email", "Source", "Subscribed"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub, i) => (
                  <tr
                    key={sub.id}
                    className={`border-b border-[#e8e5df] last:border-0 hover:bg-[#f7f6f3] transition-colors ${i % 2 === 0 ? "" : "bg-[#fbfaf8]"}`}
                  >
                    <td className="px-4 py-3 text-foreground/80">
                      <a href={`mailto:${sub.email}`} className="hover:text-foreground transition-colors">
                        {sub.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-foreground/40 capitalize">{sub.source ?? "—"}</td>
                    <td className="px-4 py-3 text-foreground/40">
                      {new Date(sub.createdAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
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
