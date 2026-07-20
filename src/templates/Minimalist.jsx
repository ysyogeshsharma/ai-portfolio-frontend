import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Environment, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';

function SoftShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
        <TorusKnot args={[1, 0.3, 128, 32]} position={[2.5, 0, -2]}>
          <MeshDistortMaterial color="#f8c8dc" distort={0.2} speed={1.5} roughness={0.2} metalness={0.1} />
        </TorusKnot>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.2, 0.8]}>
        <mesh position={[-2.5, -1, -1]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#c8e4f8" roughness={0.3} metalness={0.2} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-0.1, 0.5]}>
        <mesh position={[0, 2, -4]}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial color="#fcf6bd" roughness={0.1} metalness={0.1} />
        </mesh>
      </Float>
    </>
  );
}

function MinimalScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#fafafa' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <Environment preset="city" />
        <SoftShapes />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} color="#888" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}

export default function MinimalistTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden', color: '#333', fontFamily: "'Inter', sans-serif" }}>
      <MinimalScene />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '80px 20px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '60px 40px', borderRadius: '24px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-1.5px', color: '#111' }}>
            {data.name}
          </h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '400', color: '#666', margin: '0 0 30px 0' }}>
            {data.title || 'Professional'}
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
            {data.about}
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1 }}
          style={{ padding: '0 20px' }}
        >
          <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '30px', textAlign: 'center', fontWeight: '600' }}>Expertise</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            {data.skills?.map((skill, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05, duration: 0.5 }}
                style={{ padding: '12px 24px', backgroundColor: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '30px', fontSize: '1.1rem', color: '#444', backdropFilter: 'blur(5px)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div style={{ padding: '0 20px' }}>
          <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '40px', textAlign: 'center', fontWeight: '600' }}>Selected Works</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {data.projects?.map((proj, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.7 }}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#222', margin: '0 0 15px 0' }}>{proj.name}</h4>
                <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '30px', flex: 1 }}>{proj.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {proj.tech?.map((t, i) => (
                    <span key={i} style={{ fontSize: '0.9rem', color: '#888', backgroundColor: '#f5f5f5', padding: '6px 14px', borderRadius: '8px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#aaa', fontSize: '0.9rem', marginTop: '40px' }}>
          © {new Date().getFullYear()} {data.name}. All rights reserved.
        </div>

      </div>
    </div>
  );
}
