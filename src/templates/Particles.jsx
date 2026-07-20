import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

// A slow-rotating starfield component
function RotatingStars() {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function ParticlesTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#050505', color: '#fff', overflow: 'hidden' }}>
      
      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.5} />
          <RotatingStars />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto', padding: '10vh 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', maxWidth: '800px', width: '100%', backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255,255,255,0.03)', padding: '50px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '40px' }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '4px', background: 'linear-gradient(90deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {data.name}
          </h1>
          <div style={{ fontSize: '1.5rem', fontWeight: '300', color: '#aaa', letterSpacing: '2px', marginBottom: '30px' }}>{data.title}</div>
          
          {data.summary && <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', margin: '0 auto', maxWidth: '600px' }}>{data.summary}</p>}
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', maxWidth: '1000px', width: '100%' }}>
          
          {data.experience && data.experience.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ flex: '1 1 400px', backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px' }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', letterSpacing: '1px' }}>Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{exp.role}</div>
                  <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '8px' }}>{exp.company} <span style={{ margin: '0 10px' }}>|</span> {exp.startDate} – {exp.endDate}</div>
                  <ul style={{ paddingLeft: '20px', margin: 0, color: '#bbb', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {exp.description && exp.description.map((desc, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}

          {data.projects && data.projects.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ flex: '1 1 400px', backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px' }}
            >
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', letterSpacing: '1px' }}>Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>{proj.name}</div>
                  <div style={{ fontSize: '0.95rem', color: '#bbb', lineHeight: '1.5', marginTop: '5px' }}>{proj.desc}</div>
                </div>
              ))}
            </motion.div>
          )}

        </div>
        
        {data.skills && data.skills.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            style={{ marginTop: '40px', textAlign: 'center', maxWidth: '800px' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', fontSize: '0.9rem', color: '#eee', backdropFilter: 'blur(5px)' }}>{skill}</span>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
