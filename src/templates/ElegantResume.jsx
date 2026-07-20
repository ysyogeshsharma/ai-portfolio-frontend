import React from 'react';

export default function ElegantResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#4a4a4a', fontFamily: "'Lora', serif", padding: '50px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      <div style={{ border: '1px solid #e0c9c9', padding: '30px', borderRadius: '2px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '400', letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 10px 0', color: '#333' }}>{data.name}</h1>
          <div style={{ fontSize: '16px', color: '#ab9b9b', fontStyle: 'italic', marginBottom: '20px' }}>{data.title}</div>
          
          {data.contact && typeof data.contact === 'object' && (
            <div style={{ fontSize: '13px', color: '#666', borderTop: '1px solid #f2e6e6', borderBottom: '1px solid #f2e6e6', padding: '10px 0', display: 'flex', justifyContent: 'center', gap: '20px', letterSpacing: '1px' }}>
              {data.contact.email && <span>{data.contact.email}</span>}
              {data.contact.phone && <span>{data.contact.phone}</span>}
              {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
            </div>
          )}
        </div>

        {data.summary && (
          <div style={{ marginBottom: '40px', textAlign: 'center', padding: '0 40px' }}>
            <p style={{ fontSize: '14px', lineHeight: '1.8', margin: 0, color: '#555', fontStyle: 'italic' }}>"{data.summary}"</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#b99a9a', textAlign: 'center', marginBottom: '30px' }}>Work Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '25px' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{exp.company}</div>
                  <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#777' }}>{exp.role} <span style={{ padding: '0 10px' }}>|</span> {exp.startDate} – {exp.endDate}</div>
                </div>
                {exp.description && exp.description.length > 0 && (
                  <ul style={{ margin: '0 auto', padding: '0 20px', maxWidth: '600px' }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13.5px', lineHeight: '1.6', marginBottom: '6px', color: '#555' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#b99a9a', textAlign: 'center', marginBottom: '30px' }}>Education</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
              {data.education.map((edu, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px', fontStyle: 'italic', color: '#777', margin: '4px 0' }}>{edu.school}</div>
                  <div style={{ fontSize: '13px', color: '#999' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: '#b99a9a', marginBottom: '20px' }}>Skills & Expertise</h2>
            <div style={{ fontSize: '14px', color: '#555', letterSpacing: '1px', lineHeight: '1.8' }}>
              {data.skills.join(' • ')}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
