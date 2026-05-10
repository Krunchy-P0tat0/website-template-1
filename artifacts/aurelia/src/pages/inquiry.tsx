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

type EventTypeOption = {
  value: string;
  label: string;
  group: string;
  service: "wedding" | "corporate" | "private" | "destination" | "design";
  occasion: string;
};

const eventTypes: EventTypeOption[] = [
  { value: "wedding", label: "Wedding", group: "Weddings & Milestones", service: "wedding", occasion: "wedding" },
  { value: "vow-renewal", label: "Vow Renewal / Anniversary", group: "Weddings & Milestones", service: "private", occasion: "anniversary" },
  { value: "engagement", label: "Engagement Party", group: "Weddings & Milestones", service: "private", occasion: "engagement" },
  { value: "milestone-birthday", label: "Milestone Birthday", group: "Private Celebrations", service: "private", occasion: "birthday" },
  { value: "bar-bat-mitzvah", label: "Bar / Bat Mitzvah", group: "Private Celebrations", service: "private", occasion: "bar-bat-mitzvah" },
  { value: "holiday-soiree", label: "Holiday or Seasonal Soirée", group: "Private Celebrations", service: "private", occasion: "holiday" },
  { value: "private-other", label: "Other Private Celebration", group: "Private Celebrations", service: "private", occasion: "other-private" },
  { value: "gala", label: "Gala or Fundraiser", group: "Corporate & Brand", service: "corporate", occasion: "gala" },
  { value: "product-launch", label: "Product Launch / Brand Activation", group: "Corporate & Brand", service: "corporate", occasion: "product-launch" },
  { value: "conference", label: "Conference / Summit", group: "Corporate & Brand", service: "corporate", occasion: "conference" },
  { value: "executive-retreat", label: "Executive Retreat", group: "Corporate & Brand", service: "corporate", occasion: "retreat" },
  { value: "design-only", label: "Design & Production Only", group: "Other", service: "design", occasion: "design-production" },
];

const groupedEventTypes = eventTypes.reduce<Record<string, EventTypeOption[]>>((acc, opt) => {
  if (!acc[opt.group]) acc[opt.group] = [];
  acc[opt.group].push(opt);
  return acc;
}, {});

const lbl = "block text-[10px] uppercase tracking-[0.2em] text-[#333333]/55 mb-2";
const inp = "w-full bg-white border border-black/12 px-4 py-3 text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#003D68] transition-colors font-light";

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<InquiryForm>({ defaultValues: { destinationEvent: "", destinationServices: "" } });

  const destinationEvent = watch("destinationEvent");
  const destinationServices = watch("destinationServices");

  const onSubmit: SubmitHandler<InquiryForm> = async (data) => {
    setSubmitError(null);
    const eventType = eventTypes.find((e) => e.value === data.eventType);
    if (!eventType) { setSubmitError("Please choose the type of event you're planning."); return; }
    const payload = { ...data, service: eventType.service, occasion: eventType.occasion, office: "unspecified" };
    try {
      const res = await fetch("/api/inquiries", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const body = await res.json().catch(() => null); throw new Error(body?.error || `Request failed (${res.status})`); }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="w-full min-h-[70vh] bg-white pt-36 pb-24 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center max-w-xl px-6">
          <p className="cc-eyebrow mb-6">Enquiry Received</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-[#333333] mb-6">Thank you for your interest.</h2>
          <p className="text-[#333333]/60 leading-relaxed mb-10 font-light">
            Your enquiry has reached our atelier and a member of our team will be in touch shortly to learn more.
          </p>
          <Link href="/" className="text-[10px] uppercase tracking-[0.22em] text-[#333333] border-b border-[#333333]/30 pb-1 hover:border-[#333333] transition-colors">Return Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="cc-eyebrow mb-5">Client Enquiry</p>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333] leading-snug mb-5">
            Thank You for Your Interest in Our Services.
          </h1>
          <p className="text-[#333333]/55 text-sm font-light leading-relaxed max-w-lg mx-auto">
            This form is for event planning enquiries only. For business, press, or vendor enquiries, please visit our{" "}
            <Link href="/contact" className="text-[#003D68] hover:underline underline-offset-4">contact page</Link>.
          </p>
          <div className="w-8 h-px bg-black/15 mx-auto mt-10" />
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="space-y-12">

          {/* Event */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-7">About Your Event</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              <div>
                <label className={lbl}>Event Type <span className="text-[#CC1818]">*</span></label>
                <select {...register("eventType", { required: true })} className={inp} defaultValue="">
                  <option value="" disabled>Select…</option>
                  {Object.entries(groupedEventTypes).map(([group, opts]) => (
                    <optgroup key={group} label={group}>
                      {opts.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </optgroup>
                  ))}
                </select>
                {errors.eventType && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
              </div>
              <div>
                <label className={lbl}>Approximate Date <span className="text-[#CC1818]">*</span></label>
                <input type="date" {...register("eventDate", { required: true })} className={inp} />
                {errors.eventDate && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
              </div>
              <div>
                <label className={lbl}>Guest Count <span className="text-[#CC1818]">*</span></label>
                <input type="number" min={1} {...register("guests", { required: true })} className={inp} placeholder="150" />
                {errors.guests && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-7">Location & Logistics</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              <div>
                <label className={lbl}>Event Location <span className="text-[#CC1818]">*</span></label>
                <input type="text" {...register("location", { required: true })} className={inp} placeholder="City, region, or venue" />
                {errors.location && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
              </div>
              <div>
                <label className={lbl}>Destination event? <span className="text-[#CC1818]">*</span></label>
                <div className="flex gap-6 pt-3">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-light">
                      <input type="radio" value={v} {...register("destinationEvent", { required: true })} className="accent-[#003D68] w-4 h-4" />
                      <span className={destinationEvent === v ? "text-[#333333]" : "text-[#333333]/50"}>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                    </label>
                  ))}
                </div>
                {errors.destinationEvent && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
              </div>
              <div>
                <label className={lbl}>Travel & concierge? <span className="text-[#CC1818]">*</span></label>
                <div className="flex gap-6 pt-3">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm font-light">
                      <input type="radio" value={v} {...register("destinationServices", { required: true })} className="accent-[#003D68] w-4 h-4" />
                      <span className={destinationServices === v ? "text-[#333333]" : "text-[#333333]/50"}>{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                    </label>
                  ))}
                </div>
                {errors.destinationServices && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
              </div>
            </div>
            <div className="mt-6 md:max-w-sm">
              <label className={lbl}>Featured Venue Interest</label>
              <select {...register("venue")} className={inp} defaultValue="">
                <option value="">Select…</option>
                <option value="villa-balbiano">Villa Balbiano — Lake Como</option>
                <option value="borgo-pignano">Borgo Pignano — Tuscany</option>
                <option value="palazzo-margherita">Palazzo Margherita — Basilicata</option>
                <option value="rosewood-mayakoba">Rosewood — Mayakoba</option>
                <option value="amangiri">Amangiri — Utah</option>
                <option value="other">Other / Open to Suggestions</option>
              </select>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-7">Your Contact Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { label: "First Name", field: "firstName" as const, type: "text", placeholder: "First Name" },
                { label: "Last Name", field: "lastName" as const, type: "text", placeholder: "Last Name" },
                { label: "Email", field: "email" as const, type: "email", placeholder: "you@example.com" },
                { label: "Phone", field: "phone" as const, type: "tel", placeholder: "+1 (555) 555-5555" },
              ].map(({ label, field, type, placeholder }) => (
                <div key={field}>
                  <label className={lbl}>{label} <span className="text-[#CC1818]">*</span></label>
                  <input type={type} {...register(field, { required: true, ...(field === "email" ? { pattern: /^\S+@\S+\.\S+$/ } : {}) })} className={inp} placeholder={placeholder} />
                  {errors[field] && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-7">Tell Us More</p>
            <div className="space-y-6">
              <div>
                <label className={lbl}>Anything you'd like us to know about your vision?</label>
                <textarea rows={5} {...register("additional")} className={`${inp} resize-none`} placeholder="Share your inspiration, must-haves, or any details that will help us understand your event." />
              </div>
              <div className="md:max-w-sm">
                <label className={lbl}>How did you hear about us?</label>
                <select {...register("hearAboutUs")} className={inp} defaultValue="">
                  <option value="">Select…</option>
                  <option value="referral">Referral from a friend</option>
                  <option value="press">Press / Editorial</option>
                  <option value="instagram">Instagram</option>
                  <option value="pinterest">Pinterest</option>
                  <option value="google">Google search</option>
                  <option value="vendor">Vendor / Venue Recommendation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex flex-col items-center gap-5">
            {submitError && <p className="text-sm text-[#CC1818] text-center">{submitError}</p>}
            <button type="submit" disabled={isSubmitting}
              className="bg-[#333333] text-white px-14 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-[#003D68] transition-colors disabled:opacity-50">
              {isSubmitting ? "Sending…" : "Submit Enquiry"}
            </button>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#333333]/35">Fields marked <span className="text-[#CC1818]">*</span> are required</p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
