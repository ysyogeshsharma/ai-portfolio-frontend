import React from 'react';

export default function ExecutiveResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#000', fontFamily: "'Times New Roman', Times, serif", padding: '50px 60px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '30px', margin: '0 0 5px 0', fontWeight: 'bold' }}>{data.name}</h1>
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>{data.title}</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ fontSize: '14px', color: '#333' }}>
            {data.contact.email && <span>{data.contact.email}</span>}
            {data.contact.phone && <span> &nbsp;|&nbsp; {data.contact.phone}</span>}
            {data.contact.linkedin && <span> &nbsp;|&nbsp; {data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      {data.summary && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Executive Summary</h2>
          <p style={{ fontSize: '14.5px', lineHeight: '1.5', margin: 0, textAlign: 'justify' }}>{data.summary}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '15px' }}>Professional Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{exp.company}</span>
                <span style={{ fontSize: '14px' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '14.5px', marginBottom: '6px' }}>{exp.role}</div>
              {exp.description && exp.description.length > 0 && (
                <ul style={{ margin: '0 0 0 20px', padding: 0 }}>
                  {exp.description.map((bullet, idx) => (
                    <li key={idx} style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '3px', textAlign: 'justify' }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Two column for education and projects */}
      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{edu.school}</div>
                  <div style={{ fontSize: '14px', fontStyle: 'italic' }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Key Initiatives / Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{proj.name}</div>
                  <div style={{ fontSize: '14px', lineHeight: '1.4' }}>{proj.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Core Competencies</h2>
          <div style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
            {data.skills.join(' | ')}
          </div>
        </div>
      )}

    </div>
  );
}
