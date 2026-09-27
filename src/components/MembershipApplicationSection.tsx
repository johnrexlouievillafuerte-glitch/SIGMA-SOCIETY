import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  Download,
  RotateCcw,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { URS_CAINTA_COURSES } from '../data/organizationData';
import SigmaOfficialLogo from './SigmaOfficialLogo';
import PrintableApplicationModal from './PrintableApplicationModal';
import { soundFx } from '../utils/sound';

interface ApplicationData {
  fullName: string;
  studentId: string;
  program: string;
  yearLevel: string;
  email: string;
  phone: string;
  trackId: string;
  interests: string[];
  committee: string;
  statement: string;
}

const COMMITTEES = [
  'Research and Data Analytics Committee',
  'Academic and Training Committee',
  'Events and Programs Committee',
  'Technical and IT Committee',
  'Membership and Outreach Committee'
];

export default function MembershipApplicationSection() {
  const [formData, setFormData] = useState<ApplicationData>({
    fullName: '',
    studentId: '',
    program: 'BS in Information Technology',
    yearLevel: '2nd Year',
    email: '',
    phone: '',
    trackId: 'cat-regular',
    interests: [],
    committee: 'Research and Data Analytics Committee',
    statement: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [appReference, setAppReference] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.studentId || !formData.email) return;

    soundFx.playChime();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `SIGMA-URS-CT-2026-${randomNum}`;
    setAppReference(refCode);
    setSubmitted(true);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(appReference);
    setCopied(true);
    soundFx.playBlip(800, 0.02);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    soundFx.playBlip(500, 0.02);
    setSubmitted(false);
    setFormData({
      fullName: '',
      studentId: '',
      program: 'BS in Information Technology',
      yearLevel: '2nd Year',
      email: '',
      phone: '',
      trackId: 'cat-regular',
      interests: [],
      committee: 'Research and Data Analytics Committee',
      statement: ''
    });
  };

  const handleOpenPrint = () => {
    soundFx.playBlip(700, 0.02);
    setIsPrintModalOpen(true);
  };

  return (
    <section id="membership-application" className="py-20 px-4 max-w-7xl mx-auto relative scroll-mt-20">
      <div id="membership" className="absolute -top-24 pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 mb-8 border-b border-amber-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions & Recruitment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-3 flex-wrap">
            <span>Membership Application</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
              Regular Member
            </span>
          </h2>
          <p className="text-rose-100/80 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Apply to join the Statistical Innovation and Growth in Mathematical Advancement Society at University of Rizal System – Cainta Campus.
          </p>
        </div>
      </div>

      {/* Regular Member Status Banner */}
      <div className="relative z-10 mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#2c0409] via-[#3a0711] to-[#240308] border border-amber-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <span>Membership Classification: Regular Member</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Active Enrolled Student
              </span>
            </h4>
            <p className="text-xs text-rose-200/80 font-sans mt-0.5">
              Open to all officially enrolled students at URS Cainta with passion for statistics, mathematics, data analytics, and research.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-amber-300 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/20 whitespace-nowrap self-start sm:self-auto">
          A.Y. 2026–2027
        </div>
      </div>

      {/* ============================================================== */}
      {/* Dynamic Form Area */}
      {/* ============================================================== */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="relative z-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#240307]/95 via-[#30050e]/90 to-[#190205]/95 border border-amber-500/30 backdrop-blur-md shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Student ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Rex Louie O. Villafuerte"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                    Student ID Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024-00123-CT"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Degree Program & Year Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                    URS Cainta Degree Program *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    {URS_CAINTA_COURSES.map((course) => (
                      <option key={course} value={course} className="bg-[#1e0307] text-white">
                        {course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                    Year Level Standing *
                  </label>
                  <select
                    value={formData.yearLevel}
                    onChange={(e) => setFormData({ ...formData, yearLevel: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Institutional Email & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                    Institutional / URS Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student.id@urs.edu.ph"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                    Contact / Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="09XX-XXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Preferred Committee Assignment (Article VI Bylaws) */}
              <div>
                <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                  Preferred Committee Assignment (Article VI Bylaws) *
                </label>
                <select
                  value={formData.committee}
                  onChange={(e) => setFormData({ ...formData, committee: e.target.value })}
                  className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                >
                  {COMMITTEES.map((comm) => (
                    <option key={comm} value={comm} className="bg-[#1e0307] text-white">
                      {comm}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 5: Statement of Intent */}
              <div>
                <label className="block text-xs font-mono text-amber-300 font-bold mb-1.5 uppercase">
                  Statement of Intent / Goals in SIGMA Society
                </label>
                <textarea
                  rows={3}
                  placeholder="Share what you hope to achieve, learn, or contribute to statistical innovation and research at URS Cainta..."
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="w-full bg-[#160204] border border-amber-500/25 rounded-xl px-3.5 py-2.5 text-xs font-sans text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-rose-200/80 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Applications are reviewed by the SIGMA Executive Board & Faculty Advisers.</span>
                </div>

                <div className="w-full sm:w-auto">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-extrabold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Membership Application</span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="slip"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 p-8 rounded-2xl bg-gradient-to-br from-[#2c0409] via-[#3d0812] to-[#1c0205] border-2 border-amber-400/60 shadow-2xl overflow-hidden"
          >
            <div className="relative z-10">
              {/* Header Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-amber-500/25 mb-6 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">
                      Membership Application Received
                    </h3>
                    <p className="text-xs font-mono text-amber-300 font-bold">
                      STATUS: PENDING SECRETARIAT VERIFICATION · URS CAINTA
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-rose-200">Reference:</span>
                  <code className="text-xs font-mono font-extrabold text-slate-950 bg-amber-400 px-2.5 py-1 rounded shadow-sm">
                    {appReference}
                  </code>
                  <button
                    onClick={handleCopyRef}
                    className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-amber-300 transition-colors border border-amber-500/30 cursor-pointer"
                    title="Copy Reference Code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Digital Slip Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-black/50 border border-amber-500/20 mb-6">
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-rose-300/70 uppercase block">Applicant Full Name</span>
                    <strong className="text-white text-sm font-sans">{formData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-300/70 uppercase block">Student ID Number</span>
                    <span className="text-amber-300 font-bold">{formData.studentId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-300/70 uppercase block">Program & Year</span>
                    <span className="text-rose-100 font-sans">{formData.program} ({formData.yearLevel})</span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-rose-300/70 uppercase block">Membership Category</span>
                    <span className="text-amber-400 font-bold uppercase">Regular Member</span>
                    <p className="text-[11px] text-rose-200 font-sans mt-0.5">• Officially enrolled student at URS Cainta</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-300/70 uppercase block">Assigned Committee Wing</span>
                    <span className="text-rose-100 font-sans">{formData.committee}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-300/70 uppercase block">Campus Location</span>
                    <span className="text-rose-100 font-sans">University of Rizal System – Cainta Campus</span>
                  </div>
                </div>

                {/* Digital Seal */}
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#220408] border border-amber-500/30 text-center font-mono">
                  <div className="w-16 h-16 mb-2">
                    <SigmaOfficialLogo size={64} variant="full" />
                  </div>
                  <span className="text-[9px] text-rose-300/70">OFFICIAL MEMBERSHIP AUDIT SEAL</span>
                  <span className="text-[9px] text-amber-300 font-bold">URS-SIGMA-VERIFIED</span>
                </div>
              </div>

              {/* Next Steps Guide */}
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs font-sans text-rose-100 mb-6 space-y-1">
                <span className="font-mono text-amber-300 text-[10px] uppercase font-bold block mb-1">
                  What Happens Next?
                </span>
                <p>1. Check your email (<strong>{formData.email}</strong>) for your official application receipt and orientation schedules.</p>
                <p>2. Download your signed official application form (PDF) below and submit at URS Cainta Central Lab.</p>
                <p>3. You will receive an invitation to the general assembly and orientation session.</p>
              </div>

              {/* Action Buttons: Prominent PDF Download right after submission */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleOpenPrint}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>Download Official PDF Application</span>
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white font-mono text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit Another Application</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Printable Official Document Modal */}
      <PrintableApplicationModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        formData={formData}
        appReference={appReference || 'SIGMA-URS-CT-2026-DRAFT'}
      />
    </section>
  );
}
