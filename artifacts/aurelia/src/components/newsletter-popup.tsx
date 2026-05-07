import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "aurelia.newsletter.popup.v1";
const SHOW_AFTER_MS = 12000;

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Decide whether to show the popup. We respect a "dismissed" or
  // "subscribed" flag in localStorage so the user is never nagged twice.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage may be unavailable (private mode, embedded contexts);
      // in that case we simply don't show the popup.
      return;
    }
    if (stored === "dismissed" || stored === "subscribed") return;

    const t = window.setTimeout(() => setOpen(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "popup" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Subscription failed");
      }
      setStatus("success");
      try {
        window.localStorage.setItem(STORAGE_KEY, "subscribed");
      } catch {
        // ignore
      }
      window.setTimeout(() => setOpen(false), 2400);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={dismiss}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-popup-title"
            className="fixed inset-0 z-[70] flex items-center justify-center p-5 pointer-events-none"
          >
            <div className="bg-background w-full max-w-md md:max-w-2xl shadow-2xl pointer-events-auto relative grid md:grid-cols-2 overflow-hidden">
              <button
                onClick={dismiss}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors bg-background/70"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image side (hidden on small screens) */}
              <div
                className="hidden md:block bg-muted relative"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/27954360/pexels-photo-27954360/free-photo-of-people-toasting-with-glasses-of-wine.jpeg?auto=compress&cs=tinysrgb&w=900')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/30 to-foreground/10" />
                <div className="absolute bottom-6 left-6 right-6 text-background">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                    The Atelier Letter
                  </div>
                  <div className="font-serif text-2xl leading-tight">
                    Quietly inspired,
                    <br /> seasonally sent.
                  </div>
                </div>
              </div>

              {/* Form side */}
              <div className="p-7 md:p-9">
                {status === "success" ? (
                  <div className="text-center py-6">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
                      Welcome
                    </div>
                    <h3
                      id="newsletter-popup-title"
                      className="font-serif text-2xl md:text-3xl mb-3"
                    >
                      You're on the list.
                    </h3>
                    <p className="text-sm text-foreground/65 leading-relaxed">
                      Look for our next letter in your inbox soon.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                      Stay in Touch
                    </div>
                    <h3
                      id="newsletter-popup-title"
                      className="font-serif text-2xl md:text-3xl leading-tight mb-3"
                    >
                      Join our seasonal letter.
                    </h3>
                    <p className="text-sm text-foreground/65 leading-relaxed mb-6">
                      Editorial features, recent celebrations, and the
                      occasional travel notebook from our designers — sent
                      four times a year, never more.
                    </p>

                    <form onSubmit={onSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="newsletter-popup-email"
                          className="block text-[10px] uppercase tracking-[0.2em] text-foreground/60 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          id="newsletter-popup-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-background border border-border/70 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors"
                          autoFocus
                        />
                      </div>

                      {errorMessage && (
                        <p className="text-xs text-destructive">
                          {errorMessage}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-foreground text-background py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-primary transition-colors disabled:opacity-50"
                      >
                        {status === "submitting"
                          ? "Subscribing…"
                          : "Subscribe"}
                      </button>

                      <button
                        type="button"
                        onClick={dismiss}
                        className="w-full text-[10px] uppercase tracking-[0.25em] text-foreground/45 hover:text-foreground/70 transition-colors py-1"
                      >
                        No thanks
                      </button>

                      <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 text-center pt-2">
                        We respect your inbox. Unsubscribe at any time.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
