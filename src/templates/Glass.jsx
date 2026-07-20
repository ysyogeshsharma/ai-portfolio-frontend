import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

function GlassPanes() {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-2, 1, -2]}>
          <meshBasicMaterial color="#ff00ff" />
        </Sphere>
      </Float>
      <Float speed={1.5} floatIntensity={1.5}>
        <Sphere args={[1.5, 64, 64]} position={[2, -1, -3]}>
          <meshBasicMaterial color="#00ffff" />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.2}>
        <Box args={[4, 5, 0.1]} position={[0, 0, 1]} rotation={[0, -0.2, 0.1]}>
          <MeshTransmissionMaterial 
            backdropBlur={10} 
            thickness={2} 
            roughness={0.1} 
            transmission={1} 
            ior={1.5} 
            color="#ffffff" 
          />
        </Box>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3}>
        <Box args={[3, 4, 0.1]} position={[-1, 1, 2]} rotation={[0.1, 0.3, -0.1]}>
          <MeshTransmissionMaterial 
            backdropBlur={5} 
            thickness={1} 
            roughness={0.2} 
            transmission={0.9} 
            ior={1.3} 
            color="#e0e0ff" 
          />
        </Box>
      </Float>
    </group>
  );
}

function GlassScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#eef2f5' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <GlassPanes />
      </Canvas>
    </div>
  );
}

export default function GlassTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#1e293b', fontFamily: "'Inter', sans-serif" }}>
      <GlassScene />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '24px', padding: '50px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', margin: '0 0 10px 0', background: 'linear-gradient(to right, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {data.name}
          </h1>
          <h2 style={{ fontSize: '1.2rem', color: '#475569', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 30px 0' }}>{data.title || 'Portfolio'}</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155', maxWidth: '700px', margin: '0 auto' }}>{data.about}</p>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.skills?.map((s, i) => (
                <span key={i} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: '12px', color: '#3b82f6', fontWeight: '500' }}>{s}</span>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>Projects</h3>
            {data.projects?.map((p, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#8b5cf6' }}>{p.name}</h4>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>{p.desc}</p>
              </div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
