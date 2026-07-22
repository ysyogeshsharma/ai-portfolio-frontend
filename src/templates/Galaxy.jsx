import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function SpaceGroup() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={10000} factor={6} saturation={1} fade />
    </group>
  );
}

function SpaceScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#000005', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <SpaceGroup />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

export default function GalaxyTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#fff', fontFamily: "'Trebuchet MS', sans-serif" }}>
      <SpaceScene />
      
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }}>
          <h1 style={{ fontSize: '5rem', fontWeight: '300', margin: '0', background: 'linear-gradient(to right, #a8c0ff, #3f2b96)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {data.name}
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '20px auto', color: '#b0b0b0', lineHeight: '1.8' }}>
            {data.about}
          </p>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} style={{ width: '100%', maxWidth: '800px', marginTop: '60px' }}>
          <h3 style={{ fontSize: '2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>Skills</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
            {data.skills?.map((s, i) => (
              <span key={i} style={{ padding: '8px 20px', borderRadius: '30px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.2)' }}>{s}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 1 }} style={{ width: '100%', maxWidth: '800px', marginTop: '60px' }}>
          <h3 style={{ fontSize: '2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px', textAlign: 'left' }}>Projects</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
            {data.projects?.map((p, i) => (
              <div key={i} style={{ padding: '30px', borderRadius: '15px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                <h4 style={{ fontSize: '1.5rem', margin: '0 0 15px 0', color: '#a8c0ff' }}>{p.name}</h4>
                <p style={{ color: '#ccc', lineHeight: '1.6' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
