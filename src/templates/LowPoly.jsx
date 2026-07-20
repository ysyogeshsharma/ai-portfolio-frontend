import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function MovingTerrain() {
  const meshRef = useRef();
  
  // We use a plane, generate random heights for a "mountain" effect
  const [geometry] = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 100, 30, 50);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        // Displace the Z coordinate (which becomes Y when rotated)
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Only distort the edges to leave a path in the middle
        const distance = Math.abs(x);
        if (distance > 5) {
            pos.setZ(i, (Math.random() * (distance - 5) * 0.5));
        } else {
            pos.setZ(i, (Math.random() * 0.5));
        }
    }
    geo.computeVertexNormals();
    return [geo];
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
        // Move terrain towards the camera
        meshRef.current.position.z += delta * 15;
        // Reset to loop seamlessly
        if (meshRef.current.position.z > 20) {
            meshRef.current.position.z = 0;
        }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <meshStandardMaterial color="#2d0a4e" wireframe={true} emissive="#ff00cc" emissiveIntensity={0.5} />
    </mesh>
  );
}

export default function LowPolyTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#0a0014', color: '#ffb3ff', overflow: 'hidden', fontFamily: "'Righteous', 'Arial Black', sans-serif" }}>
      
      {/* 3D Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        
        {/* Retro Sun overlay */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'linear-gradient(180deg, #ff00cc 0%, #ff8800 100%)', borderRadius: '50%', boxShadow: '0 0 100px #ff00cc', zIndex: 1 }}></div>

        <Canvas camera={{ position: [0, 2, 8], fov: 75 }} style={{ zIndex: 5, position: 'relative' }}>
          <ambientLight intensity={2} color="#442288" />
          <fog attach="fog" args={["#0a0014", 5, 30]} />
          <MovingTerrain />
        </Canvas>
      </div>

      {/* Grid Lines Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(rgba(10, 0, 20, 0) 50%, rgba(10, 0, 20, 0.8) 100%)' }}></div>

      {/* Cyberpunk UI */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto', padding: '10vh 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '900px', backgroundColor: 'rgba(20, 0, 30, 0.8)', backdropFilter: 'blur(10px)', border: '2px solid #ff00cc', borderBottom: '8px solid #ff00cc', borderRadius: '4px', padding: '50px', boxShadow: '0 20px 50px rgba(255, 0, 204, 0.2)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#ffea00', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '4px', textShadow: '4px 4px 0px #ff00cc' }}>{data.name}</h1>
            <div style={{ fontSize: '1.5rem', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '6px', fontWeight: '700', textShadow: '0 0 10px #00e5ff' }}>{data.title}</div>
            {data.summary && <p style={{ fontSize: '1.1rem', color: '#ffb3ff', margin: '20px auto 0 auto', maxWidth: '600px', lineHeight: '1.6', fontFamily: 'sans-serif' }}>{data.summary}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', fontFamily: 'sans-serif' }}>
            
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <div style={{ borderLeft: '3px solid #00e5ff', paddingLeft: '20px' }}>
                <h2 style={{ fontSize: '1.8rem', color: '#00e5ff', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '2px', fontFamily: "'Righteous', sans-serif" }}>Experience</h2>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '25px', backgroundColor: 'rgba(0, 229, 255, 0.05)', padding: '20px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase' }}>{exp.role}</div>
                    <div style={{ fontSize: '1.1rem', color: '#ff00cc', fontWeight: '700', margin: '4px 0' }}>{exp.company}</div>
                    <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '10px' }}>{exp.startDate} – {exp.endDate}</div>
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ paddingLeft: '20px', margin: 0, color: '#ccc', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {exp.description.map((desc, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              {/* Projects */}
              {data.projects && data.projects.length > 0 && (
                <div style={{ borderLeft: '3px solid #ffea00', paddingLeft: '20px', marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.8rem', color: '#ffea00', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '2px', fontFamily: "'Righteous', sans-serif" }}>Projects</h2>
                  {data.projects.map((proj, i) => (
                    <div key={i} style={{ marginBottom: '20px', backgroundColor: 'rgba(255, 234, 0, 0.05)', padding: '15px', border: '1px solid rgba(255, 234, 0, 0.2)' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', marginBottom: '6px', textTransform: 'uppercase' }}>{proj.name}</div>
                      <p style={{ fontSize: '0.95rem', color: '#ccc', margin: 0, lineHeight: '1.5' }}>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {data.skills && data.skills.length > 0 && (
                <div style={{ borderLeft: '3px solid #ff00cc', paddingLeft: '20px' }}>
                  <h2 style={{ fontSize: '1.8rem', color: '#ff00cc', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '2px', fontFamily: "'Righteous', sans-serif" }}>Skills</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {data.skills.map((skill, i) => (
                      <span key={i} style={{ backgroundColor: '#ff00cc', color: '#fff', padding: '6px 12px', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{skill}</span>
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
