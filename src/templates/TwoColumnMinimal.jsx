import React from 'react';

export default function TwoColumnMinimal({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#1a1a1a', fontFamily: "'Inter', sans-serif", display: 'flex', minHeight: '11in', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Left Sidebar - Dark */}
      <div style={{ width: '32%', backgroundColor: '#111827', color: '#f3f4f6', padding: '40px 30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 5px 0', lineHeight: '1.2', color: '#fff' }}>{data.name}</h1>
          <h2 style={{ fontSize: '15px', fontWeight: '500', color: '#9ca3af', margin: 0 }}>{data.title}</h2>
        </div>

        {data.contact && typeof data.contact === 'object' && (
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#cbd5e1', borderBottom: '1px solid #374151', paddingBottom: '5px', margin: '0 0 10px 0' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#d1d5db' }}>
              {data.contact.email && <span style={{wordBreak: 'break-all'}}>{data.contact.email}</span>}
              {data.contact.phone && <span>{data.contact.phone}</span>}
              {data.contact.linkedin && <span style={{wordBreak: 'break-all'}}>{data.contact.linkedin}</span>}
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#cbd5e1', borderBottom: '1px solid #374151', paddingBottom: '5px', margin: '0 0 10px 0' }}>Expertise</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {data.skills.map((skill, i) => (
                <div key={i} style={{ fontSize: '12px', color: '#e5e7eb' }}>{skill}</div>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#cbd5e1', borderBottom: '1px solid #374151', paddingBottom: '5px', margin: '0 0 10px 0' }}>Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: '600', fontSize: '12px', color: '#fff' }}>{edu.degree}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', margin: '2px 0' }}>{edu.school}</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content - Light */}
      <div style={{ width: '68%', padding: '40px' }}>
        
        {data.summary && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px', marginBottom: '15px' }}>Profile</h3>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', margin: 0, color: '#4b5563' }}>{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px', marginBottom: '20px' }}>Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', fontSize: '15px', color: '#111827' }}>{exp.role}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '13.5px', color: '#3b82f6', fontWeight: '600', marginBottom: '8px' }}>{exp.company}</div>
                {exp.description && exp.description.length > 0 && (
                  <ul style={{ margin: '0 0 0 18px', padding: 0 }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13px', lineHeight: '1.5', color: '#4b5563', marginBottom: '5px' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#111827', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px', marginBottom: '20px' }}>Projects</h3>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>{proj.name}</span>
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#4b5563', marginBottom: '4px' }}>{proj.desc}</div>
                {proj.tech && proj.tech.length > 0 && (
                  <div style={{ fontSize: '11.5px', color: '#6b7280', fontWeight: '500' }}>{proj.tech.join(' • ')}</div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
