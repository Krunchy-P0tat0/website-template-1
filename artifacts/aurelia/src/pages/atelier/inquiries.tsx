import { useEffect, useState } from "react";
import { atelierFetch } from "@/lib/atelierAuth";

interface Inquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  occasion: string;
  eventDate: string;
  guests: number;
  location: string;
  office: string;
  destinationEvent: string;
  additional: string | null;
  createdAt: string;
}

export default function AtelierInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    atelierFetch<{ inquiries: Inquiry[] }>("/inquiries")
      .then((d) => setInquiries(d.inquiries))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Submissions</p>
          <h2 className="font-serif text-2xl text-foreground/80">Client Inquiries</h2>
        </div>
        {!loading && !error && (
          <span className="text-xs text-foreground/40 tracking-widest">
            {inquiries.length} total
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

      {!loading && !error && inquiries.length === 0 && (
        <div className="bg-white border border-[#e8e5df] p-12 text-center">
          <p className="text-xs uppercase tracking-widest text-foreground/30">No inquiries yet</p>
        </div>
      )}

      {!loading && !error && inquiries.length > 0 && (
        <div className="bg-white border border-[#e8e5df] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#e8e5df] bg-[#f7f6f3]">
                  {["Name", "Email", "Service", "Occasion", "Event Date", "Guests", "Office", "Submitted"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-normal whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq, i) => (
                  <tr
                    key={inq.id}
                    className={`border-b border-[#e8e5df] last:border-0 hover:bg-[#f7f6f3] transition-colors ${i % 2 === 0 ? "" : "bg-[#fbfaf8]"}`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground/80">
                      {inq.firstName} {inq.lastName}
                    </td>
                    <td className="px-4 py-3 text-foreground/60">
                      <a href={`mailto:${inq.email}`} className="hover:text-foreground transition-colors">
                        {inq.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">{inq.service}</td>
                    <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">{inq.occasion}</td>
                    <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">{inq.eventDate}</td>
                    <td className="px-4 py-3 text-foreground/60 text-center">{inq.guests}</td>
                    <td className="px-4 py-3 text-foreground/60 whitespace-nowrap">{inq.office}</td>
                    <td className="px-4 py-3 text-foreground/40 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString("en-US", {
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
