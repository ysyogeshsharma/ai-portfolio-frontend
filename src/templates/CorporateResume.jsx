import React from 'react';

export default function CorporateResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#000', fontFamily: "'Garamond', 'Georgia', serif", padding: '40px 50px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{data.name}</h1>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ fontSize: '14px', marginTop: '10px' }}>
            {data.contact.phone && <span>{data.contact.phone}</span>}
            {data.contact.email && <span> &nbsp;•&nbsp; {data.contact.email}</span>}
            {data.contact.linkedin && <span> &nbsp;•&nbsp; {data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, textAlign: 'justify' }}>{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px' }}>Professional Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{exp.company}</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '14px', marginBottom: '6px' }}>{exp.role}</div>
              {exp.description && exp.description.length > 0 && (
                <ul style={{ margin: '0 0 0 18px', padding: 0 }}>
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} style={{ fontSize: '13.5px', lineHeight: '1.4', marginBottom: '4px', textAlign: 'justify' }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{edu.school}</span>
                <span style={{ fontSize: '14px', fontStyle: 'italic' }}> &mdash; {edu.degree}</span>
              </div>
              <span style={{ fontSize: '14px' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '12px' }}>Key Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{proj.name}</span>
                <span style={{ fontSize: '14px' }}>{proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}</span>
              </div>
              <div style={{ fontSize: '13.5px', lineHeight: '1.4', marginTop: '4px' }}>{proj.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Skills & Interests</h2>
          <div style={{ fontSize: '13.5px' }}>
            <span style={{ fontWeight: 'bold' }}>Technical Skills: </span> {data.skills.join(', ')}
          </div>
        </div>
      )}

    </div>
  );
}
