import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function FallingLeaves() {
  const count = 30;
  
  const leaves = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((leaf, i) => {
        leaf.position.y -= leaves[i].speed;
        leaf.rotation.x += leaves[i].speed;
        leaf.rotation.y += leaves[i].speed;
        if (leaf.position.y < -5) {
          leaf.position.y = 5;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {leaves.map((props, i) => (
        <mesh key={i} position={props.position} rotation={props.rotation} scale={props.scale}>
          {/* Simple leaf shape using a cone and stretching it */}
          <coneGeometry args={[0.5, 1.5, 3]} />
          <meshStandardMaterial color="#8bc34a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function ZenScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#f1f8e9' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#f1f8e9', 5, 15]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#fffde7" castShadow />
        <FallingLeaves />
      </Canvas>
    </div>
  );
}

export default function ZenTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#33691e', fontFamily: "'Georgia', serif" }}>
      <ZenScene />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: 'easeOut' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#c5e1a5', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#558b2f' }}>
            {data.name?.charAt(0)}
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'normal', margin: '0 0 10px 0', letterSpacing: '2px' }}>{data.name}</h1>
          <h2 style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#7cb342', margin: '0 0 40px 0' }}>{data.title || 'Harmony & Balance'}</h2>
          
          <div style={{ width: '50px', height: '2px', backgroundColor: '#8bc34a', margin: '0 auto 40px auto' }} />
          
          <p style={{ fontSize: '1.2rem', lineHeight: '2', color: '#558b2f' }}>{data.about}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} style={{ marginTop: '80px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 'normal', borderBottom: '1px solid #c5e1a5', paddingBottom: '10px', marginBottom: '30px' }}>Cultivated Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {data.skills?.map((s, i) => (
              <span key={i} style={{ padding: '8px 20px', backgroundColor: 'transparent', border: '1px solid #8bc34a', borderRadius: '2px', color: '#558b2f' }}>{s}</span>
            ))}
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} style={{ marginTop: '80px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 'normal', borderBottom: '1px solid #c5e1a5', paddingBottom: '10px', marginBottom: '30px' }}>Journey & Creation</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {data.projects?.map((p, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.5)', padding: '30px', borderLeft: '3px solid #8bc34a' }}>
                <h4 style={{ fontSize: '1.4rem', margin: '0 0 15px 0' }}>{p.name}</h4>
                <p style={{ lineHeight: '1.8', color: '#558b2f', margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
