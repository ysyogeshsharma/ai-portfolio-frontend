import React, { useState } from 'react';

export default function ResumeForm({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      title: '',
      contact: { email: '', phone: '', linkedin: '', location: '', portfolio: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
    }
  );

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleContactChange = (field, value) =>
    setFormData((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));

  const handleListAdd = (field, emptyObj) =>
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], emptyObj] }));

  const handleListRemove = (field, index) =>
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

  const handleListChange = (field, index, key, value) =>
    setFormData((prev) => {
      const newList = [...prev[field]];
      newList[index] = { ...newList[index], [key]: value };
      return { ...prev, [field]: newList };
    });

  const textToArray = (text) =>
    text.split('\n').map((s) => s.trim()).filter(Boolean);
  const arrayToText = (arr) => (arr || []).join('\n');

  const inputCls =
    'w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all';
  const labelCls =
    'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1';
  const sectionCls = 'bg-white/5 border border-white/5 rounded-2xl p-6 mb-8';
  const sectionHeaderCls =
    'text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0f172a] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0f172a]/90 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-white/5">
          <h2 className="text-2xl font-black text-white tracking-tight">Content Editor</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-8">
          {/* Personal Details */}
          <div className={sectionCls}>
            <h3 className={sectionHeaderCls}>
              <span className="p-1.5 bg-blue-500/20 rounded shadow-inner">👤</span>
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ['Full Name', 'name', 'text', null, 'John Doe'],
                ['Professional Title', 'title', 'text', null, 'Senior Software Engineer'],
              ].map(([label, field, type, , placeholder]) => (
                <div key={field}>
                  <label className={labelCls}>{label}</label>
                  <input
                    type={type}
                    className={inputCls}
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              {[
                ['Email Address', 'email', 'john@example.com'],
                ['Phone Number', 'phone', '+1 234 567 890'],
                ['Location', 'location', 'New York, NY'],
                ['LinkedIn', 'linkedin', 'linkedin.com/in/john'],
              ].map(([label, field, placeholder]) => (
                <div key={field}>
                  <label className={labelCls}>{label}</label>
                  <input
                    type="text"
                    className={inputCls}
                    value={formData.contact[field]}
                    onChange={(e) => handleContactChange(field, e.target.value)}
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className={sectionCls}>
            <h3 className={sectionHeaderCls}>
              <span className="p-1.5 bg-purple-500/20 rounded">📝</span>
              Professional Summary
            </h3>
            <textarea
              className={`${inputCls} min-h-[120px] resize-none`}
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Elaborate on your greatest achievements and career goals..."
            />
          </div>

          {/* Experience */}
          <div className={sectionCls}>
            <h3 className={sectionHeaderCls}>
              <span className="p-1.5 bg-emerald-500/20 rounded">💼</span>
              Experience
            </h3>
            <div className="space-y-6">
              {formData.experience.map((exp, i) => (
                <div
                  key={i}
                  className="bg-black/20 rounded-xl p-6 border border-white/5 relative group"
                >
                  <button
                    onClick={() => handleListRemove('experience', i)}
                    className="absolute top-4 right-4 text-xs font-bold text-red-400/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Remove
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {[
                      ['Company', 'company'],
                      ['Role', 'role'],
                      ['Timeline', 'date', 'Jan 2020 – Present'],
                      ['Location', 'location'],
                    ].map(([label, key, placeholder]) => (
                      <div key={key}>
                        <label className={labelCls}>{label}</label>
                        <input
                          className={inputCls}
                          value={exp[key] || ''}
                          onChange={(e) =>
                            handleListChange('experience', i, key, e.target.value)
                          }
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                  </div>
                  <label className={labelCls}>Key Achievements (one per line)</label>
                  <textarea
                    className={`${inputCls} min-h-[100px] text-sm`}
                    value={arrayToText(exp.achievements)}
                    onChange={(e) =>
                      handleListChange(
                        'experience',
                        i,
                        'achievements',
                        textToArray(e.target.value)
                      )
                    }
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  handleListAdd('experience', {
                    company: '',
                    role: '',
                    date: '',
                    location: '',
                    achievements: [],
                  })
                }
                className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-blue-500/50 transition-all font-bold text-sm"
              >
                + Add Experience
              </button>
            </div>
          </div>

          {/* Education */}
          <div className={sectionCls}>
            <h3 className={sectionHeaderCls}>
              <span className="p-1.5 bg-amber-500/20 rounded">🎓</span>
              Education
            </h3>
            <div className="space-y-6">
              {formData.education.map((edu, i) => (
                <div
                  key={i}
                  className="bg-black/20 rounded-xl p-6 border border-white/5 relative group"
                >
                  <button
                    onClick={() => handleListRemove('education', i)}
                    className="absolute top-4 right-4 text-xs font-bold text-red-400/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Remove
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ['Institution', 'institution'],
                      ['Degree', 'degree'],
                      ['Year', 'date'],
                      ['Location', 'location'],
                    ].map(([label, key]) => (
                      <div key={key}>
                        <label className={labelCls}>{label}</label>
                        <input
                          className={inputCls}
                          value={edu[key] || ''}
                          onChange={(e) =>
                            handleListChange('education', i, key, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  handleListAdd('education', {
                    institution: '',
                    degree: '',
                    date: '',
                    location: '',
                  })
                }
                className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-blue-500/50 transition-all font-bold text-sm"
              >
                + Add Education
              </button>
            </div>
          </div>

          {/* Skills & Certifications */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="p-1.5 bg-cyan-500/20 rounded">⚡</span>
                Skills
              </h3>
              <textarea
                className={`${inputCls} min-h-[150px]`}
                value={arrayToText(formData.skills)}
                onChange={(e) => handleChange('skills', textToArray(e.target.value))}
                placeholder={'React.js\nNode.js\nSystems Design...'}
              />
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="p-1.5 bg-rose-500/20 rounded">📜</span>
                Certifications
              </h3>
              <textarea
                className={`${inputCls} min-h-[150px]`}
                value={arrayToText(formData.certifications)}
                onChange={(e) =>
                  handleChange('certifications', textToArray(e.target.value))
                }
                placeholder={'AWS Certified Architect\nGoogle Professional Dev...'}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0f172a]/90 backdrop-blur-md px-8 py-6 flex justify-end gap-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
