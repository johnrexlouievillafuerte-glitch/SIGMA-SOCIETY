import { jsPDF } from 'jspdf';

export interface ApplicationFormData {
  fullName: string;
  studentId: string;
  program: string;
  yearLevel: string;
  email: string;
  phone: string;
  trackId: string;
  interests?: string[];
  committee: string;
  statement: string;
}

export function generateOfficialApplicationPDF(
  formData: ApplicationFormData,
  appReference = 'SIGMA-URS-CT-2026-DRAFT',
  isBlank = false
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // Colors (Maroon, Gold, Dark Gray, Light Gray)
  const maroon = [110, 17, 31] as const;
  const darkGray = [30, 41, 59] as const;
  const mediumGray = [100, 116, 139] as const;
  const lightBg = [248, 250, 252] as const;

  // Header Border Box
  doc.setDrawColor(maroon[0], maroon[1], maroon[2]);
  doc.setLineWidth(0.8);
  doc.line(margin, y + 26, margin + contentWidth, y + 26);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 27.5, margin + contentWidth, y + 27.5);

  // Header Titles
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('REPUBLIC OF THE PHILIPPINES', pageWidth / 2, y + 4, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('UNIVERSITY OF RIZAL SYSTEM', pageWidth / 2, y + 9, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('Cainta Campus · Cainta, Rizal', pageWidth / 2, y + 13, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(maroon[0], maroon[1], maroon[2]);
  doc.text('STATISTICAL INNOVATION AND GROWTH IN MATHEMATICAL ADVANCEMENT', pageWidth / 2, y + 18, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('— S . I . G . M . A .   S O C I E T Y —', pageWidth / 2, y + 22.5, { align: 'center' });

  y += 32;

  // Document Title Banner Box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 11, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('OFFICIAL APPLICATION FOR REGULAR MEMBERSHIP', margin + 3, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('Academic Year 2026 – 2027 · General Admissions', margin + 3, y + 9);

  doc.setFont('courier', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(maroon[0], maroon[1], maroon[2]);
  doc.text(`REF: ${appReference}`, margin + contentWidth - 3, y + 5, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('FORM SIGMA-AF-01', margin + contentWidth - 3, y + 9, { align: 'right' });

  y += 15;

  const drawSectionHeader = (title: string, curY: number) => {
    doc.setFillColor(30, 41, 59);
    doc.rect(margin, curY, contentWidth, 4.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 2.5, curY + 3.2);
    return curY + 6;
  };

  // ================= SECTION I =================
  y = drawSectionHeader('I. Applicant Information', y);

  const nameVal = isBlank ? '' : (formData.fullName || '');
  const idVal = isBlank ? '' : (formData.studentId || '');
  const yrVal = isBlank ? '' : (formData.yearLevel || '');
  const progVal = isBlank ? '' : (formData.program || '');
  const emailVal = isBlank ? '' : (formData.email || '');
  const phoneVal = isBlank ? '' : (formData.phone || '');

  // Table Grid
  const rowHeight = 6.5;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.2);

  // Row 1: Full Name
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, 35, rowHeight, 'FD');
  doc.rect(margin + 35, y, contentWidth - 35, rowHeight, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Full Name:', margin + 2, y + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.text(nameVal.toUpperCase(), margin + 38, y + 4.5);

  y += rowHeight;

  // Row 2: Student ID & Year Level
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, 35, rowHeight, 'FD');
  doc.rect(margin + 35, y, 55, rowHeight, 'D');
  doc.rect(margin + 90, y, 30, rowHeight, 'FD');
  doc.rect(margin + 120, y, contentWidth - 120, rowHeight, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Student ID No.:', margin + 2, y + 4.5);
  doc.setFont('courier', 'bold');
  doc.text(idVal, margin + 38, y + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.text('Year Level:', margin + 92, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text(yrVal, margin + 123, y + 4.5);

  y += rowHeight;

  // Row 3: Program
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, 35, rowHeight, 'FD');
  doc.rect(margin + 35, y, contentWidth - 35, rowHeight, 'D');

  doc.setFont('helvetica', 'bold');
  doc.text('Degree / Program:', margin + 2, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text(progVal, margin + 38, y + 4.5);

  y += rowHeight;

  // Row 4: Email & Phone
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, 35, rowHeight, 'FD');
  doc.rect(margin + 35, y, 55, rowHeight, 'D');
  doc.rect(margin + 90, y, 30, rowHeight, 'FD');
  doc.rect(margin + 120, y, contentWidth - 120, rowHeight, 'D');

  doc.setFont('helvetica', 'bold');
  doc.text('Email Address:', margin + 2, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text(emailVal, margin + 38, y + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.text('Contact No.:', margin + 92, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text(phoneVal, margin + 123, y + 4.5);

  y += rowHeight + 4;

  // ================= SECTION II =================
  y = drawSectionHeader('II. Membership Classification', y);

  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(margin, y, contentWidth, 10, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(maroon[0], maroon[1], maroon[2]);
  doc.text('[ X ]  REGULAR MEMBER', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Officially enrolled student at University of Rizal System – Cainta Campus participating in mathematical innovation,', margin + 3, y + 8);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('STATUS: ACTIVE ENROLLED', margin + contentWidth - 3, y + 4.5, { align: 'right' });

  y += 13;

  // ================= SECTION III =================
  y = drawSectionHeader('III. Committee Placement Preference', y);

  const committees = [
    { name: 'Research and Data Analytics Committee', desc: 'Oversees research projects, data collection, and analytics initiatives.' },
    { name: 'Academic and Training Committee', desc: 'Leads academic support programs, trainings, and workshops.' },
    { name: 'Events and Programs Committee', desc: 'Plans and executes Society events, programs, and community activities.' },
    { name: 'Technical and IT Committee', desc: 'Manages IT systems, technical support, and digital platforms.' },
    { name: 'Membership and Outreach Committee', desc: 'Handles recruitment, member engagement, and outreach initiatives.' }
  ];

  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 26, 1, 1, 'FD');

  let commY = y + 4;
  committees.forEach((comm) => {
    const isChecked = !isBlank && formData.committee === comm.name;
    
    // Checkbox box
    doc.setDrawColor(100, 116, 139);
    doc.rect(margin + 3, commY - 2.5, 3, 3, 'D');
    if (isChecked) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(maroon[0], maroon[1], maroon[2]);
      doc.text('X', margin + 3.7, commY - 0.2);
    }

    doc.setFont('helvetica', isChecked ? 'bold' : 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(isChecked ? maroon[0] : darkGray[0], isChecked ? maroon[1] : darkGray[1], isChecked ? maroon[2] : darkGray[2]);
    doc.text(comm.name, margin + 8, commY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    doc.text(`— ${comm.desc}`, margin + 65, commY);

    commY += 4.8;
  });

  y += 29;

  // ================= SECTION IV =================
  y = drawSectionHeader('IV. Statement of Intent & Goals in SIGMA', y);

  // Statement Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 22, 1, 1, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Applicant Statement of Purpose / Contribution to the Society:', margin + 3, y + 4);

  const statementVal = !isBlank && formData.statement ? formData.statement : '(Applicant may write their statement or leave blank for on-site review at URS Cainta Central Lab)';
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  const splitStatement = doc.splitTextToSize(statementVal, contentWidth - 6);
  doc.text(splitStatement, margin + 3, y + 8.5);

  y += 25;

  // ================= SECTION V =================
  y = drawSectionHeader("V. Member's Pledge of Commitment", y);

  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 1, 1, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const pledge = '"I hereby apply for membership in the Statistical Innovation and Growth in Mathematical Advancement (SIGMA) Society. If accepted, I pledge to uphold its Constitution and Bylaws, actively participate in society research colloquia, workshops, and general assemblies, and represent the University of Rizal System – Cainta Campus with academic excellence and integrity."';
  const splitPledge = doc.splitTextToSize(pledge, contentWidth - 6);
  doc.text(splitPledge, margin + 3, y + 4);

  // Signature Lines
  const curDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const sigY = y + 16;

  doc.setDrawColor(71, 85, 105);
  doc.line(margin + 10, sigY + 3, margin + 80, sigY + 3);
  doc.line(margin + 100, sigY + 3, margin + contentWidth - 10, sigY + 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text(nameVal.toUpperCase(), margin + 45, sigY + 2, { align: 'center' });
  doc.text(!isBlank ? curDate : '', margin + contentWidth - 55, sigY + 2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text("APPLICANT'S SIGNATURE OVER PRINTED NAME", margin + 45, sigY + 6, { align: 'center' });
  doc.text("DATE SIGNED", margin + contentWidth - 55, sigY + 6, { align: 'center' });

  y += 27;

  // ================= SECTION VI =================
  y = drawSectionHeader('VI. Action of the SIGMA Executive Board & Advisers', y);

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 22, 1, 1, 'FD');

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('[  ] APPROVED       [  ] PENDING VERIFICATION       [  ] FOR RE-SUBMISSION', margin + 3, y + 4);

  const endSigY = y + 14;
  const colW = contentWidth / 3;

  // Signatory 1
  doc.setDrawColor(71, 85, 105);
  doc.line(margin + 5, endSigY, margin + colW - 5, endSigY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Lyza S. Tesorero', margin + colW / 2, endSigY - 1, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('MEMBERSHIP & OUTREACH HEAD', margin + colW / 2, endSigY + 2.5, { align: 'center' });
  doc.text('Evaluated & Verified', margin + colW / 2, endSigY + 5, { align: 'center' });

  // Signatory 2
  doc.line(margin + colW + 5, endSigY, margin + colW * 2 - 5, endSigY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('John Rex Louie O. Villafuerte', margin + colW * 1.5, endSigY - 1, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('PRESIDENT, SIGMA SOCIETY', margin + colW * 1.5, endSigY + 2.5, { align: 'center' });
  doc.text('Executive Approval', margin + colW * 1.5, endSigY + 5, { align: 'center' });

  // Signatory 3
  doc.line(margin + colW * 2 + 5, endSigY, margin + contentWidth - 5, endSigY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Prof. Jandee G. Dolores', margin + colW * 2.5, endSigY - 1, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('FACULTY ADVISER', margin + colW * 2.5, endSigY + 2.5, { align: 'center' });
  doc.text('Institutional Endorsement', margin + colW * 2.5, endSigY + 5, { align: 'center' });

  y += 24;

  // Footer line
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, y, margin + contentWidth, y);
  doc.setFont('courier', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('FORM SIGMA-AF-01 · URS CAINTA CAMPUS', margin, y + 3);
  doc.text('OFFICIAL STUDENT ORGANIZATION RECORD · PAGE 1 OF 1', pageWidth / 2, y + 3, { align: 'center' });
  doc.text('STATISTICAL INNOVATION AND GROWTH', margin + contentWidth, y + 3, { align: 'right' });

  return doc;
}
