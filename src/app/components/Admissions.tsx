export default function Admissions() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-violet-200" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>SRK</div>
            <div>
              <div className="font-bold text-gray-900 text-sm leading-tight">S.R.K. Public School</div>
              <div className="text-xs text-gray-400 leading-tight">Haldia, West Bengal</div>
            </div>
          </div>
          <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-700 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 60%, #4c1d95 100%)" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Admissions Open — 2024–25
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Join S.R.K. Public School
          </h1>
          <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Nurturing young minds from Nursery to Class VIII. Download the application form, fill it out, and visit us to begin your child's journey.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Download Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-violet-100" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Application Form</h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Download the official S.R.K. Public School admission form. Fill it in block letters and submit it at the school office.
            </p>

            <a
              href="/SRK_Admission_Form.pdf"
              download="SRK_Admission_Form.pdf"
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-xl transition-all hover:opacity-90 shadow-lg shadow-violet-200 mb-3"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Form (PDF)
            </a>

            <a
              href="/SRK_Admission_Form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-violet-700 font-semibold py-3.5 rounded-xl border-2 border-violet-100 hover:bg-violet-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview Form
            </a>
          </div>

          {/* Steps Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Admission Process</h2>
            <div className="flex flex-col gap-5">
              {[
                { step: "01", title: "Download Form", desc: "Download the application form using the button on the left." },
                { step: "02", title: "Fill the Form", desc: "Fill in all details in block letters as instructed on the form." },
                { step: "03", title: "Attach Documents", desc: "Attach passport-size photos and required documents." },
                { step: "04", title: "Visit School", desc: "Submit the form at school office during working hours (7AM–3PM)." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md shadow-violet-100" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                    {s.step}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">Need Help? Contact Us</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "📍", label: "Address", val: "S.R.K. Public School, Haldia, West Bengal" },
              { icon: "📞", label: "Phone", val: "+91 03224-352672 / 9002530144" },
              { icon: "🕗", label: "School Hours", val: "Monday – Saturday, 7:00 AM – 3:10 PM" },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-3">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">{info.label}</div>
                  <div className="text-sm text-gray-700 mt-0.5">{info.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-6">
        © {new Date().getFullYear()} S.R.K. Public School, Haldia, West Bengal. All rights reserved.
      </footer>
    </div>
  );
}