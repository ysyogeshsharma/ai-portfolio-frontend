import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

function MatrixStream() {
  const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
  
  const strings = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      text: Array.from({ length: 15 }).map(() => characters[Math.floor(Math.random() * characters.length)]).join('\n'),
      position: [(Math.random() - 0.5) * 20, Math.random() * 20 - 10, (Math.random() - 0.5) * 10 - 5],
      speed: Math.random() * 0.05 + 0.02,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, []);

  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y -= strings[i].speed;
        if (child.position.y < -15) {
          child.position.y = 15;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {strings.map((props, i) => (
        <Text key={i} position={props.position} color="#00ff41" fontSize={0.5} maxWidth={1} lineHeight={1} letterSpacing={0.1} fillOpacity={props.opacity} anchorX="center" anchorY="top">
          {props.text}
        </Text>
      ))}
    </group>
  );
}

function DataScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#0d1117' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <MatrixStream />
      </Canvas>
    </div>
  );
}

export default function DataStreamTemplate({ data }) {
  if (!data) return null;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', color: '#e6edf3', fontFamily: "'Fira Code', 'Courier New', monospace" }}>
      <DataScene />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ border: '1px solid #3fb950', background: 'rgba(13, 17, 23, 0.8)', padding: '40px', boxShadow: '0 0 20px rgba(63, 185, 80, 0.2)' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#3fb950' }}>{'>'} {data.name}_</h1>
          <h2 style={{ fontSize: '1.2rem', color: '#8b949e', margin: '0 0 30px 0' }}>// {data.title || 'System Architect'}</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#c9d1d9' }}>{data.about}</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ borderLeft: '4px solid #3fb950', background: 'rgba(13, 17, 23, 0.8)', padding: '30px' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#3fb950', margin: '0 0 20px 0' }}>{'['} Registered Protocols {']'}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {data.skills?.map((s, i) => (
              <span key={i} style={{ color: '#58a6ff', background: 'rgba(56, 139, 253, 0.1)', padding: '5px 10px', border: '1px solid rgba(56, 139, 253, 0.4)' }}>{s}</span>
            ))}
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ borderRight: '4px solid #3fb950', background: 'rgba(13, 17, 23, 0.8)', padding: '30px', textAlign: 'right' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#3fb950', margin: '0 0 20px 0' }}>Active Clusters</h3>
          {data.projects?.map((p, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #30363d', paddingBottom: '20px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#e6edf3', fontSize: '1.2rem' }}>{p.name}</h4>
              <p style={{ margin: 0, color: '#8b949e' }}>{p.desc}</p>
            </div>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
}
