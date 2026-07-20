import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

function WavyPlane() {
  return (
    <mesh position={[0, -2, -5]} scale={[15, 10, 5]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial color="#00a8ff" roughness={0.1} metalness={0.5} distort={0.4} speed={2} />
    </mesh>
  );
}

function WaveScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#e0f7fa' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff" />
        <WavyPlane />
        <OrbitControls enableZoom={false} autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}

export default function WavesTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#01579b', fontFamily: "'Helvetica', sans-serif" }}>
      <WaveScene />
      
      <div style={{ position: 'relative', zIndex: 10, padding: '10vh 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 10px 0', color: '#01579b' }}>{data.name}</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '300', margin: '0 0 30px 0' }}>{data.title || 'Professional Portfolio'}</h2>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>{data.about}</p>
          </div>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginTop: '50px', md: { gridTemplateColumns: '1fr 1fr' } }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid #00a8ff', display: 'inline-block' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.skills?.map((s, i) => (
                <span key={i} style={{ padding: '8px 15px', backgroundColor: '#e1f5fe', color: '#0277bd', borderRadius: '20px', fontWeight: '500' }}>{s}</span>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '2px solid #00a8ff', display: 'inline-block' }}>Recent Projects</h3>
            {data.projects?.map((p, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.2rem', margin: '0 0 5px 0' }}>{p.name}</h4>
                <p style={{ fontSize: '1rem', color: '#4f5b66', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
