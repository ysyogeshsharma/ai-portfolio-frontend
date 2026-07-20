import React from 'react';
import { Mail, Phone, Link } from 'lucide-react';

export default function InfographicResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#333', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", display: 'flex', minHeight: '11in', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#f0f4f8', padding: '40px 20px', borderRight: '1px solid #dde1e5' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#cbd5e1', margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '32px', fontWeight: 'bold' }}>
            {data.name.charAt(0)}
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 5px 0', color: '#102a43' }}>{data.name}</h1>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#486581', textTransform: 'uppercase', letterSpacing: '1px' }}>{data.title}</div>
        </div>

        {data.contact && typeof data.contact === 'object' && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#102a43', borderBottom: '2px solid #9fb3c8', paddingBottom: '5px', marginBottom: '15px' }}>Contact</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#334e68' }}>
              {data.contact.email && <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ backgroundColor: '#102a43', padding: '6px', borderRadius: '50%', color: '#fff', display: 'flex' }}><Mail size={12}/></div> <span style={{wordBreak: 'break-all'}}>{data.contact.email}</span></div>}
              {data.contact.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ backgroundColor: '#102a43', padding: '6px', borderRadius: '50%', color: '#fff', display: 'flex' }}><Phone size={12}/></div> {data.contact.phone}</div>}
              {data.contact.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ backgroundColor: '#102a43', padding: '6px', borderRadius: '50%', color: '#fff', display: 'flex' }}><Link size={12}/></div> <span style={{wordBreak: 'break-all'}}>{data.contact.linkedin}</span></div>}
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#102a43', borderBottom: '2px solid #9fb3c8', paddingBottom: '5px', marginBottom: '15px' }}>Skills Matrix</h2>
            {data.skills.map((skill, i) => {
              // Procedurally generate a visual fill bar amount (between 70 and 95)
              const fill = 70 + (i * 7 % 25);
              return (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#334e68', marginBottom: '4px' }}>{skill}</div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#d9e2ec', borderRadius: '3px' }}>
                    <div style={{ width: `${fill}%`, height: '100%', backgroundColor: '#102a43', borderRadius: '3px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Main Column */}
      <div style={{ width: '65%', padding: '40px 30px' }}>
        
        {data.summary && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#102a43', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ display: 'inline-block', width: '20px', height: '4px', backgroundColor: '#102a43' }}></span> PROFILE
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#334e68', margin: 0, paddingLeft: '30px' }}>{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#102a43', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ display: 'inline-block', width: '20px', height: '4px', backgroundColor: '#102a43' }}></span> EXPERIENCE
            </h2>
            <div style={{ paddingLeft: '30px', borderLeft: '2px solid #d9e2ec', marginLeft: '10px' }}>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-37px', top: '0', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #102a43', backgroundColor: '#fff' }}></div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#102a43' }}>{exp.role}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#486581', marginBottom: '4px' }}>{exp.company} <span style={{ color: '#829ab1', fontWeight: 'normal', fontSize: '13px', marginLeft: '8px' }}>{exp.startDate} – {exp.endDate}</span></div>
                  {exp.description && exp.description.length > 0 && (
                    <ul style={{ margin: '8px 0 0 16px', padding: 0, color: '#334e68' }}>
                      {exp.description.map((bullet, idx) => (
                        <li key={idx} style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '4px' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#102a43', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ display: 'inline-block', width: '20px', height: '4px', backgroundColor: '#102a43' }}></span> EDUCATION
            </h2>
            <div style={{ paddingLeft: '30px', borderLeft: '2px solid #d9e2ec', marginLeft: '10px' }}>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-37px', top: '0', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #102a43', backgroundColor: '#fff' }}></div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#102a43' }}>{edu.degree}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#486581' }}>{edu.school}</div>
                  <div style={{ fontSize: '13px', color: '#829ab1', marginTop: '2px' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
