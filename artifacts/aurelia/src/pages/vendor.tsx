import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type VendorForm = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  instagram: string;
  category: string;
  regions: string;
  yearsActive: string;
  bio: string;
  portfolioUrl: string;
  hearAboutUs: string;
};

const categories = [
  {
    title: "Floral & Botanical",
    body: "Couture floral designers and installation artists working in seasonal, sourced-locally practice.",
  },
  {
    title: "Photography & Film",
    body: "Editorial photographers and cinematographers with a documentary or fashion sensibility.",
  },
  {
    title: "Venues & Estates",
    body: "Private homes, historic estates, vineyards, palaces, and one-of-a-kind locations open for buyout.",
  },
  {
    title: "Stationery & Print",
    body: "Letterpress, calligraphy, foiling, and bespoke print houses for invitation suites and signage.",
  },
  {
    title: "Catering & Pastry",
    body: "Restaurant chefs, pâtissiers, and culinary teams comfortable producing for 40 to 4,000 guests.",
  },
  {
    title: "Music & Entertainment",
    body: "String quartets, jazz ensembles, headline acts, DJs, and theatrical performance companies.",
  },
  {
    title: "Lighting & Production",
    body: "Lighting designers, A/V engineers, scenic builders, and rigging teams for indoor and outdoor sets.",
  },
  {
    title: "Beauty & Wardrobe",
    body: "Hair, makeup, and on-call wardrobe artists with editorial credits and bridal experience.",
  },
];

const criteria = [
  {
    eyebrow: "01",
    title: "Distinctive point of view",
    body: "We're drawn to creative voices with a clear, identifiable aesthetic — something only your studio could produce.",
  },
  {
    eyebrow: "02",
    title: "Discretion & professionalism",
    body: "Our clients value privacy. NDAs, on-time arrival, polished communication, and quiet conduct on-site are non-negotiable.",
  },
  {
    eyebrow: "03",
    title: "Production-grade reliability",
    body: "Insurance, contracts, contingency plans, and the team to deliver at scale. We work with vendors who can absorb pressure gracefully.",
  },
  {
    eyebrow: "04",
    title: "Willing to travel",
    body: "Many of our productions are international. We prioritise partners with passports, equipment that travels, and flexibility around timezones.",
  },
];

const process = [
  {
    step: "01",
    title: "Submit your application",
    body: "Tell us about your studio in the form below. Include a portfolio link — Instagram, a website, or a PDF lookbook.",
  },
  {
    step: "02",
    title: "Initial review",
    body: "Our producers review every submission within four weeks. You'll hear from us either way.",
  },
  {
    step: "03",
    title: "Discovery conversation",
    body: "Selected studios are invited for a 30-minute introduction with the relevant department lead.",
  },
  {
    step: "04",
    title: "Trial collaboration",
    body: "We typically begin with a smaller production before adding new partners to our flagship roster.",
  },
];

const fieldLabel =
  "block text-[10px] uppercase tracking-[0.2em] text-foreground/60 mb-2";
const baseInput =
  "w-full bg-background border border-border/70 px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors";

export default function Vendor() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VendorForm>();

  const onSubmit: SubmitHandler<VendorForm> = async (data) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/vendor-applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Submission failed");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="w-full bg-background pt-28 md:pt-32 pb-24">
      {/* Hero */}
      <div className="container mx-auto px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
            For Creative Partners
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight">
            Vendor Applications
          </h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
            Aurelia & Co. is built on the talent of an extended creative
            community — florists, photographers, venue owners, chefs, lighting
            designers, and artisans whose work elevates every event we
            produce. If your studio shares our standards, we'd love to hear
            from you.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center border border-border/70 p-12 bg-card"
          >
            <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
              Application Received
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 tracking-tight">
              Thank you.
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Your application is now with our producers. We review every
              submission personally and will respond within four weeks —
              whether or not your studio is the right fit at this moment.
            </p>
            <Link
              href="/"
              className="text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-primary transition-colors border-b border-foreground/30 hover:border-primary pb-1"
            >
              ← Back to Home
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Categories */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="mb-24"
            >
              <div className="text-center mb-12">
                <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
                  Disciplines We Partner With
                </div>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                  We're always meeting new talent.
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border border-border/60 p-6 bg-card"
                  >
                    <h3 className="font-serif text-lg mb-2 tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-sm text-foreground/65 leading-relaxed">
                      {c.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* What we look for */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="border-t border-border pt-16 mb-24"
            >
              <div className="text-center mb-12">
                <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
                  Our Standards
                </div>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                  What we look for
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
                {criteria.map((c) => (
                  <div key={c.title}>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-primary mb-3">
                      {c.eyebrow}
                    </div>
                    <h3 className="font-serif text-2xl mb-3 tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-foreground/65 leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Process */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="border-t border-border pt-16 mb-24"
            >
              <div className="text-center mb-12">
                <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
                  After You Apply
                </div>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight">
                  Our review process
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {process.map((p) => (
                  <div key={p.step} className="relative">
                    <div className="font-serif text-4xl text-primary mb-3">
                      {p.step}
                    </div>
                    <h3 className="font-serif text-xl mb-2 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-foreground/65 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Application Form */}
            <motion.section
              id="apply"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
              className="border-t border-border pt-16"
            >
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <div className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
                  Submit Your Studio
                </div>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight mb-4">
                  Tell us about your work.
                </h2>
                <p className="text-foreground/65 leading-relaxed">
                  Required fields are marked with an asterisk. The more
                  context you share, the better we can place you on a future
                  production.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto"
              >
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6">
                  Studio
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                  <div>
                    <label className={fieldLabel}>
                      Business name <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("businessName", { required: true })}
                      className={baseInput}
                      placeholder="Studio Aurea"
                    />
                    {errors.businessName && (
                      <p className="text-xs text-primary mt-2">Required</p>
                    )}
                  </div>

                  <div>
                    <label className={fieldLabel}>
                      Discipline <span className="text-primary">*</span>
                    </label>
                    <select
                      {...register("category", { required: true })}
                      className={baseInput}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {categories.map((c) => (
                        <option key={c.title} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && (
                      <p className="text-xs text-primary mt-2">Required</p>
                    )}
                  </div>

                  <div>
                    <label className={fieldLabel}>
                      Regions you serve{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("regions", { required: true })}
                      className={baseInput}
                      placeholder="e.g. Italy, France, USA — willing to travel"
                    />
                    {errors.regions && (
                      <p className="text-xs text-primary mt-2">Required</p>
                    )}
                  </div>

                  <div>
                    <label className={fieldLabel}>Years active</label>
                    <input
                      {...register("yearsActive")}
                      className={baseInput}
                      placeholder="e.g. 8 years"
                    />
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6">
                  Contact
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                  <div>
                    <label className={fieldLabel}>
                      Contact name <span className="text-primary">*</span>
                    </label>
                    <input
                      {...register("contactName", { required: true })}
                      className={baseInput}
                      placeholder="First and last name"
                    />
                    {errors.contactName && (
                      <p className="text-xs text-primary mt-2">Required</p>
                    )}
                  </div>

                  <div>
                    <label className={fieldLabel}>
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className={baseInput}
                      placeholder="you@studio.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-primary mt-2">Required</p>
                    )}
                  </div>

                  <div>
                    <label className={fieldLabel}>Phone</label>
                    <input
                      type="tel"
                      {...register("phone")}
                      className={baseInput}
                      placeholder="+1 ..."
                    />
                  </div>

                  <div>
                    <label className={fieldLabel}>Website</label>
                    <input
                      {...register("website")}
                      className={baseInput}
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className={fieldLabel}>Instagram</label>
                    <input
                      {...register("instagram")}
                      className={baseInput}
                      placeholder="@yourhandle"
                    />
                  </div>

                  <div>
                    <label className={fieldLabel}>Portfolio link</label>
                    <input
                      {...register("portfolioUrl")}
                      className={baseInput}
                      placeholder="Link to a lookbook, drive folder, or portfolio"
                    />
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-6">
                  About Your Work
                </div>
                <div className="space-y-6 mb-12">
                  <div>
                    <label className={fieldLabel}>
                      A short bio of your studio{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <textarea
                      {...register("bio", { required: true, minLength: 20 })}
                      rows={6}
                      className={baseInput}
                      placeholder="Tell us about your team, your aesthetic, signature projects, and the kind of celebrations you do best."
                    />
                    {errors.bio && (
                      <p className="text-xs text-primary mt-2">
                        Please share at least a few sentences (20+ characters).
                      </p>
                    )}
                  </div>

                  <div>
                    <label className={fieldLabel}>
                      How did you hear about us?
                    </label>
                    <input
                      {...register("hearAboutUs")}
                      className={baseInput}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm text-destructive mb-4">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-foreground text-background px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-primary transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            </motion.section>
          </>
        )}
      </div>
    </div>
  );
}
