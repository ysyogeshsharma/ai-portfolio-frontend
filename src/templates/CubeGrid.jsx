import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const CUBE_COUNT = 30;

function FloatingCubes() {
  const meshRef = useRef();

  // Precompute grid positions
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cubeData = useMemo(() => {
    const data = [];
    for (let i = 0; i < CUBE_COUNT; i++) {
      data.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20 - 5,
        z: (Math.random() - 0.5) * 10 - 10,
        speed: Math.random() * 0.02 + 0.01,
        rotSpeed: Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    cubeData.forEach((cube, i) => {
      // Float up and down using sine
      const y = cube.y + Math.sin(state.clock.elapsedTime * cube.speed + cube.phase) * 2;
      dummy.position.set(cube.x, y, cube.z);
      // Slow rotation
      dummy.rotation.x = state.clock.elapsedTime * cube.rotSpeed;
      dummy.rotation.y = state.clock.elapsedTime * cube.rotSpeed;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, CUBE_COUNT]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshPhysicalMaterial color="#ffffff" roughness={0.1} metalness={0.2} transparent opacity={0.8} transmission={0.5} thickness={1} clearcoat={1} clearcoatRoughness={0.1} />
    </instancedMesh>
  );
}

export default function CubeGridTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#e0e7ff', color: '#1e3a8a', overflow: 'hidden' }}>
      
      {/* 3D Glass Cubes */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -20, -10]} intensity={0.5} color="#4338ca" />
          <FloatingCubes />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto', padding: '10vh 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: '1000px', backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(25px)', borderRadius: '24px', padding: '60px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255,255,255,1)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '900', color: '#1e3a8a', margin: '0 0 10px 0', letterSpacing: '-2px' }}>{data.name}</h1>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '3px' }}>{data.title}</div>
            {data.summary && <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: '700px', margin: '20px auto 0 auto', lineHeight: '1.8' }}>{data.summary}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            
            {data.experience && data.experience.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '16px', height: '16px', backgroundColor: '#4f46e5', display: 'inline-block', borderRadius: '4px' }}></span> Experience
                </h2>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '30px', backgroundColor: '#fff', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>{exp.role}</div>
                    <div style={{ fontSize: '1rem', color: '#4f46e5', fontWeight: '700', margin: '5px 0' }}>{exp.company}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginBottom: '15px' }}>{exp.startDate} – {exp.endDate}</div>
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ paddingLeft: '20px', margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {exp.description.map((desc, idx) => <li key={idx} style={{ marginBottom: '6px' }}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              {data.projects && data.projects.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '16px', height: '16px', backgroundColor: '#ec4899', display: 'inline-block', borderRadius: '4px' }}></span> Projects
                  </h2>
                  {data.projects.map((proj, i) => (
                    <div key={i} style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderLeft: '4px solid #ec4899' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>{proj.name}</div>
                      <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: '1.6' }}>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {data.skills && data.skills.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e3a8a', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '16px', height: '16px', backgroundColor: '#10b981', display: 'inline-block', borderRadius: '4px' }}></span> Skills
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {data.skills.map((skill, i) => (
                      <span key={i} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', color: '#1e293b', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>{skill}</span>
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
