import React from 'react';

export default function ChronologicalPro({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#111827', fontFamily: "'Roboto', sans-serif", padding: '50px 60px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Header Centered */}
      <div style={{ textAlign: 'center', marginBottom: '35px', borderBottom: '3px solid #111827', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 8px 0', color: '#111827' }}>{data.name}</h1>
        <div style={{ fontSize: '18px', fontWeight: '500', color: '#4b5563', letterSpacing: '1px', marginBottom: '12px' }}>{data.title}</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '13px', color: '#6b7280', flexWrap: 'wrap' }}>
            {data.contact.email && <span>{data.contact.email}</span>}
            {data.contact.phone && <span>• {data.contact.phone}</span>}
            {data.contact.linkedin && <span>• {data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      {data.summary && (
        <div style={{ marginBottom: '35px' }}>
          <p style={{ fontSize: '14.5px', lineHeight: '1.6', textAlign: 'justify', margin: 0, color: '#374151', marginInline: 'auto' }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience - Timeline style */}
      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '25px' }}>Professional Experience</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative', paddingLeft: '15px', borderLeft: '2px solid #e5e7eb' }}>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{ position: 'absolute', left: '-20px', top: '0px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#111827' }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>{exp.role}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', backgroundColor: '#f3f4f6', padding: '3px 8px', borderRadius: '4px' }}>{exp.startDate} – {exp.endDate}</div>
                </div>
                <div style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500', marginBottom: '10px', fontStyle: 'italic' }}>{exp.company}</div>
                
                {exp.description && exp.description.length > 0 && (
                  <ul style={{ margin: '0 0 0 10px', padding: 0, color: '#4b5563' }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13.5px', lineHeight: '1.6', marginBottom: '6px' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Education side by side */}
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '20px' }}>Key Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{proj.name}</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4b5563', marginBottom: '6px' }}>{proj.desc}</div>
                  {proj.tech && proj.tech.length > 0 && (
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{proj.tech.join(' | ')}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '15px' }}>Core Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ fontSize: '13px', color: '#4b5563', backgroundColor: '#f3f4f6', padding: '4px 10px', borderRadius: '15px', fontWeight: '500' }}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '15px' }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#111827' }}>{edu.degree}</div>
                  <div style={{ fontSize: '13.5px', color: '#4b5563', margin: '2px 0' }}>{edu.school}</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
