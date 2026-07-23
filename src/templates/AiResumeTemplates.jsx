import React from 'react';

const SectionHeader = ({ title, style, density }) => {
  const isCompact = density === 'compact';
  const isSpacious = density === 'spacious';
  return (
    <h2 style={{ fontSize: isCompact ? 11 : isSpacious ? 18 : 16, fontWeight: 'bold', textTransform: 'uppercase', margin: isCompact ? '0 0 2px 0' : isSpacious ? '0 0 12px 0' : '0 0 8px 0', ...style }}>
      {title}
    </h2>
  );
};

const ContactLinks = ({ contact, style, density }) => {
  if (!contact) return null;
  const isCompact = density === 'compact';
  const isSpacious = density === 'spacious';
  const items = [];
  if (contact.email) items.push(contact.email);
  if (contact.phone) items.push(contact.phone);
  if (contact.location) items.push(contact.location);
  if (contact.linkedin) items.push(contact.linkedin);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: isCompact ? '4px' : isSpacious ? '18px' : '12px', ...style }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <span style={{ whiteSpace: 'nowrap' }}>{item}</span>
          {i < items.length - 1 && <span>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export const TemplateClassic = ({ data, density = 'normal' }) => {
  const isCompact = density === 'compact', isSpacious = density === 'spacious';
  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', color: '#000', fontSize: isCompact ? 11 : isSpacious ? 15 : 14, lineHeight: isCompact ? 1.2 : isSpacious ? 1.7 : 1.5 }}>
      <div style={{ textAlign: 'center', marginBottom: isCompact ? 8 : isSpacious ? 30 : 20, borderBottom: '2px solid #000', paddingBottom: isCompact ? 4 : isSpacious ? 20 : 15 }}>
        <h1 style={{ margin: 0, fontSize: isCompact ? 24 : isSpacious ? 38 : 32, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{data?.name}</h1>
        <h3 style={{ margin: isCompact ? '4px 0' : '8px 0', fontSize: isCompact ? 15 : isSpacious ? 20 : 18, fontWeight: 'normal', color: '#333' }}>{data?.title}</h3>
        <ContactLinks contact={data?.contact} density={density} style={{ justifyContent: 'center', fontSize: isCompact ? 11 : isSpacious ? 14 : 13, marginTop: isCompact ? 4 : 10 }} />
      </div>
      {data?.summary && <div style={{ marginBottom: isCompact ? 10 : isSpacious ? 25 : 18 }}><SectionHeader title="Professional Summary" density={density} style={{ borderBottom: '1px solid #ccc', paddingBottom: '2px' }} /><p style={{ margin: 0 }}>{data.summary}</p></div>}
      {data?.skills?.length > 0 && <div style={{ marginBottom: isCompact ? 10 : isSpacious ? 25 : 18 }}><SectionHeader title="Core Competencies" density={density} style={{ borderBottom: '1px solid #ccc', paddingBottom: '2px' }} /><p style={{ margin: 0 }}>{data.skills.join(' • ')}</p></div>}
      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: isCompact ? 10 : isSpacious ? 25 : 18 }}>
          <SectionHeader title="Professional Experience" density={density} style={{ borderBottom: '1px solid #ccc', paddingBottom: '2px' }} />
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: isCompact ? 8 : isSpacious ? 20 : 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: isCompact ? 13 : isSpacious ? 16 : 15 }}><span>{exp.company}{exp.location ? ` — ${exp.location}` : ''}</span><span>{exp.date}</span></div>
              <div style={{ fontStyle: 'italic', marginBottom: 2 }}>{exp.role}</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>{exp.achievements?.map((a, j) => <li key={j}>{a}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {data?.education?.length > 0 && (
        <div style={{ marginBottom: isCompact ? 10 : isSpacious ? 25 : 18 }}>
          <SectionHeader title="Education" density={density} style={{ borderBottom: '1px solid #ccc', paddingBottom: '2px' }} />
          {data.education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: isCompact ? 4 : 8 }}>
              <span style={{ fontWeight: 'bold' }}>{edu.degree}{edu.institution ? `, ${edu.institution}` : ''}</span>
              <span>{edu.date}</span>
            </div>
          ))}
        </div>
      )}
      {data?.certifications?.length > 0 && <div><SectionHeader title="Certifications" density={density} style={{ borderBottom: '1px solid #ccc', paddingBottom: '2px' }} /><ul style={{ margin: 0, paddingLeft: 18 }}>{data.certifications.map((c, i) => <li key={i}>{c}</li>)}</ul></div>}
    </div>
  );
};

export const TemplateModern = ({ data, density = 'normal' }) => {
  const isCompact = density === 'compact', isSpacious = density === 'spacious';
  return (
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#1f2937', fontSize: isCompact ? 11 : isSpacious ? 16 : 14, lineHeight: isCompact ? 1.2 : isSpacious ? 1.8 : 1.6 }}>
      <div style={{ backgroundColor: '#111827', color: '#f3f4f6', padding: isCompact ? '12px 15px' : isSpacious ? '45px 30px' : '30px', margin: isCompact ? '-15mm -20px 10px -20px' : isSpacious ? '-15mm -20px 35px -20px' : '-15mm -20px 20px -20px' }}>
        <h1 style={{ margin: 0, fontSize: isCompact ? 24 : isSpacious ? 48 : 36, fontWeight: '800' }}>{data?.name}</h1>
        <h3 style={{ margin: isCompact ? '2px 0' : '10px 0', fontSize: isCompact ? 14 : isSpacious ? 24 : 20, color: '#9ca3af', fontWeight: '500' }}>{data?.title}</h3>
        <ContactLinks contact={data?.contact} density={density} style={{ color: '#d1d5db', fontSize: isCompact ? 10 : isSpacious ? 15 : 13, marginTop: isCompact ? 4 : isSpacious ? 20 : 15 }} />
      </div>
      {data?.summary && <div style={{ marginBottom: isCompact ? 15 : isSpacious ? 35 : 25 }}><h2 style={{ fontSize: isCompact ? 15 : isSpacious ? 22 : 18, color: '#111827', borderBottom: '2px solid #3b82f6', display: 'inline-block', marginBottom: isCompact ? 6 : isSpacious ? 15 : 10, paddingBottom: 2 }}>Summary</h2><p style={{ margin: 0 }}>{data.summary}</p></div>}
      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: isCompact ? 15 : isSpacious ? 35 : 25 }}>
          <h2 style={{ fontSize: isCompact ? 15 : isSpacious ? 22 : 18, color: '#111827', borderBottom: '2px solid #3b82f6', display: 'inline-block', marginBottom: isCompact ? 10 : isSpacious ? 20 : 15, paddingBottom: 2 }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: isCompact ? 10 : isSpacious ? 24 : 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h3 style={{ margin: 0, fontSize: isCompact ? 14 : isSpacious ? 18 : 16, color: '#111827' }}>{exp.role}</h3><span style={{ fontSize: isCompact ? 11 : isSpacious ? 14 : 13, color: '#6b7280', fontWeight: '500' }}>{exp.date}</span></div>
              <div style={{ color: '#3b82f6', fontWeight: '600', marginBottom: 4 }}>{exp.company}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#4b5563' }}>{exp.achievements?.map((a, j) => <li key={j}>{a}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {data?.skills?.length > 0 && <div style={{ marginBottom: isCompact ? 15 : 25 }}><h2 style={{ fontSize: isCompact ? 15 : 18, color: '#111827', borderBottom: '2px solid #3b82f6', display: 'inline-block', marginBottom: 10, paddingBottom: 2 }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{data.skills.map((s, i) => <span key={i} style={{ background: '#e5e7eb', padding: '4px 10px', borderRadius: '4px', fontSize: 13 }}>{s}</span>)}</div></div>}
      {data?.education?.length > 0 && <div><h2 style={{ fontSize: isCompact ? 15 : 18, color: '#111827', borderBottom: '2px solid #3b82f6', display: 'inline-block', marginBottom: 10, paddingBottom: 2 }}>Education</h2>{data.education.map((edu, i) => <div key={i} style={{ marginBottom: 8 }}><div style={{ fontWeight: 'bold' }}>{edu.degree}</div><div style={{ color: '#4b5563' }}>{edu.institution}</div></div>)}</div>}
    </div>
  );
};

const defaultStyle = {
  width: '210mm',
  minHeight: '297mm',
  background: 'white',
  padding: '15mm 20mm',
  boxShadow: 'none',
  position: 'relative',
  color: '#1e293b'
};

export const TemplateSidebar = ({ data, density = 'normal' }) => {
  const isCompact = density === 'compact', isSpacious = density === 'spacious';
  return (
    <div style={{ display: 'flex', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', color: '#333', fontSize: isCompact ? 11 : isSpacious ? 15 : 14, lineHeight: isCompact ? 1.2 : isSpacious ? 1.7 : 1.5, margin: '-15mm -20mm', backgroundColor: '#fff', minHeight: '297mm' }}>
      <div style={{ width: isCompact ? '25%' : '30%', backgroundColor: '#2c3e50', color: '#ecf0f1', padding: isCompact ? '15px 10px' : isSpacious ? '40px 25px' : '30px 20px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: isCompact ? 18 : isSpacious ? 32 : 28, color: '#fff', lineHeight: 1.1 }}>{data?.name}</h1>
        <h3 style={{ margin: isCompact ? '0 0 10px 0' : '0 0 30px 0', fontSize: isCompact ? 12 : isSpacious ? 18 : 16, color: '#1abc9c', fontWeight: 'normal' }}>{data?.title}</h3>
        <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid #7f8c8d', paddingBottom: 4, marginBottom: 10 }}>Contact</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isCompact ? 6 : 10, fontSize: isCompact ? 11 : 12, marginBottom: isCompact ? 20 : 30 }}>
          {data?.contact?.email && <div>{data.contact.email}</div>}
          {data?.contact?.phone && <div>{data.contact.phone}</div>}
          {data?.contact?.location && <div>{data.contact.location}</div>}
        </div>
        {data?.skills?.length > 0 && (<><h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid #7f8c8d', paddingBottom: 4, marginBottom: 10 }}>Skills</h2><div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, marginBottom: 30 }}>{data.skills.map((s, i) => <div key={i}>{s}</div>)}</div></>)}
        {data?.education?.length > 0 && (<><h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid #7f8c8d', paddingBottom: 4, marginBottom: 10 }}>Education</h2>{data.education.map((edu, i) => <div key={i} style={{ marginBottom: 15 }}><div style={{ fontWeight: 'bold', color: '#fff' }}>{edu.degree}</div><div style={{ fontSize: 11, color: '#bdc3c7' }}>{edu.institution}</div></div>)}</>)}
      </div>
      <div style={{ width: '70%', padding: isCompact ? '20px 25px' : isSpacious ? '40px 50px' : '30px 40px' }}>
        {data?.summary && <div style={{ marginBottom: isCompact ? 20 : 30 }}><h2 style={{ fontSize: isCompact ? 16 : 18, color: '#2c3e50', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Profile</h2><p style={{ margin: 0, color: '#555' }}>{data.summary}</p></div>}
        {data?.experience?.length > 0 && (
          <div style={{ marginBottom: isCompact ? 20 : 30 }}>
            <h2 style={{ fontSize: isCompact ? 16 : 18, color: '#2c3e50', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: isCompact ? 15 : 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h3 style={{ margin: 0, fontSize: isCompact ? 14 : 16, color: '#2c3e50' }}>{exp.role}</h3><span style={{ fontSize: isCompact ? 11 : 13, color: '#7f8c8d' }}>{exp.date}</span></div>
                <div style={{ fontWeight: 'bold', color: '#1abc9c', marginBottom: 4 }}>{exp.company}</div>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#555' }}>{exp.achievements?.map((a, j) => <li key={j}>{a}</li>)}</ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const TemplateMinimalist = ({ data, density = 'normal' }) => {
  const isCompact = density === 'compact', isSpacious = density === 'spacious';
  return (
    <div style={{ fontFamily: '"Georgia", serif', color: '#333', fontSize: isCompact ? 11 : isSpacious ? 16 : 14, lineHeight: isCompact ? 1.3 : isSpacious ? 2.0 : 1.7, padding: isCompact ? '2px' : isSpacious ? '20px' : '10px' }}>
      <div style={{ textAlign: 'center', marginBottom: isCompact ? 10 : isSpacious ? 60 : 40 }}>
        <h1 style={{ margin: 0, fontSize: isCompact ? 24 : isSpacious ? 48 : 38, fontWeight: 'normal', letterSpacing: '1px', color: '#111' }}>{data?.name}</h1>
        <h3 style={{ margin: isCompact ? '2px 0 6px 0' : isSpacious ? '15px 0 25px 0' : '10px 0 15px 0', fontSize: isCompact ? 13 : isSpacious ? 18 : 16, fontStyle: 'italic', color: '#666' }}>{data?.title}</h3>
        <ContactLinks contact={data?.contact} density={density} style={{ justifyContent: 'center', fontSize: isCompact ? 10 : isSpacious ? 14 : 12, color: '#555' }} />
      </div>
      {data?.summary && <p style={{ margin: `0 0 ${isCompact ? 20 : isSpacious ? 50 : 35}px 0`, textAlign: 'justify' }}>{data.summary}</p>}
      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: isCompact ? 20 : isSpacious ? 50 : 35 }}>
          <h2 style={{ fontSize: isCompact ? 12 : isSpacious ? 16 : 14, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 15, color: '#111' }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: isCompact ? 15 : isSpacious ? 35 : 25 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}><span style={{ fontSize: isCompact ? 14 : isSpacious ? 18 : 16, fontWeight: 'bold', color: '#222' }}>{exp.company}</span><span style={{ fontSize: isCompact ? 11 : 13, color: '#777', fontStyle: 'italic' }}>{exp.date}</span></div>
              <div style={{ fontStyle: 'italic', marginBottom: 6, color: '#444' }}>{exp.role}</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>{exp.achievements?.map((a, j) => <li key={j}>{a}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {data?.education?.length > 0 && <div style={{ marginBottom: 35 }}><h2 style={{ fontSize: isCompact ? 12 : 14, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 15, color: '#111' }}>Education</h2>{data.education.map((edu, i) => <div key={i} style={{ marginBottom: 10 }}><div style={{ fontWeight: 'bold', fontSize: isCompact ? 13 : 15, color: '#222' }}>{edu.degree}</div><div style={{ color: '#444' }}>{edu.institution}</div></div>)}</div>}
      {data?.skills?.length > 0 && <div><h2 style={{ fontSize: isCompact ? 12 : 14, textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 15, color: '#111' }}>Skills</h2><div>{data.skills.join(', ')}</div></div>}
    </div>
  );
};

export const TemplateBoldAccent = ({ data, density = 'normal' }) => {
  const isCompact = density === 'compact', isSpacious = density === 'spacious';
  return (
    <div style={{ fontFamily: '"Roboto", "Open Sans", sans-serif', color: '#333', fontSize: isCompact ? 12 : isSpacious ? 16 : 14, lineHeight: isCompact ? 1.4 : isSpacious ? 1.8 : 1.6 }}>
      <div style={{ borderLeft: `${isCompact ? 6 : isSpacious ? 12 : 8}px solid #0284c7`, paddingLeft: isCompact ? 12 : isSpacious ? 30 : 20, marginBottom: isCompact ? 20 : isSpacious ? 45 : 30 }}>
        <h1 style={{ margin: 0, fontSize: isCompact ? 32 : isSpacious ? 52 : 42, fontWeight: '900', color: '#0f172a', letterSpacing: '-1px' }}>{data?.name}</h1>
        <h3 style={{ margin: isCompact ? '2px 0 6px 0' : isSpacious ? '10px 0 20px 0' : '5px 0 10px 0', fontSize: isCompact ? 18 : isSpacious ? 26 : 22, fontWeight: '600', color: '#0284c7' }}>{data?.title}</h3>
        <ContactLinks contact={data?.contact} density={density} style={{ fontSize: isCompact ? 11 : 13, color: '#475569', fontWeight: '500' }} />
      </div>
      {data?.summary && <p style={{ margin: `0 0 ${isCompact ? 15 : isSpacious ? 35 : 25}px 0`, fontSize: isCompact ? 13 : isSpacious ? 17 : 15, color: '#334155' }}>{data.summary}</p>}
      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: isCompact ? 20 : isSpacious ? 45 : 30 }}>
          <h2 style={{ fontSize: isCompact ? 16 : isSpacious ? 24 : 20, fontWeight: '700', color: '#0f172a', marginBottom: isCompact ? 10 : 15 }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: isCompact ? 12 : 20, paddingLeft: 30, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 8, top: 6, width: 6, height: 6, borderRadius: '50%', backgroundColor: '#0284c7' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><h3 style={{ margin: 0, fontSize: isCompact ? 15 : 17, fontWeight: '700', color: '#0f172a' }}>{exp.role}</h3><span style={{ fontSize: 11, color: '#0284c7', fontWeight: '600', background: '#f0f9ff', padding: '2px 6px', borderRadius: 4 }}>{exp.date}</span></div>
              <div style={{ fontSize: isCompact ? 13 : 15, fontWeight: '500', color: '#475569', marginBottom: 4 }}>{exp.company}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#334155' }}>{exp.achievements?.map((a, j) => <li key={j}>{a}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isCompact ? 15 : 30 }}>
        {data?.education?.length > 0 && <div><h2 style={{ fontSize: isCompact ? 16 : 20, fontWeight: '700', color: '#0f172a', marginBottom: 10 }}>Education</h2>{data.education.map((edu, i) => <div key={i} style={{ marginBottom: 10 }}><div style={{ fontWeight: '700', color: '#0f172a' }}>{edu.degree}</div><div style={{ color: '#475569', fontSize: 12 }}>{edu.institution}</div></div>)}</div>}
        {data?.skills?.length > 0 && <div><h2 style={{ fontSize: isCompact ? 16 : 20, fontWeight: '700', color: '#0f172a', marginBottom: 10 }}>Skills</h2><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{data.skills.map((s, i) => <span key={i} style={{ border: '1px solid #cbd5e1', color: '#334155', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>{s}</span>)}</div></div>}
      </div>
    </div>
  );
};

export const TemplateExecutive = ({ data, density = 'normal' }) => {
  const isCompact = density === 'compact', isSpacious = density === 'spacious';
  return (
    <div style={{ fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif', color: '#000', fontSize: isCompact ? 11 : isSpacious ? 15 : 13, lineHeight: isCompact ? 1.4 : isSpacious ? 1.8 : 1.6 }}>
      <div style={{ textAlign: 'center', marginBottom: isCompact ? 12 : isSpacious ? 40 : 20 }}>
        <h1 style={{ margin: 0, fontSize: isCompact ? 26 : isSpacious ? 42 : 32, fontWeight: 'bold' }}>{data?.name}</h1>
        <ContactLinks contact={data?.contact} density={density} style={{ justifyContent: 'center', fontSize: isCompact ? 11 : 12, marginTop: 4, marginBottom: 4 }} />
        <div style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{data?.title}</div>
      </div>
      {data?.summary && <p style={{ margin: `0 0 ${isCompact ? 15 : 20}px 0`, textAlign: 'justify' }}>{data.summary}</p>}
      {data?.experience?.length > 0 && (
        <div style={{ marginBottom: isCompact ? 15 : 20 }}>
          <h2 style={{ fontSize: isCompact ? 12 : 14, fontWeight: 'bold', textTransform: 'uppercase', borderTop: '2px solid #000', borderBottom: '2px solid #000', padding: '3px 0', marginBottom: isCompact ? 10 : 15, textAlign: 'center', letterSpacing: '1px' }}>Professional Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: isCompact ? 10 : 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ fontWeight: 'bold' }}>{exp.company}</span><span style={{ fontWeight: 'bold' }}>{exp.date}</span></div>
              <div style={{ fontStyle: 'italic', marginBottom: 4 }}>{exp.role}</div>
              <ul style={{ margin: 0, paddingLeft: 18, textAlign: 'justify' }}>{exp.achievements?.map((a, j) => <li key={j}>{a}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 20 }}>
        {data?.education?.length > 0 && <div style={{ flex: 1 }}><h2 style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderTop: '2px solid #000', borderBottom: '2px solid #000', padding: '3px 0', marginBottom: 10, textAlign: 'center', letterSpacing: '1px' }}>Education</h2>{data.education.map((edu, i) => <div key={i} style={{ marginBottom: 6 }}><div style={{ fontWeight: 'bold' }}>{edu.degree}</div><div>{edu.institution}</div></div>)}</div>}
        {data?.skills?.length > 0 && <div style={{ flex: 1 }}><h2 style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', borderTop: '2px solid #000', borderBottom: '2px solid #000', padding: '3px 0', marginBottom: 10, textAlign: 'center', letterSpacing: '1px' }}>Skills</h2><div style={{ textAlign: 'center', fontSize: 13 }}>{data.skills.join('  |  ')}</div></div>}
      </div>
    </div>
  );
};
