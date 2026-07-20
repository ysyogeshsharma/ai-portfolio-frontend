import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function DataEditorSidebar({ data, setData }) {
  
  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAboutSummaryChange = (val) => {
    setData((prev) => ({ ...prev, summary: val, about: val }));
  };

  const handleContactChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      contact: { ...(prev.contact || {}), [field]: value }
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setData((prev) => {
      const newArray = [...(prev[arrayName] || [])];
      if (!newArray[index]) newArray[index] = {};
      
      if (field === 'description' && typeof value === 'string') {
        newArray[index][field] = value.split('\n');
      } else if (field === 'tech' && typeof value === 'string') {
        newArray[index][field] = value.split(',').map(s => s.trim());
      } else {
        newArray[index][field] = value;
      }
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, emptyTemplate) => {
    setData((prev) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] || []), emptyTemplate]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setData((prev) => {
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    const skillsArray = value.split(',').map(s => s.trim());
    setData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const sectionStyle = { marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' };
  const labelStyle = { display: 'block', fontSize: '13px', color: '#8b949e', marginBottom: '6px', fontWeight: '500' };
  const inputStyle = { width: '100%', padding: '8px', backgroundColor: '#0d1117', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '14px', marginBottom: '12px' };

  return (
    <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }} className="custom-scrollbar">
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>
        Live Data Editor
      </h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Full Name</label>
        <input style={inputStyle} value={data.name || ''} onChange={(e) => handleChange('name', e.target.value)} />

        <label style={labelStyle}>Job Title</label>
        <input style={inputStyle} value={data.title || ''} onChange={(e) => handleChange('title', e.target.value)} />

        <label style={labelStyle}>About Me / Professional Summary</label>
        <textarea 
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} 
          value={data.about || data.summary || ''} 
          onChange={(e) => handleAboutSummaryChange(e.target.value)} 
        />
      </div>

      <div style={sectionStyle}>
        <h3 style={{ fontSize: '14px', color: '#fff', marginBottom: '12px' }}>Contact Information</h3>
        <label style={labelStyle}>Email</label>
        <input style={inputStyle} value={data.contact?.email || ''} onChange={(e) => handleContactChange('email', e.target.value)} />
        
        <label style={labelStyle}>Phone</label>
        <input style={inputStyle} value={data.contact?.phone || ''} onChange={(e) => handleContactChange('phone', e.target.value)} />
        
        <label style={labelStyle}>LinkedIn</label>
        <input style={inputStyle} value={data.contact?.linkedin || ''} onChange={(e) => handleContactChange('linkedin', e.target.value)} />
      </div>

      <div style={sectionStyle}>
        <h3 style={{ fontSize: '14px', color: '#fff', marginBottom: '12px' }}>Skills</h3>
        <label style={labelStyle}>Comma-separated list</label>
        <textarea 
          style={{ ...inputStyle, minHeight: '60px' }} 
          value={(data.skills || []).join(', ')} 
          onChange={handleSkillsChange} 
        />
      </div>

      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Experience</h3>
          <button onClick={() => addArrayItem('experience', { company: '', role: '', startDate: '', endDate: '', description: [] })} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', cursor: 'pointer', padding: '4px' }}>
            <Plus size={14} />
          </button>
        </div>
        
        {(data.experience || []).map((exp, i) => (
          <div key={i} style={{ padding: '12px', backgroundColor: '#161b22', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
             <button onClick={() => removeArrayItem('experience', i)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', border: 'none', color: '#ff7b72', cursor: 'pointer' }}>
               <Trash2 size={14} />
             </button>
             
             <label style={labelStyle}>Company</label>
             <input style={inputStyle} value={exp.company || ''} onChange={(e) => handleArrayChange('experience', i, 'company', e.target.value)} />
             
             <label style={labelStyle}>Role</label>
             <input style={inputStyle} value={exp.role || ''} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} />
             
             <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Start Date</label>
                <input style={inputStyle} value={exp.startDate || ''} onChange={(e) => handleArrayChange('experience', i, 'startDate', e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>End Date</label>
                <input style={inputStyle} value={exp.endDate || ''} onChange={(e) => handleArrayChange('experience', i, 'endDate', e.target.value)} />
              </div>
             </div>
             
             <label style={labelStyle}>Description (One bullet per line)</label>
             <textarea 
               style={{ ...inputStyle, minHeight: '80px' }} 
               value={(exp.description || []).join('\n')} 
               onChange={(e) => handleArrayChange('experience', i, 'description', e.target.value)} 
             />
          </div>
        ))}
      </div>

      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Education</h3>
          <button onClick={() => addArrayItem('education', { degree: '', school: '', year: '' })} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', cursor: 'pointer', padding: '4px' }}>
            <Plus size={14} />
          </button>
        </div>
        
        {(data.education || []).map((edu, i) => (
          <div key={i} style={{ padding: '12px', backgroundColor: '#161b22', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
             <button onClick={() => removeArrayItem('education', i)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', border: 'none', color: '#ff7b72', cursor: 'pointer' }}>
               <Trash2 size={14} />
             </button>
             
             <label style={labelStyle}>School / University</label>
             <input style={inputStyle} value={edu.school || ''} onChange={(e) => handleArrayChange('education', i, 'school', e.target.value)} />
             
             <label style={labelStyle}>Degree</label>
             <input style={inputStyle} value={edu.degree || ''} onChange={(e) => handleArrayChange('education5', i, 'degree', e.target.value)} />
             
             <label style={labelStyle}>Year</label>
             <input style={inputStyle} value={edu.year || ''} onChange={(e) => handleArrayChange('education', i, 'year', e.target.value)} />
          </div>
        ))}
      </div>

      <div style={{ paddingBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Projects</h3>
          <button onClick={() => addArrayItem('projects', { name: '', desc: '', tech: [] })} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', cursor: 'pointer', padding: '4px' }}>
            <Plus size={14} />
          </button>
        </div>
        
        {(data.projects || []).map((proj, i) => (
          <div key={i} style={{ padding: '12px', backgroundColor: '#161b22', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
              <button onClick={() => removeArrayItem('projects', i)} style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', border: 'none', color: '#ff7b72', cursor: 'pointer' }}>
                <Trash2 size={14} />
              </button>
              
              <label style={labelStyle}>Project Name</label>
              <input style={inputStyle} value={proj.name || ''} onChange={(e) => handleArrayChange('projects', i, 'name', e.target.value)} />
              
              <label style={labelStyle}>Description</label>
              <textarea 
                style={{ ...inputStyle, minHeight: '60px' }} 
                value={proj.desc || ''} 
                onChange={(e) => handleArrayChange('projects', i, 'desc', e.target.value)} 
              />
              
              <label style={labelStyle}>Technologies (Comma-separated)</label>
              <input 
                style={inputStyle} 
                value={(proj.tech || []).join(', ')} 
                onChange={(e) => handleArrayChange('projects', i, 'tech', e.target.value)} 
              />
          </div>
        ))}
      </div>

    </div>
  );
}
