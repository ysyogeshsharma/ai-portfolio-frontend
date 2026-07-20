import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

function HoloBlob() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial 
          color="#ffffff" 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0} 
          metalness={1} 
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function HolographicScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        {/* Environment map makes the chrome material look holographic/colorful */}
        <Environment preset="sunset" />
        <HoloBlob />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}

export default function HolographicTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#333', fontFamily: "'Space Grotesk', sans-serif", overflow: 'hidden' }}>
      <HolographicScene />
      
      {/* Glassmorphic Overlay */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: '800px', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '50px', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: '800', background: 'linear-gradient(45deg, #ff00cc, #333399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 10px 0', textAlign: 'center' }}>
            {data.name}
          </h1>
          <h2 style={{ fontSize: '1.2rem', color: '#555', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '40px' }}>{data.title || 'Creative Visionary'}</h2>
          
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444', textAlign: 'center', marginBottom: '50px' }}>{data.about}</p>
          
          <div style={{ marginBottom: '50px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#333399' }}>Capabilities</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.skills?.map((s, i) => (
                <div key={i} style={{ padding: '10px 20px', background: 'linear-gradient(135deg, rgba(255,0,204,0.1), rgba(51,51,153,0.1))', color: '#333399', borderRadius: '50px', fontWeight: '600', border: '1px solid rgba(255,0,204,0.2)' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#ff00cc' }}>Featured Work</h3>
            {data.projects?.map((p, i) => (
              <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.6)', borderRadius: '15px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.8)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#333' }}>{p.name}</h4>
                <p style={{ margin: 0, color: '#666' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
