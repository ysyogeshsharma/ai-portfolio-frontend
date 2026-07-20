import React from 'react';
import { Mail, Phone, Link, GraduationCap, Briefcase, Code } from 'lucide-react';

export default function ClassicResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', padding: '40px 50px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 5px 0', color: '#000' }}>{data.name}</h1>
        <div style={{ fontSize: '18px', color: 'black', marginBottom: '12px', fontWeight: 'bold' }}>{data.title}</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '14px', color: 'black', flexWrap: 'wrap' }}>
            {data.contact.email && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={14} /> {data.contact.email}</span>}
            {data.contact.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={14} /> {data.contact.phone}</span>}
            {data.contact.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Link size={14} /> {data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.6', margin: 0 , color:"black"}}>{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px', color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={18} /> Professional Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: 'black' }}>{exp.company}</span>
                <span style={{ fontSize: '14px', color: 'black' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '15px', marginBottom: '5px', color: 'black' }}>{exp.role}</div>
              {exp.description && exp.description.length > 0 && (
                <ul style={{ margin: '0 0 0 20px', padding: 0 }}>
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '3px',color:"black" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px', color: '#000', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={18} /> Key Projects
          </h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '15px', color:"black" }}>{proj.name}</span>
                {proj.startDate && <span style={{ fontSize: '14px', color: 'black' }}>{proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}</span>}
              </div>
              <div style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '3px', color: 'black' }}>{proj.desc}</div>
              {proj.tech && proj.tech.length > 0 && (
                <div style={{ fontSize: '13px', fontStyle: 'italic', color: 'black' }}>Technologies: {proj.tech.join(', ')}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: 'black' }}>
            <GraduationCap size={18} /> Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
              <div style={{color:"black"}}>
                <span style={{ fontWeight: 'bold', fontSize: '15px'}}>{edu.school}</span> — <span style={{ fontStyle: 'italic', fontSize: '15px'}}>{edu.degree}</span>
              </div>
              <span style={{ fontSize: '14px', color: 'black' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '18px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px', color: '#000' }}>Skills</h2>
          <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'black' }}>
            <span style={{ fontWeight: 'bold' }}>Core Competencies: </span>
            {data.skills.join(' • ')}
          </div>
        </div>
      )}

    </div>
  );
}
