import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, 
  X, 
  FileText, 
  Download, 
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { generateOfficialApplicationPDF } from '../utils/pdfGenerator';
import SigmaOfficialLogo from './SigmaOfficialLogo';
import UrsOfficialSeal from './UrsOfficialSeal';
import { soundFx } from '../utils/sound';

interface PrintableApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
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
  };
  appReference?: string;
}

export default function PrintableApplicationModal({
  isOpen,
  onClose,
  formData,
  appReference = 'SIGMA-APP-2026-DRAFT'
}: PrintableApplicationModalProps) {
  const [printMode, setPrintMode] = useState<'filled' | 'blank'>('filled');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playChime();
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      soundFx.playBlip(750, 0.02);

      const isBlank = printMode === 'blank';
      const pdf = generateOfficialApplicationPDF(formData, appReference, isBlank);
      
      const applicantSlug = (!isBlank && formData.fullName ? formData.fullName : 'Blank_Template').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `SIGMA_Membership_Application_${applicantSlug}_2026.pdf`;
      
      pdf.save(filename);

      soundFx.playChime();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const isFilled = printMode === 'filled';
  const name = isFilled ? (formData.fullName || '________________________________________') : '';
  const studentNum = isFilled ? (formData.studentId || '_____________________') : '';
  const course = isFilled ? formData.program : '';
  const yearLvl = isFilled ? formData.yearLevel : '';
  const emailAddr = isFilled ? formData.email : '';
  const contactNo = isFilled ? (formData.phone || 'N/A') : '';
  const committeeWing = isFilled ? formData.committee : '';
  const stmt = isFilled ? formData.statement : '';

  const committeeList = [
    { name: 'Research and Data Analytics Committee', desc: 'Oversees research projects, data collection, and analytics initiatives.' },
    { name: 'Academic and Training Committee', desc: 'Leads academic support programs, trainings, and workshops.' },
    { name: 'Events and Programs Committee', desc: 'Plans and executes Society events, programs, and community activities.' },
    { name: 'Technical and IT Committee', desc: 'Manages IT systems, technical support, and digital platforms.' },
    { name: 'Membership and Outreach Committee', desc: 'Handles recruitment, member engagement, and outreach initiatives.' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#1c0205] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
        >
          {/* Modal Screen-Only Header Bar (Hidden during Print) */}
          <div className="no-print p-4 sm:p-5 bg-gradient-to-r from-[#2c0409] via-[#3a0711] to-[#1f0206] border-b border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white flex items-center gap-2">
                  <span>Official Application Document</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                    Form SIGMA-AF-01
                  </span>
                </h3>
                <p className="text-xs text-rose-200/80 font-sans">
                  Ready to download as PDF or print for official submission at URS Cainta Central Lab.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Mode Switcher */}
              <div className="bg-black/50 p-1 rounded-xl border border-amber-500/20 flex text-xs font-mono">
                <button
                  onClick={() => setPrintMode('filled')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    printMode === 'filled'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-rose-200 hover:text-white'
                  }`}
                >
                  Pre-filled Form
                </button>
                <button
                  onClick={() => setPrintMode('blank')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    printMode === 'blank'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-rose-200 hover:text-white'
                  }`}
                >
                  Blank Template
                </button>
              </div>

              {/* Download PDF Action */}
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>PDF Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download PDF File</span>
                  </>
                )}
              </button>

              {/* Print Action */}
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center gap-1.5 border border-white/20 cursor-pointer"
                title="System Print dialog"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition-colors cursor-pointer"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Container (Styled as official crisp paper document with inline standard colors) */}
          <div 
            className="flex-1 overflow-y-auto p-3 sm:p-8"
            style={{ backgroundColor: '#e2e8f0', color: '#0f172a' }}
          >
            <div 
              id="printable-application-doc"
              className="max-w-[780px] mx-auto p-6 sm:p-10 rounded shadow-md text-[11px] leading-snug"
              style={{
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                minHeight: '1000px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              {/* Header with Dual Seals */}
              <div 
                className="flex items-center justify-between pb-4 mb-4"
                style={{ borderBottom: '2px solid #0f172a' }}
              >
                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <UrsOfficialSeal size={74} />
                </div>

                <div className="text-center flex-1 px-3">
                  <div className="text-[10px] uppercase font-semibold tracking-wider" style={{ color: '#475569' }}>
                    Republic of the Philippines
                  </div>
                  <div className="text-[13px] font-bold uppercase font-serif tracking-wide" style={{ color: '#0f172a' }}>
                    University of Rizal System
                  </div>
                  <div className="text-[10px] font-medium" style={{ color: '#334155' }}>
                    Cainta Campus · Cainta, Rizal
                  </div>
                  <div className="mt-1 text-[11px] font-bold uppercase font-serif tracking-wider" style={{ color: '#6e111f' }}>
                    Statistical Innovation and Growth in Mathematical Advancement Society
                  </div>
                  <div className="text-[9.5px] font-mono font-bold tracking-widest mt-0.5" style={{ color: '#1e293b' }}>
                    — S . I . G . M . A .  S O C I E T Y —
                  </div>
                </div>

                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <SigmaOfficialLogo size={74} variant="full" />
                </div>
              </div>

              {/* Form Title & Control Code */}
              <div 
                className="p-2 mb-4 rounded flex items-center justify-between"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}
              >
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#0f172a' }}>
                    Official Application for Regular Membership
                  </h2>
                  <span className="text-[9.5px]" style={{ color: '#475569' }}>
                    Academic Year 2026 – 2027 · General Admissions
                  </span>
                </div>
                <div className="text-right font-mono text-[9px]">
                  <div className="font-bold" style={{ color: '#6e111f' }}>REF: {appReference}</div>
                  <div style={{ color: '#64748b' }}>FORM SIGMA-AF-01</div>
                </div>
              </div>

              {/* SECTION I: APPLICANT DEMOGRAPHICS */}
              <div className="mb-4">
                <div 
                  className="font-bold text-[10px] uppercase px-2 py-0.5 tracking-wider mb-2"
                  style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                >
                  I. Applicant Information
                </div>

                <table 
                  className="w-full text-[10px]"
                  style={{ borderCollapse: 'collapse', border: '1px solid #cbd5e1' }}
                >
                  <tbody>
                    <tr>
                      <td 
                        className="p-1.5 font-semibold w-1/4"
                        style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155' }}
                      >
                        Full Name:
                      </td>
                      <td 
                        className="p-1.5 font-bold uppercase"
                        colSpan={3}
                        style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
                      >
                        {name || '____________________________________________________________________'}
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="p-1.5 font-semibold"
                        style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155' }}
                      >
                        Student ID No.:
                      </td>
                      <td 
                        className="p-1.5 font-mono font-bold"
                        style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
                      >
                        {studentNum || '____________________'}
                      </td>
                      <td 
                        className="p-1.5 font-semibold w-1/5"
                        style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155' }}
                      >
                        Year Level:
                      </td>
                      <td 
                        className="p-1.5 font-bold"
                        style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
                      >
                        {yearLvl || '____________________'}
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="p-1.5 font-semibold"
                        style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155' }}
                      >
                        Degree / Program:
                      </td>
                      <td 
                        className="p-1.5 font-bold"
                        colSpan={3}
                        style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
                      >
                        {course || '____________________________________________________________________'}
                      </td>
                    </tr>
                    <tr>
                      <td 
                        className="p-1.5 font-semibold"
                        style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155' }}
                      >
                        Email Address:
                      </td>
                      <td 
                        className="p-1.5 font-mono"
                        style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
                      >
                        {emailAddr || '___________________________________'}
                      </td>
                      <td 
                        className="p-1.5 font-semibold"
                        style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', color: '#334155' }}
                      >
                        Contact No.:
                      </td>
                      <td 
                        className="p-1.5 font-mono"
                        style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}
                      >
                        {contactNo || '____________________'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SECTION II: MEMBERSHIP CLASSIFICATION */}
              <div className="mb-4">
                <div 
                  className="font-bold text-[10px] uppercase px-2 py-0.5 tracking-wider mb-2"
                  style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                >
                  II. Membership Classification
                </div>

                <div 
                  className="p-2 rounded text-[10px] flex items-center justify-between"
                  style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}
                >
                  <div>
                    <strong className="font-bold text-[10.5px]" style={{ color: '#6e111f' }}>
                      [✓] Regular Member
                    </strong>
                    <p className="text-[9.5px]" style={{ color: '#334155' }}>
                      Officially enrolled student at URS Cainta Campus participating in mathematical innovation, statistics, data analytics, and society governance.
                    </p>
                  </div>
                  <span 
                    className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#475569' }}
                  >
                    ENROLLED STUDENT
                  </span>
                </div>
              </div>

              {/* SECTION III: COMMITTEE PREFERENCE */}
              <div className="mb-4">
                <div 
                  className="font-bold text-[10px] uppercase px-2 py-0.5 tracking-wider mb-2"
                  style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                >
                  III. Committee Placement Preference
                </div>

                <div 
                  className="rounded text-[9.5px]"
                  style={{ border: '1px solid #cbd5e1' }}
                >
                  {committeeList.map((comm) => {
                    const isSelected = isFilled && formData.committee === comm.name;
                    return (
                      <div 
                        key={comm.name} 
                        className="flex items-start gap-2 p-1"
                        style={{ borderBottom: '1px solid #e2e8f0' }}
                      >
                        <span 
                          className="w-3.5 h-3.5 flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0"
                          style={{ border: '1px solid #475569', color: '#6e111f' }}
                        >
                          {isSelected ? '✓' : ''}
                        </span>
                        <div className="flex-1">
                          <strong style={{ color: isSelected ? '#6e111f' : '#0f172a', fontWeight: 'bold' }}>
                            {comm.name}
                          </strong>
                          <span className="text-[9px] ml-1.5" style={{ color: '#64748b' }}>— {comm.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION IV: STATEMENT OF INTENT */}
              <div className="mb-4">
                <div 
                  className="font-bold text-[10px] uppercase px-2 py-0.5 tracking-wider mb-2"
                  style={{ backgroundColor: '#1e293b', color: '#ffffff' }}
                >
                  IV. Statement of Intent & Goals in SIGMA
                </div>

                <div 
                  className="p-2.5 rounded text-[10px] min-h-[55px]"
                  style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1' }}
                >
                  <span className="font-semibold block mb-1" style={{ color: '#334155' }}>
                    Applicant Statement of Purpose / Contribution to the Society:
                  </span>
                  <p className="text-[10px] italic font-serif leading-relaxed" style={{ color: '#475569' }}>
                    {stmt || '(Applicant may write their statement or leave blank for on-site review at URS Cainta Central Lab)'}
                  </p>
                </div>
              </div>

              {/* SECTION V: CONSTITUTIONAL PLEDGE & SIGNATURE */}
              <div 
                className="mb-4 p-2.5 rounded text-[9.5px]"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}
              >
                <div className="font-bold mb-1 uppercase tracking-wide" style={{ color: '#0f172a' }}>
                  V. Member's Pledge of Commitment
                </div>
                <p className="text-justify mb-3 italic" style={{ color: '#334155' }}>
                  "I hereby apply for membership in the Statistical Innovation and Growth in Mathematical Advancement (SIGMA) Society. If accepted, I pledge to uphold its Constitution and Bylaws, actively participate in society research colloquia, workshops, and general assemblies, and represent the University of Rizal System – Cainta Campus with academic excellence and integrity."
                </p>

                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="text-center">
                    <div 
                      className="pb-0.5 font-bold uppercase"
                      style={{ borderBottom: '1px solid #0f172a', color: '#0f172a' }}
                    >
                      {name || ''}
                    </div>
                    <span className="text-[8.5px] uppercase" style={{ color: '#64748b' }}>
                      Applicant's Signature over Printed Name
                    </span>
                  </div>

                  <div className="text-center">
                    <div 
                      className="pb-0.5 font-mono"
                      style={{ borderBottom: '1px solid #0f172a', color: '#0f172a' }}
                    >
                      {isFilled ? currentDate : ''}
                    </div>
                    <span className="text-[8.5px] uppercase" style={{ color: '#64748b' }}>
                      Date Signed
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION VI: ENDORSEMENTS & COMMITTEE ACTION */}
              <div 
                className="p-2.5 rounded text-[9.5px]"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1' }}
              >
                <div 
                  className="font-bold uppercase mb-2 flex justify-between pb-1"
                  style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}
                >
                  <span>VI. Action of the SIGMA Executive Board & Advisers</span>
                  <span className="font-mono text-[9px]" style={{ color: '#64748b' }}>[ ] APPROVED   [ ] PENDING VERIFICATION</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-3 text-center">
                  <div>
                    <div 
                      className="pb-0.5 font-bold text-[9.5px]"
                      style={{ borderBottom: '1px solid #0f172a', color: '#0f172a' }}
                    >
                      Lyza S. Tesorero
                    </div>
                    <span className="text-[8px] uppercase block font-semibold" style={{ color: '#334155' }}>
                      Membership & Outreach Head
                    </span>
                    <span className="text-[7.5px] uppercase" style={{ color: '#64748b' }}>
                      Evaluated & Verified
                    </span>
                  </div>

                  <div>
                    <div 
                      className="pb-0.5 font-bold text-[9.5px]"
                      style={{ borderBottom: '1px solid #0f172a', color: '#0f172a' }}
                    >
                      John Rex Louie O. Villafuerte
                    </div>
                    <span className="text-[8px] uppercase block font-semibold" style={{ color: '#334155' }}>
                      President, SIGMA Society
                    </span>
                    <span className="text-[7.5px] uppercase" style={{ color: '#64748b' }}>
                      Executive Approval
                    </span>
                  </div>

                  <div>
                    <div 
                      className="pb-0.5 font-bold text-[9.5px]"
                      style={{ borderBottom: '1px solid #0f172a', color: '#0f172a' }}
                    >
                      Prof. Jandee G. Dolores
                    </div>
                    <span className="text-[8px] uppercase block font-semibold" style={{ color: '#334155' }}>
                      Faculty Adviser
                    </span>
                    <span className="text-[7.5px] uppercase" style={{ color: '#64748b' }}>
                      Institutional Endorsement
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Footer */}
              <div 
                className="mt-3 pt-2 flex justify-between text-[8px] font-mono"
                style={{ borderTop: '1px solid #cbd5e1', color: '#64748b' }}
              >
                <span>FORM SIGMA-AF-01 · URS CAINTA CAMPUS</span>
                <span>OFFICIAL STUDENT ORGANIZATION RECORD · PAGE 1 OF 1</span>
                <span>STATISTICAL INNOVATION AND GROWTH</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
