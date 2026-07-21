import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

function WireframeTunnel() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <TorusKnot args={[3, 0.8, 128, 32]}>
          <meshBasicMaterial color="#00ffcc" wireframe />
        </TorusKnot>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <TorusKnot args={[5, 0.2, 128, 32]}>
          <meshBasicMaterial color="#ff00ff" wireframe opacity={0.3} transparent />
        </TorusKnot>
      </Float>
    </group>
  );
}

export default function TunnelTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#000000', color: '#00ffcc', overflow: 'hidden', fontFamily: "'Courier New', Courier, monospace" }}>

      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />
          <WireframeTunnel />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto', padding: '10vh 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '900px', backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid #00ffcc', padding: '40px', boxShadow: '0 0 30px rgba(0, 255, 204, 0.2)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#00ffcc', margin: '0 0 10px 0', textTransform: 'uppercase', textShadow: '0 0 10px #00ffcc' }}>
              &gt; {data.name} _
            </h1>
            <h2 style={{ fontSize: '1.2rem', color: '#ff00ff', letterSpacing: '2px', textTransform: 'uppercase', margin: 0, textShadow: '0 0 5px #ff00ff' }}>{data.title}</h2>
            {data.summary && <p style={{ fontSize: '1rem', color: '#cccccc', maxWidth: '600px', margin: '20px auto 0 auto', lineHeight: '1.6' }}>{data.summary}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ffcc', borderBottom: '1px dashed #00ffcc', paddingBottom: '10px', marginBottom: '20px' }}>[ EXPERIENCE ]</h3>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '25px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{exp.role}</div>
                    <div style={{ fontSize: '0.95rem', color: '#ff00ff', margin: '4px 0' }}>@ {exp.company}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px' }}>[{exp.startDate} :: {exp.endDate}]</div>
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ paddingLeft: '15px', margin: 0, color: '#ccc', fontSize: '0.9rem', lineHeight: '1.5', listStyleType: 'square' }}>
                        {exp.description.map((desc, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Projects & Skills */}
            <div>
              {data.projects && data.projects.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ffcc', borderBottom: '1px dashed #00ffcc', paddingBottom: '10px', marginBottom: '20px' }}>[ PROJECTS ]</h3>
                  {data.projects.map((proj, i) => (
                    <div key={i} style={{ marginBottom: '20px', backgroundColor: 'rgba(0, 255, 204, 0.05)', border: '1px solid rgba(0, 255, 204, 0.3)', padding: '15px' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>{proj.name}</div>
                      <p style={{ fontSize: '0.85rem', color: '#aaa', margin: 0, lineHeight: '1.5' }}>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {data.skills && data.skills.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ffcc', borderBottom: '1px dashed #00ffcc', paddingBottom: '10px', marginBottom: '20px' }}>[ SYS_SKILLS ]</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {data.skills.map((skill, i) => (
                      <span key={i} style={{ border: '1px solid #ff00ff', color: '#ff00ff', padding: '4px 10px', fontSize: '0.8rem', textTransform: 'uppercase', backgroundColor: 'rgba(255, 0, 255, 0.1)' }}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}
