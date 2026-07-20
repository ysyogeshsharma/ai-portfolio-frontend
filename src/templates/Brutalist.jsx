import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Float } from '@react-three/drei';
import { motion } from 'framer-motion';

function ConcreteBlocks() {
  const groupRef = useRef();

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Box args={[3, 3, 3]} position={[-3, 2, -5]} rotation={[0.4, 0.2, 0.1]}>
          <meshStandardMaterial color="#888" roughness={0.9} metalness={0.1} />
        </Box>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <Box args={[2, 4, 2]} position={[4, -1, -3]} rotation={[-0.2, 0.5, 0.1]}>
          <meshStandardMaterial color="#666" roughness={1} metalness={0} />
        </Box>
      </Float>
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
        <Box args={[5, 1, 4]} position={[0, -4, -6]} rotation={[0.1, -0.4, 0]}>
          <meshStandardMaterial color="#444" roughness={0.8} metalness={0.2} />
        </Box>
      </Float>
    </group>
  );
}

function BrutalistScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#e0e0e0' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-10, 0, -10]} intensity={0.5} />
        <ConcreteBlocks />
      </Canvas>
    </div>
  );
}

export default function BrutalistTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#111', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", overflowX: 'hidden' }}>
      <BrutalistScene />
      
      <div style={{ position: 'relative', zIndex: 10, padding: '50px', display: 'flex', flexDirection: 'column', gap: '50px' }}>
        
        {/* Massive Header */}
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 50 }}>
          <h1 style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', fontWeight: '900', lineHeight: '0.8', margin: '0', textTransform: 'uppercase', letterSpacing: '-5px', mixBlendMode: 'difference', color: '#fff' }}>
            {data.name}
          </h1>
          <h2 style={{ fontSize: ' clamp(2rem, 5vw, 4rem)', fontWeight: 'bold', margin: '20px 0 0 0', backgroundColor: '#eeff00', display: 'inline-block', padding: '10px 20px', textTransform: 'uppercase' }}>
            {data.title || 'PORTFOLIO'}
          </h2>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '50px', md: { gridTemplateColumns: '1fr 1fr' }, marginTop: '100px' }}>
          
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} style={{ backgroundColor: '#111', color: '#fff', padding: '40px', border: '5px solid #fff' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 20px 0', borderBottom: '5px solid #fff', paddingBottom: '10px' }}>ABOUT</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', lineHeight: '1.4', margin: 0 }}>{data.about}</p>
          </motion.div>
          
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ backgroundColor: '#eeff00', color: '#111', padding: '40px', border: '5px solid #111' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', margin: '0 0 20px 0', borderBottom: '5px solid #111', paddingBottom: '10px' }}>SKILLS</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.skills?.map((s, i) => (
                <span key={i} style={{ fontSize: '1.2rem', fontWeight: '900', textTransform: 'uppercase', padding: '10px 15px', backgroundColor: '#111', color: '#eeff00' }}>{s}</span>
              ))}
            </div>
          </motion.div>
          
        </div>

        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} style={{ marginTop: '50px' }}>
          <h3 style={{ fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase', mixBlendMode: 'difference', color: '#fff', margin: '0 0 20px 0', letterSpacing: '-2px' }}>INDEX_PROJECTS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.projects?.map((p, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', border: '5px solid #111', padding: '30px', backgroundColor: '#fff', gap: '15px' }}>
                <h4 style={{ fontSize: '2rem', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>{p.name}</h4>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>{p.desc}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {p.tech?.map((t, idx) => (
                    <span key={idx} style={{ padding: '5px 10px', backgroundColor: '#ccc', fontWeight: 'bold', textTransform: 'uppercase' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
