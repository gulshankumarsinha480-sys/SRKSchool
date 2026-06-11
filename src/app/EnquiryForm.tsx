// EnquiryForm.tsx
// Drop-in replacement for the "Send Us a Message" section in App.tsx
// Calls POST /api/enquiries on submit

import { useState } from "react";
import { toast } from "sonner";

const GRADES = [
  "Nursery", "LKG","UKG",
  "Class I", "Class II", "Class III", "Class IV",
  "Class V", "Class VI", "Class VII", "Class VIII",
];

interface FormState {
  name: string;
  phone: string;
  grade: string;
  message: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export function EnquiryForm() {
  const [form, setForm]       = useState<FormState>({ name: "", phone: "", grade: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.phone.trim() || !form.grade) {
      toast.error("Please fill in Name, Phone, and Grade.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/enquiries`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");

      setSubmitted(true);
      toast.success("Enquiry submitted! We'll contact you shortly.");
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-white font-semibold text-lg mb-2">Enquiry Received!</h3>
        <p className="text-white/70 text-sm mb-5">
          Thank you! We'll get back to you on <strong className="text-white">{form.phone}</strong> soon.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", grade: "", message: "" }); }}
          className="bg-white/20 text-white text-sm px-5 py-2 rounded-full hover:bg-white/30 transition-colors"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 backdrop-blur">
      <h3 className="text-white font-semibold mb-5">Send Us a Message</h3>
      <div className="flex flex-col gap-4">

        {/* Name */}
        <div>
          <label className="text-white/70 text-xs uppercase tracking-wide block mb-1">
            Parent / Guardian Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary text-sm"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-white/70 text-xs uppercase tracking-wide block mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary text-sm"
          />
        </div>

        {/* Grade */}
        <div>
          <label className="text-white/70 text-xs uppercase tracking-wide block mb-1">
            Child's Grade Applying For
          </label>
          <select
            value={form.grade}
            onChange={(e) => set("grade", e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary text-sm"
          >
            <option value="" className="text-black">Select Grade</option>
            {GRADES.map((g) => (
              <option key={g} value={g} className="text-black">{g}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="text-white/70 text-xs uppercase tracking-wide block mb-1">
            Message (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Any questions or special notes..."
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary text-sm resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-white font-semibold py-3 rounded-full hover:opacity-90 transition-opacity w-full disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit Enquiry"}
        </button>
      </div>
    </div>
  );
}
