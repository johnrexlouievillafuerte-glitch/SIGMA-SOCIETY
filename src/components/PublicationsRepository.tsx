import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Download, Copy, Check, ArrowUpRight, X, ShieldCheck } from 'lucide-react';
import { RESEARCH_PAPERS } from '../data/organizationData';
import { ResearchPaper } from '../types';
import { soundFx } from '../utils/sound';

export default function PublicationsRepository() {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePaper, setActivePaper] = useState<ResearchPaper | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const domains = [
    'all',
    'High-Dimensional Inference',
    'Causal Discovery & DAGs',
    'Biostatistics & Genomics',
    'Econometrics & Risk'
  ];

  const filteredPapers = useMemo(() => {
    return RESEARCH_PAPERS.filter((paper) => {
      const matchesDomain = selectedDomain === 'all' || paper.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        paper.title.toLowerCase().includes(q) ||
        paper.authors.some((a) => a.toLowerCase().includes(q)) ||
        paper.abstract.toLowerCase().includes(q) ||
        paper.doi.toLowerCase().includes(q);
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchQuery]);

  const copyCitation = (format: 'bibtex' | 'apa' | 'ieee', paper: ResearchPaper) => {
    let citation = '';
    const firstAuthor = paper.authors[0] || 'SIGMA URS Cainta Research Group';
    const year = paper.date.split(' ').pop() || '2026';

    if (format === 'bibtex') {
      citation = `@article{sigma_urs_${paper.id.replace(/-/g, '_')},
  title={${paper.title}},
  author={${paper.authors.join(' and ')}},
  journal={SIGMA Society Research Papers - URS Cainta},
  year={${year}},
  doi={${paper.doi}}
}`;
    } else if (format === 'apa') {
      citation = `${paper.authors.join(', ')} (${year}). ${paper.title}. SIGMA Society Research Papers, University of Rizal System. https://doi.org/${paper.doi}`;
    } else {
      citation = `${firstAuthor} et al., "${paper.title}," SIGMA Society Research Papers · URS Cainta, ${year}, doi: ${paper.doi}.`;
    }

    navigator.clipboard.writeText(citation);
    setCopiedFormat(format);
    soundFx.playChime();
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handleDownloadPaper = (paper: ResearchPaper) => {
    soundFx.playComputePulse();
    const content = `SIGMA SOCIETY OPEN-ACCESS PRE-PRINT · URS CAINTA
=====================================================
Title: ${paper.title}
Authors: ${paper.authors.join(', ')}
Affiliation: SIGMA - University of Rizal System, Cainta Campus
Domain: ${paper.domain}
Date: ${paper.date}
DOI: https://doi.org/${paper.doi}
Reproducibility Verification: ${paper.reproducibilityScore}% Verified Artifact
Sample Space: ${paper.sampleSize}
Statistical Significance: ${paper.pMetric}

ABSTRACT:
${paper.abstract}

KEY MATHEMATICAL FORMULATION:
${paper.keyEquation}
Note: ${paper.equationDescription}

DATASET:
${paper.datasetName}
CODE REPOSITORY:
${paper.codeRepo}

Citations: ${paper.citations}
University of Rizal System - Cainta Campus · Open Science Initiative
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIGMA-URS-${paper.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="publications" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Dispatches · URS Cainta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Research Papers & Pre-Prints
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Peer-reviewed empirical monographs, theoretical proofs, and institutional studies conducted by SIGMA student fellows and faculty advisers.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Docker Verified & Open Data</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search papers by keyword, author, or DOI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/40 border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => {
                setSelectedDomain(dom);
                soundFx.playBlip(540, 0.02);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                selectedDomain === dom
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'bg-slate-900/30 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {dom === 'all' ? 'All Fields' : dom}
            </button>
          ))}
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-3">
        {filteredPapers.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-900/20 border border-white/[0.06] text-slate-400 font-mono text-xs">
            No papers match the specified query filters.
          </div>
        ) : (
          filteredPapers.map((paper, idx) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => {
                setActivePaper(paper);
                soundFx.playBlip(620, 0.03);
              }}
              className="group cursor-pointer rounded-xl bg-slate-900/30 border border-white/[0.06] hover:border-cyan-500/30 p-4 sm:p-5 transition-all duration-150"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="text-cyan-400 font-semibold">{paper.domain}</span>
                    <span className="text-slate-600">·</span>
                    <span>{paper.date}</span>
                    <span className="text-slate-600">·</span>
                    <span>DOI: {paper.doi}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-emerald-400">{paper.reproducibilityScore}% Verified</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-cyan-200 transition-colors mb-1.5 leading-snug">
                    {paper.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-2 font-mono">
                    Authors: {paper.authors.join(', ')}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans mb-3">
                    {paper.abstract}
                  </p>

                  <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-[11px] text-cyan-300 overflow-x-auto truncate">
                    {paper.keyEquation}
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2.5 pt-2.5 md:pt-0 border-t md:border-t-0 border-white/[0.06] shrink-0">
                  <div className="text-left md:text-right font-mono text-xs">
                    <span className="text-slate-500 block text-[9px] uppercase">Citations</span>
                    <span className="text-white font-bold">{paper.citations}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadPaper(paper);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-cyan-300 transition-colors"
                      title="Download Pre-Print text"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Examine</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Paper Detailed Modal */}
      <AnimatePresence>
        {activePaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#070b16] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl text-left"
            >
              <button
                onClick={() => {
                  setActivePaper(null);
                  soundFx.playBlip(400, 0.03);
                }}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400 mb-1.5">
                <span className="text-cyan-400 font-semibold">{activePaper.domain}</span>
                <span className="text-slate-600">·</span>
                <span>{activePaper.date}</span>
                <span className="text-slate-600">·</span>
                <span className="text-emerald-400">{activePaper.reproducibilityScore}% Verified</span>
              </div>

              <h2 className="text-lg sm:text-xl font-display font-bold text-white mb-2 leading-snug">
                {activePaper.title}
              </h2>

              <p className="text-xs font-mono text-slate-400 mb-4">
                Authors: {activePaper.authors.join(' · ')}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2.5 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs mb-5">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Sample Space</span>
                  <span className="text-white font-medium text-[11px] truncate block">{activePaper.sampleSize}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">p-Value</span>
                  <span className="text-emerald-400 font-bold text-[11px]">{activePaper.pMetric}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">DOI</span>
                  <span className="text-cyan-300 text-[11px] truncate block">{activePaper.doi}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Code Repo</span>
                  <span className="text-slate-300 text-[11px] truncate block">{activePaper.codeRepo}</span>
                </div>
              </div>

              {/* Abstract */}
              <div className="mb-5">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Scientific Abstract
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-900/40 p-3.5 rounded-xl border border-white/[0.06]">
                  {activePaper.abstract}
                </p>
              </div>

              {/* Mathematical Formulation */}
              <div className="mb-5">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Invariant Mathematical Formulation
                </h4>
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06]">
                  <div className="font-mono text-cyan-300 text-xs sm:text-sm font-semibold mb-1.5 overflow-x-auto py-1">
                    {activePaper.keyEquation}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans border-t border-white/[0.06] pt-1.5">
                    {activePaper.equationDescription}
                  </p>
                </div>
              </div>

              {/* Citation Exporter */}
              <div className="mb-5 p-3.5 rounded-xl bg-slate-900/40 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-300 font-medium uppercase tracking-wider">
                    Copy Academic Citation
                  </span>
                  {copiedFormat && (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Copied {copiedFormat.toUpperCase()}!</span>
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyCitation('bibtex', activePaper)}
                    className="px-2.5 py-1 rounded bg-black/50 border border-white/[0.08] hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3 text-cyan-400" />
                    <span>BibTeX</span>
                  </button>
                  <button
                    onClick={() => copyCitation('apa', activePaper)}
                    className="px-2.5 py-1 rounded bg-black/50 border border-white/[0.08] hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3 text-cyan-400" />
                    <span>APA</span>
                  </button>
                  <button
                    onClick={() => copyCitation('ieee', activePaper)}
                    className="px-2.5 py-1 rounded bg-black/50 border border-white/[0.08] hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3 text-cyan-400" />
                    <span>IEEE</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => handleDownloadPaper(activePaper)}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Pre-Print Document</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
