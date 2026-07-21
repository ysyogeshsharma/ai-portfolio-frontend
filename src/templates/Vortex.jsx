import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function SpiralGalaxy() {
  const pointsRef = useRef();

  // Procedural Galaxy Generation
  const [positions, colors] = useMemo(() => {
    const numPoints = 15000;
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);

    const colorInside = new THREE.Color('#ff0055');
    const colorOutside = new THREE.Color('#3300ff');

    for (let i = 0; i < numPoints; i++) {
      const i3 = i * 3;

      // Randomization mapping onto a spiral
      const radius = Math.random() * 12;
      const spinAngle = radius * 1.5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.5;
      const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 0.5;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color mapping
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 12);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      pointsRef.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef} rotation={[Math.PI / 4, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} sizeAttenuation vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function VortexTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#020005', color: '#fff', overflow: 'hidden' }}>

      {/* 3D Vortex Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 4, 10], fov: 60 }}>
          <SpiralGalaxy />
        </Canvas>
      </div>

      {/* Extreme Glass UI Overlay */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', overflowY: 'auto', padding: '10vh 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, type: 'spring' }}
          style={{ textAlign: 'center', width: '100%', maxWidth: '850px', backgroundColor: 'rgba(20, 5, 40, 0.4)', backdropFilter: 'blur(15px)', padding: '60px', borderRadius: '30px', border: '1px solid rgba(255, 0, 85, 0.3)', boxShadow: '0 0 50px rgba(51, 0, 255, 0.2)' }}
        >
          <h1 style={{ fontSize: '4.5rem', fontWeight: '900', margin: '0 0 10px 0', background: 'linear-gradient(90deg, #ff0055, #3300ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '2px' }}>
            {data.name}
          </h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '400', color: '#d1d5db', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '30px' }}>{data.title}</h2>

          {data.summary && <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#9ca3af', margin: '0 auto', maxWidth: '650px' }}>{data.summary}</p>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px', textAlign: 'left' }}>

            {data.experience && data.experience.length > 0 && (
              <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '30px', borderRadius: '20px', borderLeft: '4px solid #ff0055' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ff0055', marginBottom: '20px' }}>Experience</h3>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{exp.role}</div>
                    <div style={{ fontSize: '1rem', color: '#d1d5db', marginBottom: '4px' }}>{exp.company}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '10px' }}>{exp.startDate} – {exp.endDate}</div>
                    {exp.description && exp.description.length > 0 && (
                      <ul style={{ paddingLeft: '15px', margin: 0, color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {exp.description.map((desc, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              {data.projects && data.projects.length > 0 && (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '30px', borderRadius: '20px', borderLeft: '4px solid #3300ff', marginBottom: '30px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3300ff', marginBottom: '20px' }}>Projects</h3>
                  {data.projects.map((proj, i) => (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginBottom: '6px' }}>{proj.name}</div>
                      <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0, lineHeight: '1.5' }}>{proj.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {data.skills && data.skills.length > 0 && (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '30px', borderRadius: '20px', borderLeft: '4px solid #9ca3af' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '20px' }}>Skills</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {data.skills.map((skill, i) => (
                      <span key={i} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.85rem', color: '#e5e7eb' }}>{skill}</span>
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
