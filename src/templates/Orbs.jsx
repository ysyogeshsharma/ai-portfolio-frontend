import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function OrbsTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#e2e8f0', color: '#0f172a', overflow: 'hidden' }}>

      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />

          <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[3, 2, -2]}>
            <Sphere args={[2.5, 64, 64]}>
              <MeshDistortMaterial color="#ffffff" roughness={0.1} metalness={0.8} distort={0.2} speed={1.5} />
            </Sphere>
          </Float>

          <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[-4, -1, 1]}>
            <Sphere args={[1.8, 64, 64]}>
              <MeshDistortMaterial color="#93c5fd" roughness={0.3} metalness={0.5} distort={0.3} speed={2} />
            </Sphere>
          </Float>

          <Float speed={3} rotationIntensity={1.5} floatIntensity={1} position={[2, -3, 3]}>
            <Sphere args={[1, 64, 64]}>
              <MeshDistortMaterial color="#f8fafc" roughness={0.2} metalness={0.7} distort={0.4} speed={3} />
            </Sphere>
          </Float>
        </Canvas>
      </div>

      {/* Foreground UI overlaid securely via higher zIndex */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto', padding: '10vh 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: '900px', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '60px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.8)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', margin: '0 0 5px 0', letterSpacing: '-1.5px', textTransform: 'uppercase' }}>{data.name}</h1>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#3b82f6', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>{data.title}</h2>
            {data.summary && <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '600px', margin: '20px auto 0 auto', lineHeight: '1.7' }}>{data.summary}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

            {/* Experience Block */}
            {data.experience && data.experience.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', borderBottom: '2px solid #3b82f6', paddingBottom: '10px', marginBottom: '25px', display: 'inline-block' }}>Experience</h3>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '25px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>{exp.role}</div>
                    <div style={{ fontSize: '1rem', color: '#3b82f6', fontWeight: '600' }}>{exp.company}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', margin: '4px 0 10px 0' }}>{exp.startDate} – {exp.endDate}</div>
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {exp.description.map((desc, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects Block */}
            {data.projects && data.projects.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', borderBottom: '2px solid #3b82f6', paddingBottom: '10px', marginBottom: '25px', display: 'inline-block' }}>Projects</h3>
                {data.projects.map((proj, i) => (
                  <div key={i} style={{ marginBottom: '25px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '15px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>{proj.name}</div>
                    <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: '1.6' }}>{proj.desc}</p>
                  </div>
                ))}

                {data.skills && data.skills.length > 0 && (
                  <div style={{ marginTop: '40px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', borderBottom: '2px solid #3b82f6', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {data.skills.map((skill, i) => (
                        <span key={i} style={{ backgroundColor: '#0f172a', color: '#fff', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </div>
  );
}
