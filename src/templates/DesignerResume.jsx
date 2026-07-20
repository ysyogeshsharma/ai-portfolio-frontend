import React from 'react';

export default function DesignerResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#222', fontFamily: "'Futura', 'Trebuchet MS', sans-serif", padding: '50px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Heavy Typography Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '50px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: '1', margin: '0 0 10px 0', borderLeft: '10px solid #222', paddingLeft: '20px' }}>
          {data.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
        </h1>
        <div style={{ paddingLeft: '30px', borderLeft: '10px solid transparent' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#d94f04', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '15px' }}>{data.title}</div>
          
          {data.contact && typeof data.contact === 'object' && (
            <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', color: '#555', display: 'flex', gap: '15px' }}>
              {data.contact.email && <span>{data.contact.email}</span>}
              {data.contact.phone && <span>{data.contact.phone}</span>}
              {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left Column (Narrow) */}
        <div style={{ width: '30%' }}>
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '2px solid #222', paddingBottom: '5px', marginBottom: '15px' }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '13px', textTransform: 'uppercase' }}>{edu.degree}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{edu.school}</div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '2px', fontWeight: 'bold' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '2px solid #222', paddingBottom: '5px', marginBottom: '15px' }}>Expertise</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {data.skills.map((skill, i) => (
                  <div key={i} style={{ fontSize: '12px', fontWeight: 'bold', color: '#d94f04', backgroundColor: '#f5f5f5', padding: '6px 10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{skill}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Wide) */}
        <div style={{ width: '70%', paddingLeft: '30px', borderLeft: '1px solid #eee' }}>
          
          {data.summary && (
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '16px', lineHeight: '1.6', fontWeight: '500', color: '#444' }}>{data.summary}</p>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '20px', color: '#222' }}>Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>{exp.role}</div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#d94f04' }}>{exp.company}</div>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  {exp.description && exp.description.length > 0 && (
                    <ul style={{ margin: '10px 0 0 15px', padding: 0, color: '#555' }}>
                      {exp.description.map((bullet, idx) => (
                        <li key={idx} style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '6px' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '20px', color: '#222' }}>Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>{proj.name}</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#555', marginBottom: '6px' }}>{proj.desc}</div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>

    </div>
  );
}
