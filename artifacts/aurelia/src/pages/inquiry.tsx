import { motion } from "framer-motion";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "wouter";

type InquiryForm = {
  eventType: string;
  eventDate: string;
  destinationEvent: "yes" | "no" | "";
  destinationServices: "yes" | "no" | "";
  guests: string;
  location: string;
  venue: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additional: string;
  hearAboutUs: string;
};

// A single, granular event-type list. Each value carries an explicit service
// category and a specific occasion so the form captures intent in one question
// instead of the redundant "service + occasion" pair.
type EventTypeOption = {
  value: string;
  label: string;
  group: string;
  service: "wedding" | "corporate" | "private" | "destination" | "design";
  occasion: string;
};

const eventTypes: EventTypeOption[] = [
  // Weddings & milestones
  { value: "wedding", label: "Wedding", group: "Weddings & Milestones", service: "wedding", occasion: "wedding" },
  { value: "vow-renewal", label: "Vow Renewal / Anniversary", group: "Weddings & Milestones", service: "private", occasion: "anniversary" },
  { value: "engagement", label: "Engagement Party", group: "Weddings & Milestones", service: "private", occasion: "engagement" },
  // Private celebrations
  { value: "milestone-birthday", label: "Milestone Birthday", group: "Private Celebrations", service: "private", occasion: "birthday" },
  { value: "bar-bat-mitzvah", label: "Bar / Bat Mitzvah", group: "Private Celebrations", service: "private", occasion: "bar-bat-mitzvah" },
  { value: "holiday-soiree", label: "Holiday or Seasonal Soirée", group: "Private Celebrations", service: "private", occasion: "holiday" },
  { value: "private-other", label: "Other Private Celebration", group: "Private Celebrations", service: "private", occasion: "other-private" },
  // Corporate
  { value: "gala", label: "Gala or Fundraiser", group: "Corporate & Brand", service: "corporate", occasion: "gala" },
  { value: "product-launch", label: "Product Launch / Brand Activation", group: "Corporate & Brand", service: "corporate", occasion: "product-launch" },
  { value: "conference", label: "Conference / Summit", group: "Corporate & Brand", service: "corporate", occasion: "conference" },
  { value: "executive-retreat", label: "Executive Retreat", group: "Corporate & Brand", service: "corporate", occasion: "retreat" },
  // Other
  { value: "design-only", label: "Design & Production Only", group: "Other", service: "design", occasion: "design-production" },
];

const groupedEventTypes = eventTypes.reduce<Record<string, EventTypeOption[]>>(
  (acc, opt) => {
    if (!acc[opt.group]) acc[opt.group] = [];
    acc[opt.group].push(opt);
    return acc;
  },
  {},
);

const fieldLabel =
  "block text-[11px] uppercase tracking-[0.18em] text-foreground/70 mb-2 font-sans";
const baseInput =
  "w-full bg-background border border-border/70 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors";

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InquiryForm>({
    defaultValues: {
      destinationEvent: "",
      destinationServices: "",
    },
  });

  const destinationEvent = watch("destinationEvent");
  const destinationServices = watch("destinationServices");

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<InquiryForm> = async (data) => {
    setSubmitError(null);
    const eventType = eventTypes.find((e) => e.value === data.eventType);
    if (!eventType) {
      setSubmitError("Please choose the type of event you're planning.");
      return;
    }
    // Derive both legacy fields from the single chosen event type so the
    // existing API/db keep working without a schema change. The "office"
    // field is no longer asked of the client; we send "unspecified" so
    // routing is decided internally by our concierge team.
    const payload = {
      ...data,
      service: eventType.service,
      occasion: eventType.occasion,
      office: "unspecified",
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Request failed (${res.status})`);
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email concierge@aureliaco.com.",
      );
    }
  };

  if (submitted) {
    return (
      <div className="w-full min-h-[70vh] bg-background pt-32 pb-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl px-6"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-6">
            Inquiry Received
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Thank you for your interest.
          </h2>
          <p className="text-foreground/70 leading-relaxed mb-10">
            A member of our atelier will review the details of your event and
            respond personally within two business days to schedule a private
            consultation.
          </p>
          <Link
            href="/"
            className="inline-block text-[11px] uppercase tracking-[0.25em] border-b border-foreground/30 pb-1 hover:text-primary hover:border-primary transition-colors"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-5 md:px-12 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-4"
        >
          <h1 className="font-serif text-3xl md:text-5xl tracking-tight text-foreground/90 leading-tight">
            THANK YOU FOR YOUR INTEREST IN OUR SERVICES.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="font-serif text-base md:text-lg tracking-wide text-foreground/80 mb-3">
            THIS FORM IS ONLY FOR CLIENT EVENT PLANNING INQUIRIES.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed max-w-2xl mx-auto">
            For business inquiries, please use the appropriate email address
            listed on our{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline underline-offset-4"
            >
              contact us page
            </Link>
            .
            <br />
            Vendors interested in working with us, please use the{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline underline-offset-4"
            >
              Vendor Submission Form
            </Link>
            .
          </p>
        </motion.div>

        <div className="w-12 h-px bg-foreground/20 mx-auto mb-12" />

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Section: Tell us about your event */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-5">
              About Your Event
            </div>

            {/* Row 1: Event type / Date / Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              <div className="md:col-span-1">
                <label className={fieldLabel}>
                  What kind of event are you planning?{" "}
                  <span className="text-primary">*</span>
                </label>
                <select
                  {...register("eventType", { required: true })}
                  className={baseInput}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {Object.entries(groupedEventTypes).map(([group, opts]) => (
                    <optgroup key={group} label={group}>
                      {opts.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.eventType && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>

              <div>
                <label className={fieldLabel}>
                  Approximate Event Date{" "}
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="date"
                  {...register("eventDate", { required: true })}
                  className={baseInput}
                />
                {errors.eventDate && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>

              <div>
                <label className={fieldLabel}>
                  Expected Guest Count{" "}
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  {...register("guests", { required: true })}
                  className={baseInput}
                  placeholder="150"
                />
                {errors.guests && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>
            </div>
          </div>

          {/* Section: Where & how */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-5">
              Location & Logistics
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              <div>
                <label className={fieldLabel}>
                  Event Location <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  {...register("location", { required: true })}
                  className={baseInput}
                  placeholder="City, region, or venue"
                />
                {errors.location && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>

              <div>
                <label className={fieldLabel}>
                  Is this a destination event?{" "}
                  <span className="text-primary">*</span>
                </label>
                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      value="yes"
                      {...register("destinationEvent", { required: true })}
                      className="accent-primary w-4 h-4"
                    />
                    <span
                      className={
                        destinationEvent === "yes"
                          ? "text-foreground"
                          : "text-foreground/70"
                      }
                    >
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      value="no"
                      {...register("destinationEvent", { required: true })}
                      className="accent-primary w-4 h-4"
                    />
                    <span
                      className={
                        destinationEvent === "no"
                          ? "text-foreground"
                          : "text-foreground/70"
                      }
                    >
                      No
                    </span>
                  </label>
                </div>
                {errors.destinationEvent && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>

              <div>
                <label className={fieldLabel}>
                  Need travel & guest concierge?{" "}
                  <span className="text-primary">*</span>
                </label>
                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      value="yes"
                      {...register("destinationServices", { required: true })}
                      className="accent-primary w-4 h-4"
                    />
                    <span
                      className={
                        destinationServices === "yes"
                          ? "text-foreground"
                          : "text-foreground/70"
                      }
                    >
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      value="no"
                      {...register("destinationServices", { required: true })}
                      className="accent-primary w-4 h-4"
                    />
                    <span
                      className={
                        destinationServices === "no"
                          ? "text-foreground"
                          : "text-foreground/70"
                      }
                    >
                      No
                    </span>
                  </label>
                </div>
                {errors.destinationServices && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>
            </div>

            <div className="mt-6 md:max-w-md">
              <label className={fieldLabel}>
                Interested in one of our featured venues?
              </label>
              <select
                {...register("venue")}
                className={baseInput}
                defaultValue=""
              >
                <option value="">Select…</option>
                <option value="villa-balbiano">
                  Villa Balbiano — Lake Como
                </option>
                <option value="borgo-pignano">
                  Borgo Pignano — Tuscany
                </option>
                <option value="palazzo-margherita">
                  Palazzo Margherita — Basilicata
                </option>
                <option value="rosewood-mayakoba">
                  Rosewood — Mayakoba
                </option>
                <option value="amangiri">Amangiri — Utah</option>
                <option value="other">Other / Open to Suggestions</option>
              </select>
            </div>
          </div>

          {/* Section: Contact */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-5">
              Your Contact Details
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className={fieldLabel}>
                  First Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName", { required: true })}
                  className={baseInput}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>
              <div>
                <label className={fieldLabel}>
                  Last Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  {...register("lastName", { required: true })}
                  className={baseInput}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>
              <div>
                <label className={fieldLabel}>
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  className={baseInput}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-primary mt-2">
                    Valid email required
                  </p>
                )}
              </div>
              <div>
                <label className={fieldLabel}>
                  Phone <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  className={baseInput}
                  placeholder="+1 (555) 555-5555"
                />
                {errors.phone && (
                  <p className="text-xs text-primary mt-2">Required</p>
                )}
              </div>
            </div>
          </div>

          {/* Section: Vision */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-5">
              Tell Us More
            </div>

            <div className="space-y-6">
              <div>
                <label className={fieldLabel}>
                  Anything you'd like us to know about your vision?
                </label>
                <textarea
                  rows={5}
                  {...register("additional")}
                  className={`${baseInput} resize-none`}
                  placeholder="Share your inspiration, must-haves, dietary considerations, or any details that will help us understand your event."
                />
              </div>

              <div className="md:max-w-md">
                <label className={fieldLabel}>How did you hear about us?</label>
                <select
                  {...register("hearAboutUs")}
                  className={baseInput}
                  defaultValue=""
                >
                  <option value="">Select…</option>
                  <option value="referral">Referral from a friend</option>
                  <option value="press">Press / Editorial</option>
                  <option value="instagram">Instagram</option>
                  <option value="pinterest">Pinterest</option>
                  <option value="google">Google search</option>
                  <option value="vendor">
                    Vendor / Venue Recommendation
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 flex flex-col items-center">
            {submitError && (
              <p className="text-sm text-destructive mb-4 text-center">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-foreground text-background px-12 py-3 text-[11px] uppercase tracking-[0.25em] hover:bg-primary transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending…" : "Submit Inquiry"}
            </button>
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/40 mt-6">
              All fields marked <span className="text-primary">*</span> are
              required
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
