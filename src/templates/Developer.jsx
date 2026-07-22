import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, ChevronRight } from 'lucide-react';

function WireframeMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Box args={[3.5, 3.5, 3.5]} ref={meshRef}>
        <meshBasicMaterial color="#00ff41" wireframe transparent opacity={0.3} />
      </Box>
      <Box args={[4.5, 4.5, 4.5]}>
        <meshBasicMaterial color="#008f11" wireframe transparent opacity={0.1} />
      </Box>
    </Float>
  );
}

function WireframeScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: '#0a0a0a' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <WireframeMesh />
      </Canvas>
      {/* Subtle CRT Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%'
      }}></div>
    </div>
  );
}

export default function DeveloperTemplate({ data }) {
  if (!data) return null;

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring' } }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'clip', backgroundColor: '#050505', color: '#00ff41', fontFamily: "'Fira Code', 'Courier New', monospace" }}>
      <WireframeScene />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Header Terminal Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ backgroundColor: 'rgba(0, 20, 0, 0.7)', border: '1px solid #008f11', borderRadius: '8px', padding: '30px', backdropFilter: 'blur(5px)' }}
        >
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Terminal size={36} /> root@{data.name?.replace(/\s+/g, '_').toLowerCase() || 'user'}:~$
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#008f11' }}>{'>'} {data.title || 'Developer'}</p>
          <div style={{ marginTop: '20px', color: '#ccc', lineHeight: '1.6' }}>
            <span style={{ color: '#00ff41' }}>{'>'} cat about.txt</span>
            <br/>{data.about}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          variants={containerVars} initial="hidden" animate="show"
          style={{ backgroundColor: 'rgba(0, 20, 0, 0.7)', border: '1px solid #008f11', borderRadius: '8px', padding: '30px', backdropFilter: 'blur(5px)' }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu size={28}/> ./skills.sh
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {data.skills?.map((skill, idx) => (
              <motion.div key={idx} variants={itemVars} style={{ padding: '8px 16px', border: '1px dashed #00ff41', backgroundColor: 'rgba(0, 255, 65, 0.1)', color: '#00ff41', borderRadius: '4px' }}>
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects / Experience Section */}
        <motion.div 
          variants={containerVars} initial="hidden" animate="show"
          style={{ backgroundColor: 'rgba(0, 20, 0, 0.7)', border: '1px solid #008f11', borderRadius: '8px', padding: '30px', backdropFilter: 'blur(5px)' }}
        >
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code size={28}/> ls -la ./projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.projects?.map((proj, idx) => (
              <motion.div key={idx} variants={itemVars} style={{ padding: '20px', borderLeft: '3px solid #008f11', backgroundColor: 'rgba(0, 15, 0, 0.5)' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 10px 0', display: 'flex', alignItems: 'center' }}>
                  <ChevronRight size={20} color="#00ff41"/> {proj.name}
                </h3>
                <p style={{ color: '#ccc', margin: '0 0 15px 0', lineHeight: '1.5' }}>{proj.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {proj.tech?.map((t, i) => (
                     <span key={i} style={{ fontSize: '0.85rem', color: '#008f11', padding: '2px 8px', backgroundColor: '#000', borderRadius: '4px' }}>[{t}]</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
