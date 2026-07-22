import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

function MovingGrid() {
  const gridRef = useRef();
  
  useFrame((state) => {
    // Scroll the grid towards the camera to simulate movement
    const t = state.clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.position.z = (t * 5) % 10;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[50, 50, "#ff00ff", "#00ffff"]} position={[0, -2, -10]} rotation={[0, 0, 0]} />
    </group>
  );
}

function SynthScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, #0f0c29, #302b63, #240b36)' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <fog attach="fog" args={['#240b36', 5, 20]} />
        <ambientLight intensity={0.5} />
        
        {/* Retro Sun */}
        <Sphere args={[5, 64, 64]} position={[0, 4, -15]}>
          <meshBasicMaterial color="#ff007f" />
        </Sphere>
        
        {/* Moving Grid */}
        <MovingGrid />
      </Canvas>
    </div>
  );
}

export default function SynthwaveTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', fontFamily: "'Arial', sans-serif" }}>
      <SynthScene />
      
      <div style={{ position: 'relative', zIndex: 10, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', color: '#fff', textShadow: '0 0 10px #ff00ff' }}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#00ffff' }}>{data.name}</h1>
          <h2 style={{ fontSize: '1.5rem', color: '#ff00ff', letterSpacing: '2px', textTransform: 'uppercase' }}>{data.title || 'Synthwave Hero'}</h2>
          
          <div style={{ marginTop: '40px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '30px', border: '2px solid #00ffff', borderRadius: '8px', boxShadow: '0 0 20px #ff00ff' }}>
            <h3 style={{ borderBottom: '1px solid #ff00ff', paddingBottom: '10px', color: '#00ffff' }}>ABOUT</h3>
            <p style={{ lineHeight: '1.6' }}>{data.about}</p>
          </div>
          
          <div style={{ marginTop: '40px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '30px', border: '2px solid #ff00ff', borderRadius: '8px', boxShadow: '0 0 20px #00ffff' }}>
            <h3 style={{ borderBottom: '1px solid #00ffff', paddingBottom: '10px', color: '#ff00ff' }}>SKILLS</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
              {data.skills?.map((s, i) => (
                <span key={i} style={{ padding: '5px 15px', border: '1px solid #00ffff', color: '#00ffff', textShadow: 'none' }}>{s}</span>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ color: '#00ffff', textShadow: '0 0 10px #ff00ff' }}>PROJECTS</h3>
            {data.projects?.map((p, i) => (
              <div key={i} style={{ marginBottom: '20px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '20px', borderLeft: '4px solid #ff00ff' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{p.name}</h4>
                <p style={{ margin: 0, color: '#ccc', textShadow: 'none' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
