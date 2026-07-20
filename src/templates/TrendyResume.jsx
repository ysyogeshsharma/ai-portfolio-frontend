import React from 'react';

export default function TrendyResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#111', fontFamily: "'Outfit', 'Segoe UI', sans-serif", padding: 0, maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Pastel Header */}
      <div style={{ backgroundColor: '#eef2ff', padding: '50px 60px', borderBottom: '4px solid #c7d2fe' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '0 0 8px 0', color: '#3730a3', letterSpacing: '-1px' }}>{data.name}</h1>
        <div style={{ fontSize: '18px', fontWeight: '500', color: '#4f46e5', marginBottom: '16px' }}>{data.title}</div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#4338ca', flexWrap: 'wrap', fontWeight: '500' }}>
            {data.contact.email && <span>{data.contact.email}</span>}
            {data.contact.phone && <span>{data.contact.phone}</span>}
            {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
          </div>
        )}
      </div>

      <div style={{ padding: '40px 60px' }}>
        
        {data.summary && (
          <div style={{ marginBottom: '40px' }}>
            <p style={{ fontSize: '15.5px', lineHeight: '1.7', color: '#4b5563', margin: 0 }}>{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '45px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3730a3', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ width: '12px', height: '12px', backgroundColor: '#818cf8', borderRadius: '3px' }}></span> Experience
            </h2>
            <div style={{ paddingLeft: '22px', borderLeft: '3px solid #e0e7ff', marginLeft: '4px' }}>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-30px', top: '5px', width: '13px', height: '13px', backgroundColor: '#eef2ff', border: '3px solid #818cf8', borderRadius: '50%' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ fontSize: '17px', fontWeight: '800', color: '#111827' }}>{exp.role}</div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#6366f1', backgroundColor: '#e0e7ff', padding: '2px 8px', borderRadius: '12px' }}>{exp.startDate} – {exp.endDate}</div>
                  </div>
                  <div style={{ fontSize: '15px', color: '#4f46e5', fontWeight: '600', marginBottom: '10px' }}>{exp.company}</div>
                  {exp.description && exp.description.length > 0 && (
                    <ul style={{ margin: '0 0 0 15px', padding: 0, color: '#4b5563' }}>
                      {exp.description.map((bullet, idx) => (
                        <li key={idx} style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '8px' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '40px' }}>
          
          <div style={{ flex: 1 }}>
            {data.education && data.education.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3730a3', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#a78bfa', borderRadius: '3px' }}></span> Education
                </h2>
                {data.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f5f3ff', borderRadius: '8px', borderLeft: '4px solid #a78bfa' }}>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#4c1d95', marginBottom: '4px' }}>{edu.degree}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#7c3aed' }}>{edu.school}</div>
                    <div style={{ fontSize: '13px', color: '#8b5cf6', marginTop: '4px', fontWeight: '500' }}>{edu.year}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {data.skills && data.skills.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3730a3', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#34d399', borderRadius: '3px' }}></span> Skills
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {data.skills.map((skill, i) => (
                    <span key={i} style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '6px 14px', borderRadius: '20px', fontSize: '13.5px', fontWeight: '600', border: '1px solid #a7f3d0' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.projects && data.projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3730a3', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '12px', height: '12px', backgroundColor: '#f472b6', borderRadius: '3px' }}></span> Projects
                </h2>
                {data.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#9d174d', marginBottom: '4px' }}>{proj.name}</div>
                    <div style={{ fontSize: '13.5px', lineHeight: '1.5', color: '#4b5563', marginBottom: '6px' }}>{proj.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
