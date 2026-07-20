import React from 'react';

export default function CleanResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#333', fontFamily: "'Segoe UI', Roboto, 'Open Sans', sans-serif", padding: '50px 60px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Header */}
      <div style={{ paddingBottom: '20px', marginBottom: '30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '300', margin: '0 0 5px 0', color: '#0f172a', letterSpacing: '-0.5px' }}>{data.name}</h1>
          <div style={{ fontSize: '18px', color: '#64748b' }}>{data.title}</div>
        </div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ textAlign: 'right', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
            {data.contact.email && <div>{data.contact.email}</div>}
            {data.contact.phone && <div>{data.contact.phone}</div>}
            {data.contact.linkedin && <div>{data.contact.linkedin}</div>}
          </div>
        )}
      </div>

      <div style={{ columnCount: 2, columnGap: '40px', paddingBottom: '20px' }}>
        
        {data.summary && (
          <div style={{ breakInside: 'avoid', marginBottom: '35px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', marginBottom: '10px' }}>Profile</h2>
            <p style={{ fontSize: '14.5px', lineHeight: '1.6', color: '#334155', margin: 0 }}>{data.summary}</p>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div style={{ breakInside: 'avoid', marginBottom: '35px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', marginBottom: '15px' }}>Skills</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.skills.map((skill, i) => (
                <div key={i} style={{ fontSize: '13.5px', color: '#334155', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>{skill}</div>
              ))}
            </div>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', marginBottom: '15px', breakInside: 'avoid' }}>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ breakInside: 'avoid', marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>{exp.role}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{exp.startDate} – {exp.endDate}</div>
                </div>
                <div style={{ fontSize: '14px', color: '#3b82f6', marginBottom: '8px' }}>{exp.company}</div>
                {exp.description && exp.description.length > 0 && (
                  <ul style={{ margin: '0 0 0 16px', padding: 0, color: '#475569' }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13.5px', lineHeight: '1.5', marginBottom: '6px' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', marginBottom: '15px', breakInside: 'avoid' }}>Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ breakInside: 'avoid', marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a', marginBottom: '4px' }}>{proj.name}</div>
                <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#64748b' }}>{proj.desc}</div>
              </div>
            ))}
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div style={{ breakInside: 'avoid', marginBottom: '35px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#94a3b8', marginBottom: '15px' }}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{edu.degree}</div>
                <div style={{ fontSize: '13.5px', color: '#475569', margin: '4px 0' }}>{edu.school}</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
