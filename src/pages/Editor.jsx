import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch, authHeader } from '../lib/api';
import AppHeader from '../components/AppHeader';
import ResumeForm from '../components/ResumeForm';

import {
  TemplateClassic,
  TemplateModern,
  TemplateSidebar,
  TemplateMinimalist,
  TemplateBoldAccent,
  TemplateExecutive
} from '../templates/AiResumeTemplates';

const AI_TEMPLATES = [
  { id: 'classic-ai', label: 'Classic', Component: TemplateClassic },
  { id: 'modern-ai', label: 'Modern Dark', Component: TemplateModern },
  { id: 'sidebar-ai', label: 'Two Column', Component: TemplateSidebar },
  { id: 'minimalist-ai', label: 'Minimalist', Component: TemplateMinimalist },
  { id: 'bold-ai', label: 'Bold Accent', Component: TemplateBoldAccent },
  { id: 'executive-ai', label: 'Executive', Component: TemplateExecutive },
];

export default function Editor() {
  const { user, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const [sourceFile, setSourceFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('classic-ai');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pageMode, setPageMode] = useState('multi');
  const [pageDensity, setPageDensity] = useState('normal');
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    if (!resumeRef.current || pageMode !== 'single') { setIsOverflowing(false); return; }
    const observer = new ResizeObserver(([entry]) => {
      setIsOverflowing(entry.target.scrollHeight > entry.target.clientHeight + 5);
    });
    observer.observe(resumeRef.current);
    return () => observer.disconnect();
  }, [resumeData, pageMode, selectedTemplate, pageDensity]);

  const activeTemplate = AI_TEMPLATES.find((t) => t.id === selectedTemplate) || AI_TEMPLATES[0];
  const ActiveComponent = activeTemplate.Component;

  const handleSubmit = async () => {
    if (!sourceFile) return alert('Please upload a PDF file first.');
    setLoading(true);
    setErrorMsg('');
    const formData = new FormData();
    formData.append('source', sourceFile);
    formData.append('pageMode', pageMode);
    try {
      const res = await apiFetch('/api/process-pdf', {
        method: 'POST',
        headers: authHeader(),
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to process PDF.');
      if (data.data?.layoutSuggested) setPageDensity(data.data.layoutSuggested);
      setResumeData(data.data);
      await refreshUserData();
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    const { default: html2canvas } = await import('html2canvas');
    const { jsPDF } = await import('jspdf');
    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('resume.pdf');
  };

  const downloadImage = async () => {
    if (!resumeRef.current) return;
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'resume.png';
    link.click();
  };

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-100 overflow-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-50"><AppHeader /></div>

      {resumeData ? (
        <>
          {/* Control Bar */}
          <div className="relative z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Density:</span>
                <div className="flex bg-black/30 rounded-md p-1">
                  {['compact', 'normal', 'spacious'].map((d) => (
                    <button key={d} onClick={() => setPageDensity(d)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${pageDensity === d ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {isOverflowing && pageMode === 'single' && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg text-red-400 text-xs animate-pulse">
                  ⚠️ Page Overflow
                  <button onClick={() => setPageDensity('compact')} className="underline font-bold hover:text-red-300">Fix</button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsFormOpen(true)} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-bold transition-all">
                ✏️ Edit Content
              </button>
              <button onClick={downloadImage} className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-bold transition-all">
                🖼️ PNG
              </button>
              <button onClick={downloadPDF} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
                📄 PDF
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 flex overflow-hidden relative z-10">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-950/50 backdrop-blur-md border-r border-white/10 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">AI Templates</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {AI_TEMPLATES.map(({ id, label, Component }) => (
                  <div key={id} onClick={() => setSelectedTemplate(id)}
                    className={`group relative cursor-pointer flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${selectedTemplate === id ? 'bg-blue-600/20 border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                  >
                    <div className="w-full aspect-[210/297] overflow-hidden rounded-lg border border-white/10 mb-2 pointer-events-none">
                      <div className="w-[210mm] min-h-[297mm] transform scale-[0.18] origin-top-left bg-white p-4">
                        <Component data={resumeData} density={pageDensity} />
                      </div>
                    </div>
                    <span className={`text-[12px] font-bold ${selectedTemplate === id ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`}>{label}</span>
                  </div>
                ))}
              </div>
            </aside>

            {/* Resume Canvas */}
            <main className="flex-1 overflow-y-auto bg-slate-900/40 p-12 flex justify-center items-start">
              <div
                ref={resumeRef}
                style={{
                  width: '210mm', height: pageMode === 'single' ? '297mm' : 'auto',
                  minHeight: '297mm', background: 'white', padding: '15mm 20mm',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative', color: '#1e293b',
                }}
              >
                <ActiveComponent data={resumeData} density={pageDensity} />
              </div>
            </main>
          </div>
        </>
      ) : (
        /* Upload / Initial state */
        <div className="flex-1 overflow-y-auto relative z-10 flex items-center justify-center p-6">
          <div className="max-w-4xl w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-12 shadow-2xl">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                AI Resume Intelligence
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                Professional AI<br />Resume Redesigner
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Upload your existing resume PDF, let AI parse and reformat it, then apply one of 6 premium templates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black/20 rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all group">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400">📤</span>
                  Upload Resume PDF
                </h3>
                <div className="relative mt-4">
                  <input type="file" accept="application/pdf"
                    onChange={(e) => setSourceFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-white/10 group-hover:border-blue-500/50 rounded-xl p-8 text-center transition-all bg-white/[0.02]">
                    <p className="text-slate-400 text-sm">
                      {sourceFile ? `✅ ${sourceFile.name}` : 'Drop your PDF here or click to browse'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400">⚙️</span>
                    Extraction Strategy
                  </h3>
                  <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/5">
                    {['single', 'multi'].map((m) => (
                      <button key={m} onClick={() => setPageMode(m)}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all ${pageMode === m ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                      >
                        {m === 'single' ? 'Single Page' : 'Multi Page'}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-4 leading-normal italic">
                  * Single page mode uses AI to condense content into one balanced A4 layout.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                onClick={handleSubmit}
                disabled={loading || !sourceFile}
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-700 rounded-2xl text-lg font-black transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95"
              >
                {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> AI is processing...</> : '🚀 Generate Resume'}
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full md:w-auto px-12 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-lg font-bold transition-all"
              >
                ✏️ Create from Scratch
              </button>
            </div>
            {errorMsg && <p className="text-center text-red-400 mt-6 font-bold">{errorMsg}</p>}
          </div>
        </div>
      )}

      {isFormOpen && (
        <ResumeForm
          initialData={resumeData}
          onClose={() => setIsFormOpen(false)}
          onSubmit={(data) => {
            if (data.layoutSuggested) setPageDensity(data.layoutSuggested);
            setResumeData(data);
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
