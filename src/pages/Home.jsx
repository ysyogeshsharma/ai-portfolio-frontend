import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Code, User, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const PORTFOLIO_TEMPLATES = [
  { id: 'creative3d', name: '3D Creative', desc: 'Modern, interactive abstract spheres' },
  { id: 'developer', name: 'Developer', desc: 'Cyberpunk 3D Wireframes' },
  { id: 'minimalist', name: 'Minimalist', desc: 'Soft 3D Geometry' },
  { id: 'corporate', name: 'Corporate', desc: 'High-Tech 3D Network' },
  { id: 'synthwave', name: 'Synthwave', desc: 'Retro 80s Neon Sunset' },
  { id: 'galaxy', name: 'Galaxy Space', desc: 'Floating stars and nebulas' },
  { id: 'waves', name: 'Abstract Waves', desc: 'Calming undulating 3D meshes' },
  { id: 'holographic', name: 'Holographic', desc: 'Iridescent liquid chrome' },
  { id: 'zen', name: 'Zen Nature', desc: 'Floating organic leaves' },
  { id: 'brutalist', name: 'Brutalist 3D', desc: 'Harsh industrial typography' },
  { id: 'glass', name: 'Glassmorphism', desc: 'Rotating translucent panes' },
  { id: 'datastream', name: 'Data Stream', desc: 'Matrix rings of hex code' },
  { id: 'neon', name: 'Neon Grid', desc: 'Gaming grid and lasers' },
  { id: 'islands', name: 'Floating Islands', desc: 'Whimsical low-poly islands' },
  { id: 'particles', name: 'Interactive Particles', desc: 'A swirling galaxy of 3D stars' },
  { id: 'orbs', name: 'Floating Orbs', desc: 'Sleek metal and glass spheres' },
  { id: 'tunnel', name: 'Wireframe Tunnel', desc: 'Retro hacker geometric meshes' },
  { id: 'vortex', name: 'Vortex Galaxy', desc: 'A procedurally generated spiraling black hole' },
  { id: 'cubegrid', name: 'Cube Grid', desc: 'Sleek interactive floating isometric cubes' },
  { id: 'lowpoly', name: 'Synthwave Terrain', desc: 'Wireframe mountains with retro colors' },
  { id: 'techatma', name: 'TechAtma Pro', desc: 'Clean corporate layout with timelines, stats & cards' },
  { id: 'cybermatrix', name: 'CyberMatrix', desc: 'High-tech hacker matrix with 3D particles' },
  { id: 'ethereal', name: 'Ethereal', desc: 'Clean, light theme with fluid waving spheres' }
];

const RESUME_TEMPLATES = [
  { id: 'resume_classic', name: 'Classic ATS', desc: 'Clean, traditional, ATS-friendly PDF' },
  { id: 'resume_modern', name: 'Modern', desc: 'Sleek two-column design with a touch of color' },
  { id: 'resume_tech', name: 'Developer', desc: 'Minimalist monospace format for tech roles' },
  { id: 'resume_minimalist', name: 'Minimalist', desc: 'Extreme whitespace, ultra-clean typography' },
  { id: 'resume_creative', name: 'Creative', desc: 'Vibrant layout for designers and creatives' },
  { id: 'resume_executive', name: 'Executive', desc: 'Dense serif layout for top-level professionals' },
  { id: 'resume_startup', name: 'Startup', desc: 'Bold geometric fonts with a modern vibe' },
  { id: 'resume_academic', name: 'Academic CV', desc: 'Traditional structure prioritizing research' },
  { id: 'resume_infographic', name: 'Infographic', desc: 'Visual timeline and skill progress bars' },
  { id: 'resume_elegant', name: 'Elegant', desc: 'Soft pastel accents and refined typography' },
  { id: 'resume_designer', name: 'Designer', desc: 'Asymmetrical grid layout with heavy fonts' },
  { id: 'resume_corporate', name: 'Corporate', desc: 'Strict traditional formatting for enterprise' },
  { id: 'resume_trendy', name: 'Trendy', desc: 'Pastel banners and modern UI components' },
  { id: 'resume_clean', name: 'Clean', desc: 'Ultra-readable, lightweight borders and text' },
  { id: 'resume_bold', name: 'Bold', desc: 'Thick black borders and aggressive high-contrast' },
  { id: 'resume_twocolumn_minimal', name: 'Dark Split Minimal', desc: 'Sophisticated split layout with dark sidebar' },
  { id: 'resume_chronological', name: 'Pro Chronological', desc: 'Vertical visual timeline for experiences' }
];

export default function Home() {
  const [builderType, setBuilderType] = useState('portfolio');
  const [formData, setFormData] = useState({ 
    name: '', skills: '', projects: '', 
    email: '', mobile: '', linkedin: '',
    university: '', degree: '', gradYear: '',
    template: 'creative3d' 
  });
  const [experiences, setExperiences] = useState([
    { company: '', role: '', start: '', end: '', desc: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }
    
    setUploadLoading(true);
    setError('');

    const uploadData = new FormData();
    uploadData.append('resume', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload-resume`, {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to parse resume');

      const activeType = builderType;
      const targetTemplate = formData.template && formData.template !== '' 
        ? formData.template 
        : (activeType === 'portfolio' ? 'creative3d' : 'resume_clean');

      const parsedData = data.data || {};
      if (!parsedData.about && parsedData.summary) {
        parsedData.about = parsedData.summary;
      }
      if (!parsedData.summary && parsedData.about) {
        parsedData.summary = parsedData.about;
      }

      localStorage.setItem('portfolioData', JSON.stringify(parsedData));
      localStorage.setItem('selectedTemplate', targetTemplate);
      localStorage.setItem('builderType', activeType);

      // Auto-publish to MongoDB to get a unique ID
      try {
        const publishResponse = await fetch(`${API_BASE_URL}/publish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: targetTemplate,
            portfolioData: parsedData
          })
        });
        const publishData = await publishResponse.json();
        if (publishResponse.ok && publishData.id) {
          navigate(`/preview?id=${publishData.id}&type=${activeType}`);
          return;
        }
      } catch (publishErr) {
        console.error("Auto-publish failed", publishErr);
      }
      navigate(`/preview?type=${activeType}`);
    } catch (err) {
       console.error(err);
       setError(err.message || 'Error processing PDF. Ensure backend is running.');
    } finally {
      setUploadLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Helper to switch modes
  const handleToggle = (type) => {
    setBuilderType(type);
    setFormData({ ...formData, template: type === 'resume' ? 'resume_classic' : 'creative3d' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpChange = (index, field, value) => {
    const newExps = [...experiences];
    newExps[index][field] = value;
    setExperiences(newExps);
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: '', role: '', start: '', end: '', desc: '' }]);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = { ...formData, experiences, builderType };
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate portfolio');

      // Save the generated structured JSON
      localStorage.setItem('portfolioData', JSON.stringify(data.data));
      localStorage.setItem('selectedTemplate', formData.template);
      localStorage.setItem('builderType', builderType);

      // Auto-publish to MongoDB to get a unique ID
      try {
        const publishResponse = await fetch(`${API_BASE_URL}/publish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateId: formData.template,
            portfolioData: data.data
          })
        });
        const publishData = await publishResponse.json();
        if (publishResponse.ok && publishData.id) {
          navigate(`/preview?id=${publishData.id}&type=${builderType}`);
          return;
        }
      } catch (publishErr) {
        console.error("Auto-publish failed", publishErr);
      }
      navigate(`/preview?type=${builderType}`);
    } catch (err) {
       console.error(err);
       setError(err.message || 'Error communicating with AI. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '100vh', flexDirection: 'column' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }} className="fade-in">
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '10px' }}>
          AI Builder Studio
        </h1>
        <p style={{ color: '#8b949e', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Choose what you want to build. Our AI will automatically organize your background and generate a stunning result instantly.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', background: 'var(--panel-bg)', padding: '10px', borderRadius: '15px' }}>
        <button 
          onClick={() => handleToggle('portfolio')}
          style={{ flex: 1, padding: '15px 30px', borderRadius: '10px', border: builderType === 'portfolio' ? '2px solid var(--primary-color)' : '2px solid transparent', background: builderType === 'portfolio' ? 'rgba(121, 40, 202, 0.2)' : 'transparent', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.3s ease' }}
        >
          🎨 3D Portfolio
        </button>
        <button 
          onClick={() => handleToggle('resume')}
          style={{ flex: 1, padding: '15px 30px', borderRadius: '10px', border: builderType === 'resume' ? '2px solid var(--primary-color)' : '2px solid transparent', background: builderType === 'resume' ? 'rgba(121, 40, 202, 0.2)' : 'transparent', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', transition: 'all 0.3s ease' }}
        >
          📄 Printable Resume
        </button>
      </div>

      {/* Magic Upload Section */}
      <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '600px', marginBottom: '10px', textAlign: 'center', padding: '25px', border: '2px dashed var(--primary-color)' }}>
        <h3 style={{ marginBottom: '10px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Sparkles size={20} color="var(--primary-color)" /> Upload Resume to Generate {builderType === 'portfolio' ? '3D Portfolio' : 'Printable Resume'}
        </h3>
        <p style={{ color: '#8b949e', fontSize: '14px', marginBottom: '20px' }}>
          Already have a resume? Upload your PDF and our AI will instantly format it into a {builderType === 'portfolio' ? 'stunning 3D Portfolio' : 'professional printable Resume'}.
        </p>
        <input 
          type="file" 
          accept="application/pdf" 
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button 
          onClick={() => fileInputRef.current?.click()} 
          className="btn-primary" 
          type="button"
          disabled={uploadLoading || loading}
          style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
        >
          {uploadLoading ? (
            <><div className="loading-spinner" style={{marginRight: '8px', display: 'inline-block'}}></div> Parsing PDF & Generating {builderType === 'portfolio' ? '3D Portfolio' : 'Resume'}...</>
          ) : (
             `Upload Resume (PDF) to Generate ${builderType === 'portfolio' ? '3D Portfolio' : 'Resume'}`
          )}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '20px 0', width: '100%', maxWidth: '600px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        <div style={{ color: '#8b949e', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>OR MANUALLY BUILD</div>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
      </div>

      <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '600px', animationDelay: '0.2s' }}>
        <form onSubmit={handleGenerate}>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} color="var(--primary-color)"/> Name
              </label>
              <input type="text" name="name" className="form-input" placeholder="e.g. John Doe" value={formData.name} onChange={handleChange} required />
            </div>
            {builderType === 'resume' && (
              <div style={{ flex: 1 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={18} color="var(--primary-color)"/> Email
                </label>
                <input type="email" name="email" className="form-input" placeholder="e.g. john@email.com" value={formData.email} onChange={handleChange} />
              </div>
            )}
          </div>

          {builderType === 'resume' && (
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">LinkedIn URL</label>
                <input type="text" name="linkedin" className="form-input" placeholder="linkedin.com/in/johndoe" value={formData.linkedin} onChange={handleChange} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Mobile Number</label>
                <input type="text" name="mobile" className="form-input" placeholder="+1 234 567 8900" value={formData.mobile} onChange={handleChange} />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code size={18} color="var(--primary-color)"/> Skills
            </label>
            <textarea name="skills" className="form-input" placeholder="e.g. React, Node.js, Python, UI/UX Design..." rows={2} value={formData.skills} onChange={handleChange} style={{ resize: 'vertical' }} required />
          </div>

          {builderType === 'portfolio' ? (
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={18} color="var(--primary-color)"/> Experience & Projects
              </label>
              <textarea name="projects" className="form-input" placeholder="e.g. Built an e-commerce platform using Next.js. Worked as frontend dev at Google for 2 years." rows={4} value={formData.projects} onChange={handleChange} style={{ resize: 'vertical' }} required />
            </div>
          ) : (
            <>
              {/* Complex Resume Inputs */}
              
              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '20px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: '#fff' }}>
                  <Briefcase size={18} color="var(--primary-color)"/> Professional Experience
                </label>
                
                {experiences.map((exp, i) => (
                  <div key={i} style={{ paddingBottom: '15px', marginBottom: '15px', borderBottom: i < experiences.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label className="form-label">Company</label>
                        <input type="text" className="form-input" placeholder="Company Name" value={exp.company} onChange={(e) => handleExpChange(i, 'company', e.target.value)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="form-label">Role</label>
                        <input type="text" className="form-input" placeholder="Job Title" value={exp.role} onChange={(e) => handleExpChange(i, 'role', e.target.value)} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label className="form-label">Start Date</label>
                        <input type="text" className="form-input" placeholder="Aug 2021" value={exp.start} onChange={(e) => handleExpChange(i, 'start', e.target.value)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="form-label">End Date</label>
                        <input type="text" className="form-input" placeholder="Present" value={exp.end} onChange={(e) => handleExpChange(i, 'end', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Responsibilities (Raw Notes)</label>
                      <textarea className="form-input" placeholder="Did architecture for AWS. Wrote Python scripts etc. AI will improve this." rows={2} value={exp.desc} onChange={(e) => handleExpChange(i, 'desc', e.target.value)} />
                    </div>
                  </div>
                ))}
                
                <button type="button" onClick={addExperience} className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
                  + Add Another Experience
                </button>
              </div>

              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '20px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: '#fff' }}>
                  🎓 Education
                </label>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 2 }}>
                    <label className="form-label">University / Institution</label>
                    <input type="text" name="university" className="form-input" placeholder="e.g. MIT" value={formData.university} onChange={handleChange} />
                  </div>
                  <div style={{ flex: 2 }}>
                    <label className="form-label">Degree</label>
                    <input type="text" name="degree" className="form-input" placeholder="e.g. B.S. Comp Sci" value={formData.degree} onChange={handleChange} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="form-label">Grad Year</label>
                    <input type="text" name="gradYear" className="form-input" placeholder="2022" value={formData.gradYear} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code size={18} color="var(--primary-color)"/> Other Projects
                </label>
                <textarea name="projects" className="form-input" placeholder="List any side projects here..." rows={3} value={formData.projects} onChange={handleChange} style={{ resize: 'vertical' }} />
              </div>
            </>
          )}

          <div style={{ marginBottom: '30px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
              <Sparkles size={18} color="var(--primary-color)"/> Select {builderType === 'portfolio' ? '3D Template' : 'Resume Template'}
            </label>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button type="button" className="btn-secondary" onClick={scrollLeft} style={{ padding: '8px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={20} />
              </button>
              
              <div ref={scrollRef} style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '15px', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }} className="custom-scrollbar-hide">
                {(builderType === 'portfolio' ? PORTFOLIO_TEMPLATES : RESUME_TEMPLATES).map(tpl => (
                  <div 
                    key={tpl.id}
                    onClick={() => setFormData({ ...formData, template: tpl.id })}
                    style={{ 
                      minWidth: '220px',
                      padding: '15px', 
                      borderRadius: '12px', 
                      border: formData.template === tpl.id ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                      backgroundColor: formData.template === tpl.id ? 'rgba(121, 40, 202, 0.1)' : 'var(--panel-bg)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      scrollSnapAlign: 'start'
                    }}
                  >
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#fff' }}>{tpl.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#8b949e' }}>{tpl.desc}</p>
                  </div>
                ))}
              </div>
              
              <button type="button" className="btn-secondary" onClick={scrollRight} style={{ padding: '8px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={20} />
              </button>
            </div>
            
            <style>{`.custom-scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
          </div>

          {error && <p style={{ color: '#ff7b72', marginBottom: '15px', fontSize: '14px' }}>{error}</p>}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Generating {builderType === 'resume' ? 'Resume' : 'Portfolio'} with AI...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Generate My {builderType === 'resume' ? 'Resume' : '3D Portfolio'} <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>

    </div>
  );
}
