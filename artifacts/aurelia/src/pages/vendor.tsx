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

const vendorCategories = [
  { title: "Floral & Botanical", body: "Couture floral designers and installation artists working in seasonal, sourced-locally practice." },
  { title: "Photography & Film", body: "Editorial photographers and cinematographers with a documentary or fashion sensibility." },
  { title: "Venues & Estates", body: "Private homes, historic estates, vineyards, palaces, and one-of-a-kind locations open for buyout." },
  { title: "Stationery & Print", body: "Letterpress, calligraphy, foiling, and bespoke print houses for invitation suites and signage." },
  { title: "Catering & Pastry", body: "Restaurant chefs, pâtissiers, and culinary teams comfortable producing for 40 to 4,000 guests." },
  { title: "Music & Entertainment", body: "String quartets, jazz ensembles, headline acts, DJs, and theatrical performance companies." },
  { title: "Lighting & Production", body: "Lighting designers, A/V engineers, scenic builders, and rigging teams for indoor and outdoor sets." },
  { title: "Beauty & Wardrobe", body: "Hair, makeup, and on-call wardrobe artists with editorial credits and bridal experience." },
];

const criteria = [
  { num: "01", title: "Distinctive point of view", body: "We're drawn to creative voices with a clear, identifiable aesthetic — something only your studio could produce." },
  { num: "02", title: "Discretion & professionalism", body: "Our clients value privacy. NDAs, on-time arrival, polished communication, and quiet conduct on-site are non-negotiable." },
  { num: "03", title: "Production-grade reliability", body: "Insurance, contracts, contingency plans, and the team to deliver at scale. We work with vendors who can absorb pressure gracefully." },
  { num: "04", title: "Willing to travel", body: "Many of our productions are international. We prioritise partners with passports, equipment that travels, and flexibility around timezones." },
];

const process = [
  { step: "01", title: "Submit your application", body: "Tell us about your studio in the form below. Include a portfolio link — Instagram, a website, or a PDF lookbook." },
  { step: "02", title: "Initial review", body: "Our producers review every submission within four weeks. You'll hear from us either way." },
  { step: "03", title: "Discovery conversation", body: "Selected studios are invited for a 30-minute introduction with the relevant department lead." },
  { step: "04", title: "Trial collaboration", body: "We typically begin with a smaller production before adding new partners to our flagship roster." },
];

const lbl = "block text-[10px] uppercase tracking-[0.2em] text-[#333333]/55 mb-2";
const inp = "w-full bg-white border border-black/12 px-4 py-3 text-sm text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:border-[#003D68] transition-colors font-light";

export default function Vendor() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VendorForm>();

  const onSubmit: SubmitHandler<VendorForm> = async (data) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/vendor-applications", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) { const body = await res.json().catch(() => null); throw new Error(body?.error || "Submission failed"); }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full bg-[#F3F3F3] pt-36 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20 max-w-2xl mx-auto">
          <p className="cc-eyebrow mb-5">For Creative Partners</p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-[#333333] mb-5">Vendor Applications</h1>
          <p className="text-[#333333]/60 leading-relaxed font-light">
            Aurelia & Co. is built on the talent of an extended creative community — florists, photographers, venue owners, chefs, lighting designers, and artisans whose work elevates every event we produce. If your studio shares our standards, we'd love to hear from you.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto text-center border border-black/10 p-14 bg-white">
            <p className="cc-eyebrow mb-5">Application Received</p>
            <h2 className="font-serif text-2xl font-light text-[#333333] mb-4">Thank you.</h2>
            <p className="text-[#333333]/60 leading-relaxed mb-8 font-light">Your application is now with our producers. We review every submission personally and will respond within four weeks.</p>
            <Link href="/" className="text-[10px] uppercase tracking-[0.22em] text-[#333333] border-b border-[#333333]/25 pb-1 hover:border-[#333333] transition-colors">← Back to Home</Link>
          </motion.div>
        ) : (
          <>
            {/* Categories */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <p className="cc-eyebrow mb-4">Disciplines We Partner With</p>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#333333]">We're always meeting new talent.</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {vendorCategories.map((c, i) => (
                  <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="border border-black/10 p-6 bg-white">
                    <h3 className="font-serif text-lg mb-2 text-[#333333] font-light">{c.title}</h3>
                    <p className="text-sm text-[#333333]/60 leading-relaxed font-light">{c.body}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Criteria */}
            <section className="border-t border-black/10 pt-16 mb-20">
              <div className="text-center mb-12">
                <p className="cc-eyebrow mb-4">Our Standards</p>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#333333]">What we look for</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {criteria.map((c) => (
                  <div key={c.title}>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-3">{c.num}</p>
                    <h3 className="font-serif text-xl font-light text-[#333333] mb-3">{c.title}</h3>
                    <p className="text-[#333333]/60 leading-relaxed font-light text-sm">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section className="border-t border-black/10 pt-16 mb-20">
              <div className="text-center mb-12">
                <p className="cc-eyebrow mb-4">After You Apply</p>
                <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#333333]">Our review process</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {process.map((p) => (
                  <div key={p.step}>
                    <p className="font-serif text-4xl text-[#003D68] mb-3 font-light">{p.step}</p>
                    <h3 className="font-serif text-xl font-light text-[#333333] mb-2">{p.title}</h3>
                    <p className="text-sm text-[#333333]/60 leading-relaxed font-light">{p.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Form */}
            <section id="apply" className="border-t border-black/10 pt-16">
              <div className="text-center mb-12">
                <p className="cc-eyebrow mb-4">Submit Your Studio</p>
                <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-[#333333] mb-4">Tell us about your work.</h2>
                <p className="text-[#333333]/60 leading-relaxed font-light text-sm">Required fields are marked with an asterisk. The more context you share, the better we can place you.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-6">Studio</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className={lbl}>Business name <span className="text-[#CC1818]">*</span></label>
                      <input {...register("businessName", { required: true })} className={inp} placeholder="Studio Aurea" />
                      {errors.businessName && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
                    </div>
                    <div>
                      <label className={lbl}>Discipline <span className="text-[#CC1818]">*</span></label>
                      <select {...register("category", { required: true })} className={inp} defaultValue="">
                        <option value="" disabled>Select…</option>
                        {vendorCategories.map((c) => <option key={c.title} value={c.title}>{c.title}</option>)}
                        <option value="Other">Other</option>
                      </select>
                      {errors.category && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
                    </div>
                    <div>
                      <label className={lbl}>Regions you serve <span className="text-[#CC1818]">*</span></label>
                      <input {...register("regions", { required: true })} className={inp} placeholder="e.g. Italy, France, USA — willing to travel" />
                      {errors.regions && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
                    </div>
                    <div>
                      <label className={lbl}>Years active</label>
                      <input {...register("yearsActive")} className={inp} placeholder="e.g. 8 years" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-6">Contact</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                      <label className={lbl}>Contact name <span className="text-[#CC1818]">*</span></label>
                      <input {...register("contactName", { required: true })} className={inp} placeholder="First and last name" />
                      {errors.contactName && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
                    </div>
                    <div>
                      <label className={lbl}>Email <span className="text-[#CC1818]">*</span></label>
                      <input type="email" {...register("email", { required: true })} className={inp} placeholder="you@studio.com" />
                      {errors.email && <p className="text-xs text-[#CC1818] mt-2">Required</p>}
                    </div>
                    <div>
                      <label className={lbl}>Phone</label>
                      <input type="tel" {...register("phone")} className={inp} placeholder="+1 ..." />
                    </div>
                    <div>
                      <label className={lbl}>Website</label>
                      <input {...register("website")} className={inp} placeholder="https://" />
                    </div>
                    <div>
                      <label className={lbl}>Instagram</label>
                      <input {...register("instagram")} className={inp} placeholder="@yourhandle" />
                    </div>
                    <div>
                      <label className={lbl}>Portfolio link</label>
                      <input {...register("portfolioUrl")} className={inp} placeholder="Link to lookbook, drive folder, or portfolio" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#003D68] mb-6">About Your Work</p>
                  <div className="space-y-6">
                    <div>
                      <label className={lbl}>A short bio of your studio <span className="text-[#CC1818]">*</span></label>
                      <textarea {...register("bio", { required: true, minLength: 20 })} rows={6} className={inp} placeholder="Tell us about your team, your aesthetic, signature projects, and the kind of celebrations you do best." />
                      {errors.bio && <p className="text-xs text-[#CC1818] mt-2">Please share at least a few sentences.</p>}
                    </div>
                    <div>
                      <label className={lbl}>How did you hear about us?</label>
                      <input {...register("hearAboutUs")} className={inp} placeholder="Optional" />
                    </div>
                  </div>
                </div>

                {submitError && <p className="text-sm text-[#CC1818]">{submitError}</p>}
                <button type="submit" disabled={isSubmitting}
                  className="bg-[#333333] text-white px-12 py-4 text-[10px] uppercase tracking-[0.28em] hover:bg-[#003D68] transition-colors disabled:opacity-50">
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
