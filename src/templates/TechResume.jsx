import React from 'react';
import { Mail, Phone, Link, GraduationCap, Terminal as TermIcon, Code, Database } from 'lucide-react';

export default function TechResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#111', fontFamily: "'Fira Code', 'Courier New', monospace", padding: '40px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', color: '#000', margin: '0 0 10px 0', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
          &gt; {data.name} <span style={{ color: '#00aa00' }}>_</span>
        </h1>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>{`// ${data.title}`}</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ fontSize: '13px', color: '#444', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {data.contact.email && <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{color: '#0055ff'}}>Email:</span> {data.contact.email}</div>}
            {data.contact.phone && <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{color: '#0055ff'}}>Mobile:</span> {data.contact.phone}</div>}
            {data.contact.linkedin && <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}><span style={{color: '#0055ff'}}>LinkedIn:</span> {data.contact.linkedin}</div>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>[1] SUMMARY</div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, paddingLeft: '15px', borderLeft: '2px solid #ddd' }}>{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>[2] EXPERIENCE</div>
          <div style={{ paddingLeft: '15px' }}>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#0055ff' }}>{exp.company}</span>
                  <span style={{ fontSize: '13px', color: '#666' }}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{`> ${exp.role}`}</div>
                {exp.description && exp.description.length > 0 && (
                  <ul style={{ margin: '0 0 0 20px', padding: 0, listStyleType: 'square' }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '5px' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>[3] OPEN SOURCE / PROJECTS</div>
          <div style={{ paddingLeft: '15px' }}>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{proj.name}</span>
                  {proj.startDate && <span style={{ fontSize: '13px', color: '#666' }}>{proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}</span>}
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '5px' }}>{proj.desc}</div>
                {proj.tech && proj.tech.length > 0 && (
                  <div style={{ fontSize: '12px', color: '#00aa00' }}>[stack: {proj.tech.join(', ')}]</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>[4] EDUCATION</div>
          <div style={{ paddingLeft: '15px' }}>
            {data.education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{edu.school}</span> | <span style={{ fontSize: '14px' }}>{edu.degree}</span>
                </div>
                <span style={{ fontSize: '13px', color: '#666' }}>{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>[5] SKILLS</div>
          <div style={{ fontSize: '13px', lineHeight: '1.6', paddingLeft: '15px' }}>
            <span style={{ color: '#0055ff', fontWeight: 'bold' }}>const keys</span> = [{data.skills.map(s => `'${s}'`).join(', ')}];
          </div>
        </div>
      )}

    </div>
  );
}
