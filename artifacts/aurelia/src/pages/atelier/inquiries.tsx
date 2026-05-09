import { useEffect, useState, useMemo, useCallback } from "react";
import { Search, X, ChevronRight, Trash2, Plus, RotateCcw } from "lucide-react";
import { atelierFetch } from "@/lib/atelierAuth";

// ── Types ─────────────────────────────────────────────────────────────────────

type InquiryStatus = "new" | "contacted" | "consultation_scheduled" | "closed";

interface Note {
  id: string;
  text: string;
  createdAt: string;
}

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
  venue: string | null;
  office: string;
  destinationEvent: string;
  destinationServices: string;
  additional: string | null;
  hearAboutUs: string | null;
  status: InquiryStatus;
  notes: string | null;
  createdAt: string;
}

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<InquiryStatus, { label: string; badge: string; dot: string; btn: string }> = {
  new: {
    label: "New",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
    btn: "border-sky-300 bg-sky-50 text-sky-700",
  },
  contacted: {
    label: "Contacted",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    btn: "border-amber-300 bg-amber-50 text-amber-700",
  },
  consultation_scheduled: {
    label: "Consultation Scheduled",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    btn: "border-emerald-300 bg-emerald-50 text-emerald-700",
  },
  closed: {
    label: "Closed",
    badge: "bg-slate-100 text-slate-500 border-slate-200",
    dot: "bg-slate-400",
    btn: "border-slate-300 bg-slate-100 text-slate-500",
  },
};

const STATUSES: InquiryStatus[] = ["new", "contacted", "consultation_scheduled", "closed"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseNotes(raw: string | null): Note[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Note[];
  } catch {
    return [];
  }
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] border rounded-full whitespace-nowrap font-medium ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/35 pb-2 border-b border-[#f0ede8] mb-3">
      {children}
    </p>
  );
}

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-foreground/35 mb-0.5">{label}</dt>
      <dd className="text-sm text-foreground/75 leading-relaxed">{String(value)}</dd>
    </div>
  );
}

// ── Empty / Error states ──────────────────────────────────────────────────────

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <span className="flex-1 h-px bg-[#e8e5df] max-w-[60px]" />
      <span className="text-[#d4cfc8] text-sm">◇</span>
      <span className="flex-1 h-px bg-[#e8e5df] max-w-[60px]" />
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white border border-[#e8e5df] p-16 text-center">
      <Ornament />
      <p className="font-serif text-xl text-foreground/40 mb-2">{title}</p>
      <p className="text-xs text-foreground/30 leading-relaxed max-w-xs mx-auto">{description}</p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-white border border-[#e8e5df] p-16 text-center">
      <Ornament />
      <p className="font-serif text-xl text-foreground/40 mb-2">Unable to retrieve inquiries</p>
      <p className="text-xs text-foreground/30 leading-relaxed max-w-xs mx-auto mb-8">
        Something prevented the data from loading. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#e8e5df] px-4 py-2.5 text-foreground/40 hover:border-foreground/20 hover:text-foreground/70 transition-colors"
      >
        <RotateCcw className="w-3 h-3" />
        Try again
      </button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white border border-[#e8e5df] p-16 text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/25">Loading…</p>
    </div>
  );
}

// ── Detail panel ──────────────────────────────────────────────────────────────

function InquiryDetail({
  inquiry: initial,
  onClose,
  onUpdate,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onUpdate: (inq: Inquiry) => void;
}) {
  const [inquiry, setInquiry] = useState(initial);
  const [noteText, setNoteText] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  const notes = parseNotes(inquiry.notes);

  async function patchInquiry(body: { status?: InquiryStatus; notes?: string }) {
    const updated = await atelierFetch<{ inquiry: Inquiry }>(`/inquiries/${inquiry.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    setInquiry(updated.inquiry);
    onUpdate(updated.inquiry);
    return updated.inquiry;
  }

  async function handleStatusChange(status: InquiryStatus) {
    if (status === inquiry.status || savingStatus) return;
    setSavingStatus(true);
    try {
      await patchInquiry({ status });
    } catch { /* noop */ } finally {
      setSavingStatus(false);
    }
  }

  async function handleAddNote() {
    const text = noteText.trim();
    if (!text || savingNote) return;
    setSavingNote(true);
    const newNote: Note = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };
    try {
      await patchInquiry({ notes: JSON.stringify([...notes, newNote]) });
      setNoteText("");
    } catch { /* noop */ } finally {
      setSavingNote(false);
    }
  }

  async function handleDeleteNote(noteId: string) {
    try {
      await patchInquiry({ notes: JSON.stringify(notes.filter((n) => n.id !== noteId)) });
    } catch { /* noop */ }
  }

  const yesNo = (v: string) => (v === "yes" ? "Yes" : "No");

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[520px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#e8e5df] shrink-0">
          <div className="min-w-0 pr-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/35 mb-1">
              Inquiry #{inquiry.id} &mdash;{" "}
              {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h2 className="font-serif text-xl text-foreground/80 truncate">
              {inquiry.firstName} {inquiry.lastName}
            </h2>
            <div className="mt-2">
              <StatusBadge status={inquiry.status ?? "new"} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-foreground/30 hover:text-foreground/70 transition-colors p-1 shrink-0 mt-0.5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Client */}
          <section>
            <SectionLabel>Client</SectionLabel>
            <dl className="grid grid-cols-1 gap-3">
              <Field label="Email" value={inquiry.email} />
              <Field label="Phone" value={inquiry.phone} />
            </dl>
            <div className="flex gap-3 mt-3">
              <a
                href={`mailto:${inquiry.email}`}
                className="flex-1 text-center text-[10px] uppercase tracking-widest border border-[#e8e5df] py-2 text-foreground/50 hover:border-foreground/20 hover:text-foreground/80 transition-colors"
              >
                Send Email
              </a>
              <a
                href={`tel:${inquiry.phone}`}
                className="flex-1 text-center text-[10px] uppercase tracking-widest border border-[#e8e5df] py-2 text-foreground/50 hover:border-foreground/20 hover:text-foreground/80 transition-colors"
              >
                Call
              </a>
            </div>
          </section>

          {/* Event */}
          <section>
            <SectionLabel>Event Details</SectionLabel>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="Service" value={inquiry.service} />
              <Field label="Occasion" value={inquiry.occasion} />
              <Field label="Event Date" value={inquiry.eventDate} />
              <Field label="Guests" value={inquiry.guests} />
              <Field label="Location" value={inquiry.location} />
              <Field label="Preferred Office" value={inquiry.office} />
              <Field label="Venue" value={inquiry.venue} />
              <Field label="Destination Event" value={yesNo(inquiry.destinationEvent)} />
              <Field label="Destination Services" value={yesNo(inquiry.destinationServices)} />
            </dl>
          </section>

          {/* Additional */}
          {(inquiry.hearAboutUs || inquiry.additional) && (
            <section>
              <SectionLabel>Additional</SectionLabel>
              <dl className="grid grid-cols-1 gap-3">
                <Field label="How they found us" value={inquiry.hearAboutUs} />
                {inquiry.additional && (
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-foreground/35 mb-1">
                      Notes from client
                    </dt>
                    <dd className="text-sm text-foreground/70 bg-[#f7f6f3] border border-[#ede9e3] px-3 py-2.5 rounded leading-relaxed">
                      {inquiry.additional}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          {/* Status */}
          <section>
            <SectionLabel>Status</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => {
                const cfg = STATUS_CONFIG[s];
                const active = (inquiry.status ?? "new") === s;
                return (
                  <button
                    key={s}
                    disabled={savingStatus}
                    onClick={() => handleStatusChange(s)}
                    className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border rounded-full transition-all duration-150
                      ${active
                        ? cfg.btn + " font-semibold ring-1 ring-offset-1 ring-current/20"
                        : "bg-white text-foreground/40 border-[#e8e5df] hover:border-foreground/20 hover:text-foreground/60"
                      } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Notes */}
          <section>
            <SectionLabel>Internal Notes</SectionLabel>

            {notes.length > 0 ? (
              <div className="space-y-2 mb-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex gap-3 items-start bg-[#f7f6f3] border border-[#ede9e3] px-3 py-2.5 rounded group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground/75 leading-relaxed whitespace-pre-wrap">
                        {note.text}
                      </p>
                      <p className="text-[10px] text-foreground/30 mt-1.5">
                        {new Date(note.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        &middot;{" "}
                        {new Date(note.createdAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-foreground/20 hover:text-red-400 transition-colors shrink-0 opacity-0 group-hover:opacity-100 mt-0.5"
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-foreground/30 italic mb-3">No notes yet.</p>
            )}

            <div className="flex gap-2 items-end">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add an internal note… (Cmd+Enter to save)"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleAddNote();
                  }
                }}
                className="flex-1 text-sm border border-[#e8e5df] bg-white px-3 py-2 rounded resize-none focus:outline-none focus:border-foreground/30 placeholder:text-foreground/25 transition-colors"
              />
              <button
                onClick={handleAddNote}
                disabled={savingNote || !noteText.trim()}
                className="h-9 w-9 flex items-center justify-center bg-[#0f0e0c] text-white rounded disabled:opacity-30 hover:bg-[#0f0e0c]/80 transition-colors shrink-0"
                aria-label="Add note"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AtelierInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const fetchInquiries = useCallback(() => {
    setLoading(true);
    setError(false);
    atelierFetch<{ inquiries: Inquiry[] }>("/inquiries")
      .then((d) => setInquiries(d.inquiries))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const services = useMemo(() => {
    return Array.from(new Set(inquiries.map((i) => i.service))).sort();
  }, [inquiries]);

  const filtered = useMemo(() => {
    let list = [...inquiries];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          `${i.firstName} ${i.lastName}`.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          i.phone.toLowerCase().includes(q),
      );
    }
    if (serviceFilter !== "all") list = list.filter((i) => i.service === serviceFilter);
    if (statusFilter !== "all") list = list.filter((i) => (i.status ?? "new") === statusFilter);
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }, [inquiries, search, serviceFilter, statusFilter]);

  function handleUpdate(updated: Inquiry) {
    setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setSelected(updated);
  }

  const controlSelect =
    "text-xs border border-[#e8e5df] bg-white px-3 py-2 text-foreground/60 focus:outline-none focus:border-foreground/30 rounded transition-colors";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 mb-1">Submissions</p>
          <h2 className="font-serif text-2xl text-foreground/80">Client Inquiries</h2>
        </div>
        {!loading && !error && inquiries.length > 0 && (
          <span className="text-xs text-foreground/40 tracking-widest">
            {filtered.length !== inquiries.length
              ? `${filtered.length} of ${inquiries.length}`
              : `${inquiries.length} total`}
          </span>
        )}
      </div>

      {/* Controls */}
      {!loading && !error && inquiries.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/30 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or phone…"
              className="w-full pl-9 pr-8 py-2 text-xs border border-[#e8e5df] bg-white focus:outline-none focus:border-foreground/30 rounded text-foreground/70 placeholder:text-foreground/30 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className={controlSelect}>
            <option value="all">All Services</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={controlSelect}>
            <option value="all">All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
          </select>
          {(search || serviceFilter !== "all" || statusFilter !== "all") && (
            <button
              onClick={() => { setSearch(""); setServiceFilter("all"); setStatusFilter("all"); }}
              className="text-[10px] uppercase tracking-widest text-foreground/40 hover:text-foreground/70 border border-[#e8e5df] px-3 py-2 rounded transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* States */}
      {loading && <LoadingState />}
      {!loading && error && <ErrorState onRetry={fetchInquiries} />}
      {!loading && !error && inquiries.length === 0 && (
        <EmptyState
          title="No inquiries on record"
          description="Client submissions from the public site will appear here once received."
        />
      )}
      {!loading && !error && filtered.length === 0 && inquiries.length > 0 && (
        <div className="bg-white border border-[#e8e5df] p-12 text-center">
          <p className="font-serif text-lg text-foreground/40 mb-2">No matching results</p>
          <p className="text-xs text-foreground/30 mb-6">Try adjusting your search or filters.</p>
          <button
            onClick={() => { setSearch(""); setServiceFilter("all"); setStatusFilter("all"); }}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest border border-[#e8e5df] px-4 py-2 text-foreground/40 hover:border-foreground/20 hover:text-foreground/70 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && filtered.length > 0 && (
        <div className="bg-white border border-[#e8e5df] overflow-hidden rounded">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#e8e5df] bg-[#f7f6f3]">
                  {["Name", "Email", "Phone", "Service", "Event Date", "Guests", "Location", "Status", "Submitted", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-normal whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelected(inq)}
                    className="border-b border-[#e8e5df] last:border-0 hover:bg-[#f7f6f3] transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-foreground/80">
                      {inq.firstName} {inq.lastName}
                    </td>
                    <td className="px-4 py-3 text-foreground/55 max-w-[200px] truncate">{inq.email}</td>
                    <td className="px-4 py-3 text-foreground/55 whitespace-nowrap">{inq.phone}</td>
                    <td className="px-4 py-3 text-foreground/55 whitespace-nowrap">{inq.service}</td>
                    <td className="px-4 py-3 text-foreground/55 whitespace-nowrap">{inq.eventDate}</td>
                    <td className="px-4 py-3 text-foreground/55 text-center">{inq.guests}</td>
                    <td className="px-4 py-3 text-foreground/55 max-w-[140px] truncate">{inq.location}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={inq.status ?? "new"} />
                    </td>
                    <td className="px-4 py-3 text-foreground/40 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="w-3.5 h-3.5 text-foreground/20 group-hover:text-foreground/50 transition-colors" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <InquiryDetail
          inquiry={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
