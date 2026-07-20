import React from 'react';
import { Mail, Phone, Link } from 'lucide-react';

export default function MinimalistResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#111', fontFamily: "'Inter', sans-serif", padding: '50px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', letterSpacing: '-1px', margin: '0 0 5px 0' }}>{data.name}</h1>
        <div style={{ fontSize: '18px', color: '#666', fontWeight: '400', marginBottom: '15px' }}>{data.title}</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#888', flexWrap: 'wrap' }}>
            {data.contact.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={12} /> {data.contact.email}</span>}
            {data.contact.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {data.contact.phone}</span>}
            {data.contact.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Link size={12} /> {data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      {data.summary && (
        <div style={{ marginBottom: '35px' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, color: '#444' }}>{data.summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>{exp.company}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>{exp.role}</div>
              {exp.description && exp.description.length > 0 && (
                <ul style={{ margin: '0 0 0 15px', padding: 0, color: '#444' }}>
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '5px' }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '3px' }}>{proj.name}</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#555', marginBottom: '5px' }}>{proj.desc}</div>
                  {proj.tech && proj.tech.length > 0 && <div style={{ fontSize: '12px', color: '#999' }}>{proj.tech.join(' • ')}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{edu.degree}</div>
                  <div style={{ fontSize: '13px', color: '#555' }}>{edu.school}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '20px' }}>Skills</h2>
              <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#444' }}>
                {data.skills.join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
