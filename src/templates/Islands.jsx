import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cylinder, Cone, Float, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';

function FloatingIsland() {
  const islandRef = useRef();

  useFrame((state) => {
    islandRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={islandRef} position={[0, -2, -5]}>
        {/* Island Base (Dirt) */}
        <Cylinder args={[3, 1, 3, 8]} position={[0, -1.5, 0]}>
          <meshStandardMaterial color="#8B4513" roughness={1} />
        </Cylinder>
        {/* Island Surface (Grass) */}
        <Cylinder args={[3.2, 3, 0.5, 8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#228B22" roughness={0.8} />
        </Cylinder>
        {/* Tree 1 */}
        <group position={[-1, 0.5, 1]}>
          <Cylinder args={[0.2, 0.2, 1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#5C4033" />
          </Cylinder>
          <Cone args={[1, 2, 8]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#006400" />
          </Cone>
        </group>
        {/* Tree 2 */}
        <group position={[1.5, 0.5, -0.5]} scale={0.7}>
          <Cylinder args={[0.2, 0.2, 1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#5C4033" />
          </Cylinder>
          <Cone args={[1, 2, 8]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#006400" />
          </Cone>
        </group>
        {/* Decorative Rock */}
        <Sphere args={[0.4, 8, 8]} position={[0.5, 0.2, 1.5]}>
          <meshStandardMaterial color="#808080" />
        </Sphere>
      </group>
    </Float>
  );
}

function IslandScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#87CEEB' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <FloatingIsland />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default function IslandsTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#333', fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif" }}>
      <IslandScene />
      
      <div style={{ position: 'relative', zIndex: 10, padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.5 }} style={{ background: '#fff', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: '4px solid #FFD700', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0', color: '#FF8C00' }}>{data.name}</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#555' }}>{data.about}</p>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} style={{ background: '#fff', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: '4px solid #32CD32' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#228B22', margin: '0 0 20px 0' }}>Capabilities</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.skills?.map((s, i) => (
                <li key={i} style={{ background: '#F0E68C', padding: '10px', borderRadius: '15px', fontWeight: 'bold' }}>{s}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ background: '#fff', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: '4px solid #1E90FF' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#0000CD', margin: '0 0 20px 0' }}>Adventures</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {data.projects?.map((p, i) => (
                <div key={i} style={{ textAlign: 'left', background: '#E6E6FA', padding: '15px', borderRadius: '15px' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#4B0082' }}>{p.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
