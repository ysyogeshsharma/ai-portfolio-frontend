import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function LaserLines() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.2;
  });
  return (
    <group ref={ref}>
      <mesh position={[5, 2, -5]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 10]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
      <mesh position={[-5, 2, -5]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 10]} />
        <meshBasicMaterial color="#00ffff" />
      </mesh>
    </group>
  );
}

function NeonScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#0a0a0a' }}>
      <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
        <fog attach="fog" args={['#0a0a0a', 5, 25]} />
        <Grid position={[0, -2, 0]} args={[50, 50]} sectionSize={2} cellColor="#ff00ff" sectionColor="#00ffff" fadeDistance={25} fadeStrength={1.5} />
        <LaserLines />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

export default function NeonTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#fff', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <NeonScene />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, type: 'spring' }} style={{ textAlign: 'center', marginBottom: '60px', background: 'linear-gradient(135deg, rgba(255,0,255,0.1), rgba(0,255,255,0.1))', padding: '40px', borderRadius: '15px', border: '2px solid transparent', borderImage: 'linear-gradient(45deg, #ff00ff, #00ffff) 1' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', margin: '0 0 10px 0', textTransform: 'uppercase', fontStyle: 'italic', textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff', color: '#fff' }}>
            {data.name}
          </h1>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 20px 0', color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>{data.title || 'LEVEL 99 CREATOR'}</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>{data.about}</p>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', md: { gridTemplateColumns: '1fr 1fr' } }}>
          
          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} style={{ background: 'rgba(0,0,0,0.6)', padding: '30px', borderLeft: '4px solid #00ffff' }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 20px 0', color: '#00ffff', textTransform: 'uppercase' }}>Skill Tree</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {data.skills?.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '10px', height: '10px', background: '#ff00ff', boxShadow: '0 0 10px #ff00ff' }} />
                  <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} style={{ background: 'rgba(0,0,0,0.6)', padding: '30px', borderRight: '4px solid #ff00ff' }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 20px 0', color: '#ff00ff', textTransform: 'uppercase' }}>Campaigns</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {data.projects?.map((p, i) => (
                <div key={i} style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', color: '#fff' }}>{p.name}</h4>
                  <p style={{ margin: 0, color: '#aaa' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
