import React from 'react';

export default function AcademicResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#000', fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", padding: '40px 60px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '26px', margin: '0 0 5px 0', textTransform: 'uppercase' }}>{data.name}</h1>
        <div style={{ fontSize: '15px', color: '#333', marginBottom: '10px' }}>Curriculum Vitae</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ fontSize: '13px', color: '#000', borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '5px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {data.contact.email && <span>{data.contact.email}</span>}
            {data.contact.phone && <span>{data.contact.phone}</span>}
            {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      {data.education && data.education.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ width: '15%', fontSize: '14px', fontWeight: 'bold' }}>{edu.year}</div>
              <div style={{ width: '85%' }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{edu.degree}</div>
                <div style={{ fontSize: '14.5px', fontStyle: 'italic' }}>{edu.school}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Academic & Professional Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ display: 'flex', marginBottom: '15px' }}>
              <div style={{ width: '25%', fontSize: '13.5px', fontStyle: 'italic' }}>{exp.startDate} – {exp.endDate}</div>
              <div style={{ width: '75%' }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{exp.role}</div>
                <div style={{ fontSize: '14px', marginBottom: '5px' }}>{exp.company}</div>
                {exp.description && exp.description.length > 0 && (
                  <ul style={{ margin: '0 0 0 15px', padding: 0 }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13.5px', lineHeight: '1.4', marginBottom: '2px', textAlign: 'justify' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Research & Publications</h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '15px', paddingLeft: '20px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>[{i + 1}]</span>
              <span style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{data.name}</span>. "{proj.name}". <span style={{ fontStyle: 'italic' }}>{proj.desc}</span> {proj.startDate && `(${proj.startDate}).`}
            </div>
          ))}
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>Technical Skills & Methodology</h2>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            {data.skills.join(', ')}
          </div>
        </div>
      )}

    </div>
  );
}
