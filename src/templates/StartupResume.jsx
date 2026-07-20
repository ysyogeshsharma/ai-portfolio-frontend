import React from 'react';
import { Mail, Phone, Link } from 'lucide-react';

export default function StartupResume({ data }) {
  if (!data) return null;

  return (
    <div contentEditable suppressContentEditableWarning style={{ backgroundColor: '#fff', color: '#1a202c', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", padding: '40px', maxWidth: '8.5in', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '11in', boxSizing: 'border-box', outline: 'none' }} className="print-exact">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-1px', margin: '0 0 5px 0', color: '#2d3748' }}>{data.name}</h1>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#3182ce' }}>{data.title}</div>
        </div>
        
        {data.contact && typeof data.contact === 'object' && (
          <div style={{ textAlign: 'right', fontSize: '13px', color: '#4a5568', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {data.contact.email && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>{data.contact.email} <Mail size={14} color="#3182ce" /></span>}
            {data.contact.phone && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>{data.contact.phone} <Phone size={14} color="#3182ce" /></span>}
            {data.contact.linkedin && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>{data.contact.linkedin} <Link size={14} color="#3182ce" /></span>}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '50px' }}>
        
        {/* Left Column */}
        <div style={{ width: '65%' }}>
          {data.summary && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3748', borderBottom: '3px solid #e2e8f0', paddingBottom: '5px', marginBottom: '15px' }}>Summary</h2>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#4a5568', margin: 0 }}>{data.summary}</p>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3748', borderBottom: '3px solid #e2e8f0', paddingBottom: '5px', marginBottom: '20px' }}>Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '800', fontSize: '16px', color: '#1a202c' }}>{exp.company}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#718096', backgroundColor: '#edf2f7', padding: '2px 8px', borderRadius: '12px' }}>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#3182ce', marginBottom: '8px' }}>{exp.role}</div>
                  {exp.description && exp.description.length > 0 && (
                    <ul style={{ margin: '0 0 0 15px', padding: 0 }}>
                      {exp.description.map((bullet, idx) => (
                        <li key={idx} style={{ fontSize: '13.5px', lineHeight: '1.5', color: '#4a5568', marginBottom: '5px' }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ width: '35%' }}>
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3748', borderBottom: '3px solid #e2e8f0', paddingBottom: '5px', marginBottom: '15px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={{ backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: '600' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3748', borderBottom: '3px solid #e2e8f0', paddingBottom: '5px', marginBottom: '15px' }}>Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '15px', backgroundColor: '#f7fafc', padding: '15px', borderLeft: '4px solid #3182ce', borderRadius: '0 4px 4px 0' }}>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#2d3748', marginBottom: '5px' }}>{proj.name}</div>
                  <div style={{ fontSize: '13px', lineHeight: '1.4', color: '#4a5568', marginBottom: '8px' }}>{proj.desc}</div>
                  {proj.tech && proj.tech.length > 0 && <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#a0aec0' }}>{proj.tech.join(', ')}</div>}
                </div>
              ))}
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#2d3748', borderBottom: '3px solid #e2e8f0', paddingBottom: '5px', marginBottom: '15px' }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: '800', fontSize: '14px', color: '#2d3748' }}>{edu.degree}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#718096' }}>{edu.school}</div>
                  <div style={{ fontSize: '12.5px', color: '#a0aec0', marginTop: '2px' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
