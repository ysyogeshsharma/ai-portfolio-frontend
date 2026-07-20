import React from 'react';

export default function BoldResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#000', fontFamily: "'Montserrat', 'Archivo Black', sans-serif", padding: '40px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Heavy Header */}
      <div style={{ border: '8px solid #000', padding: '30px', marginBottom: '30px', position: 'relative' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 5px 0', lineHeight: '1' }}>{data.name}</h1>
        <div style={{ fontSize: '20px', fontWeight: '700', backgroundColor: '#000', color: '#fff', display: 'inline-block', padding: '5px 15px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '10px' }}>{data.title}</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '20px', fontSize: '13px', fontWeight: '700', flexWrap: 'wrap' }}>
            {data.contact.email && <span>{data.contact.email}</span>}
            {data.contact.phone && <span>{data.contact.phone}</span>}
            {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        
        <div style={{ width: '65%' }}>
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '4px solid #000', paddingBottom: '5px', marginBottom: '20px', letterSpacing: '1px' }}>Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px', position: 'relative', paddingLeft: '15px', borderLeft: '4px solid #000' }}>
                  <div style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase' }}>{exp.role}</div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#555', marginBottom: '4px' }}>{exp.company}</div>
                  <div style={{ fontSize: '12px', fontWeight: '800', backgroundColor: '#eee', display: 'inline-block', padding: '2px 8px', marginBottom: '10px' }}>{exp.startDate} – {exp.endDate}</div>
                  
                  {exp.description && exp.description.length > 0 && (
                    <ul style={{ margin: '0 0 0 16px', padding: 0, color: '#333' }}>
                      {exp.description.map((bullet, idx) => (
                        <li key={idx} style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '6px', fontWeight: '500' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ width: '35%' }}>
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '4px solid #000', paddingBottom: '5px', marginBottom: '20px', letterSpacing: '1px' }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '900', textTransform: 'uppercase' }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#555', margin: '4px 0' }}>{edu.school}</div>
                  <div style={{ fontSize: '13px', fontWeight: '800' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}

          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', borderBottom: '4px solid #000', paddingBottom: '5px', marginBottom: '20px', letterSpacing: '1px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ backgroundColor: '#000', color: '#fff', padding: '5px 10px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
