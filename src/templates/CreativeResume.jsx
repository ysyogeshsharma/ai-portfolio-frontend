import React from 'react';
import { Mail, Phone, Link, MapPin } from 'lucide-react';

export default function CreativeResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#222', fontFamily: "'Poppins', sans-serif", display: 'flex', minHeight: '11in', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      <div style={{ width: '8%', backgroundColor: '#ff5e62', background: 'linear-gradient(to bottom, #ff9966, #ff5e62)' }}></div>
      
      <div style={{ width: '92%', padding: '40px 50px', backgroundColor: '#fafafa' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '800', margin: '0 0 5px 0', color: '#ff5e62', textTransform: 'uppercase' }}>{data.name}</h1>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#555', letterSpacing: '1px' }}>{data.title}</div>
        </div>

        {data.contact && typeof data.contact === 'object' && (
          <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#555', flexWrap: 'wrap', marginBottom: '30px', padding: '10px 0', borderTop: '2px solid #eee', borderBottom: '2px solid #eee' }}>
            {data.contact.email && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={14} color="#ff5e62" /> {data.contact.email}</span>}
            {data.contact.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Phone size={14} color="#ff5e62" /> {data.contact.phone}</span>}
            {data.contact.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Link size={14} color="#ff5e62" /> {data.contact.linkedin}</span>}
          </div>
        )}

        <div style={{ display: 'flex', gap: '40px' }}>
          
          {/* Main Body */}
          <div style={{ width: '60%' }}>
            {data.summary && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: '#ff5e62', borderRadius: '50%' }}></span> Profile
                </h2>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#666' }}>{data.summary}</p>
              </div>
            )}

            {data.experience && data.experience.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <span style={{ width: '10px', height: '10px', backgroundColor: '#ff9966', borderRadius: '50%' }}></span> Experience
                </h2>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '15px', borderLeft: '2px solid #ff9966' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700' }}>{exp.role}</div>
                    <div style={{ fontSize: '14px', color: '#ff5e62', fontWeight: '600', marginBottom: '5px' }}>{exp.company} <span style={{ color: '#999', fontWeight: '400', fontSize: '12px', marginLeft: '5px' }}>{exp.startDate} - {exp.endDate}</span></div>
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ margin: '0 0 0 15px', padding: 0, color: '#555' }}>
                        {exp.description.map((bullet, idx) => (
                          <li key={idx} style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '4px' }}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {data.projects && data.projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#222', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: '#ff9966', borderRadius: '50%' }}></span> Projects
                </h2>
                {data.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '15px', position: 'relative', paddingLeft: '15px', borderLeft: '2px solid #ff9966' }}>
                    <div style={{ fontWeight: '700', fontSize: '15px', color: '#ff5e62' }}>{proj.name}</div>
                    <div style={{ fontSize: '13px', lineHeight: '1.4', color: '#555', marginBottom: '4px' }}>{proj.desc}</div>
                    {proj.tech && proj.tech.length > 0 && <div style={{ fontSize: '11px', color: '#999', fontWeight: '600' }}>{proj.tech.join(' / ')}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ width: '40%' }}>
            {data.skills && data.skills.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                 <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#222', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom: '5px' }}>Expertise</h2>
                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                   {data.skills.map((skill, i) => (
                     <span key={i} style={{ backgroundColor: '#fff', border: '1px solid #ff9966', color: '#ff5e62', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                       {skill}
                     </span>
                   ))}
                 </div>
              </div>
            )}

            {data.education && data.education.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#222', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom: '5px' }}>Education</h2>
                {data.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{edu.degree}</div>
                    <div style={{ fontSize: '13px', color: '#666' }}>{edu.school}</div>
                    <div style={{ fontSize: '12px', color: '#ff9966', fontWeight: '600' }}>{edu.year}</div>
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
