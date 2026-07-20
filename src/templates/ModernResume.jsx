import React from 'react';
import { Mail, Phone, Link, GraduationCap, Briefcase, Code, User } from 'lucide-react';

export default function ModernResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#333', fontFamily: "'Helvetica Neue', Arial, sans-serif", display: 'flex', minHeight: '11in', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Left Sidebar */}
      <div style={{ width: '35%', backgroundColor: '#2b2d42', color: '#fff', padding: '40px 30px' }}>
        <h1 style={{ fontSize: '32px', margin: '0 0 5px 0', lineHeight: '1.2' }}>{data.name}</h1>
        <h2 style={{ fontSize: '16px', fontWeight: '400', color: '#8d99ae', margin: '0 0 30px 0' }}>{data.title}</h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #8d99ae', paddingBottom: '5px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}><User size={14}/> Contact</h3>
          {data.contact && typeof data.contact === 'object' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              {data.contact.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> <span style={{wordBreak: 'break-all'}}>{data.contact.email}</span></div>}
              {data.contact.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> {data.contact.phone}</div>}
              {data.contact.linkedin && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Link size={14} /> <span style={{wordBreak: 'break-all'}}>{data.contact.linkedin}</span></div>}
            </div>
          )}
        </div>

        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #8d99ae', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {data.skills.map((skill, i) => (
                <li key={i} style={{ fontSize: '13px', marginBottom: '8px', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '4px' }}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #8d99ae', paddingBottom: '5px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}><GraduationCap size={14}/> Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{edu.degree}</div>
                <div style={{ fontSize: '12px', color: '#edf2f4' }}>{edu.school}</div>
                <div style={{ fontSize: '12px', color: '#8d99ae' }}>{edu.year}</div>
              </div>
            ))}
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #8d99ae', paddingBottom: '5px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code size={14}/> Projects
            </h3>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#fff' }}>{proj.name}</span>
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.4', color: '#edf2f4', marginBottom: '4px' }}>{proj.desc}</div>
                {proj.tech && proj.tech.length > 0 && (
                  <div style={{ fontSize: '11px', color: '#8d99ae' }}>Tech: {proj.tech.join(', ')}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ width: '65%', padding: '40px 30px', backgroundColor: '#fff' }}>
        {data.summary && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', textTransform: 'uppercase', color: '#2b2d42', borderBottom: '2px solid #edf2f4', paddingBottom: '8px', marginBottom: '15px' }}>Profile</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: '#4a4e69' }}>{data.summary}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', textTransform: 'uppercase', color: '#2b2d42', borderBottom: '2px solid #edf2f4', paddingBottom: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18}/> Professional Experience
            </h3>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#2b2d42' }}>{exp.role}</span>
                  <span style={{ fontSize: '13px', color: '#8d99ae', fontWeight: 'bold' }}>{exp.startDate} – {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#d90429', fontWeight: 'bold', marginBottom: '10px' }}>{exp.company}</div>
                {exp.description && exp.description.length > 0 && (
                  <ul style={{ margin: '0 0 0 20px', padding: 0 }}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} style={{ fontSize: '13px', lineHeight: '1.5', color: '#4a4e69', marginBottom: '5px' }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
