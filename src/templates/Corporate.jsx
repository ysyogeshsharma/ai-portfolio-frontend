import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Briefcase, Activity, CheckCircle, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

function NetworkNodes() {
  const nodeCount = 40;
  
  const points = useMemo(() => {
    const pts = [];
    for(let i=0; i<nodeCount; i++) {
       // Create points within a sphere radius
       const radius = 6 * Math.cbrt(Math.random());
       const theta = Math.random() * 2 * Math.PI;
       const phi = Math.acos(2 * Math.random() - 1);
       const x = radius * Math.sin(phi) * Math.cos(theta);
       const y = radius * Math.sin(phi) * Math.sin(theta);
       const z = radius * Math.cos(phi);
       pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  const groupRef = useRef();
  
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
         <Float key={i} speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
           <mesh position={p}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#3b82f6" />
           </mesh>
         </Float>
      ))}
      
      {/* Create connecting lines for nearby nodes */}
      {points.map((p1, i) => 
        points.slice(i + 1).map((p2, j) => {
          if (p1.distanceTo(p2) < 3.5) {
            return (
              <Line 
                key={`${i}-${j}`} 
                points={[p1, p2]} 
                color="#60a5fa" 
                lineWidth={0.5} 
                transparent opacity={0.15} 
              />
            );
          }
          return null;
        })
      )}
    </group>
  );
}

function CorporateScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, #0F172A 0%, #020617 100%)' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#020617', 5, 20]} />
        <NetworkNodes />
      </Canvas>
    </div>
  );
}

export default function CorporateTemplate({ data }) {
  if (!data) return null;

  return (
    <div className="font-sans" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <CorporateScene />
      
      {/* Sidebar Navigation */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }}}>
        
        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
            
            {/* Hero / Executive Summary */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '50px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '30px' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: '#60a5fa' }}>
                  {data.name?.charAt(0)}
                </div>
                <div>
                  <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 10px 0', letterSpacing: '-1px' }}>{data.name}</h1>
                  <h2 style={{ fontSize: '1.4rem', color: '#94a3b8', margin: 0, fontWeight: '500' }}>{data.title || 'Executive Leadership'}</h2>
                </div>
              </div>
              
              <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <Briefcase size={24} color="#60a5fa" /> Executive Summary
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                  {data.about}
                </p>
              </div>
            </motion.section>

            {/* Core Competencies (Skills) */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '50px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                <Activity size={24} color="#60a5fa" /> Core Competencies
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {data.skills?.map((skill, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                    style={{ padding: '16px 20px', backgroundColor: 'rgba(30, 41, 59, 0.8)', borderRadius: '8px', borderLeft: '4px solid #3b82f6', display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <CheckCircle size={18} color="#60a5fa" />
                    <span style={{ fontSize: '1.05rem', fontWeight: '500', color: '#f1f5f9' }}>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Key Initiatives (Projects) */}
            <motion.section 
              style={{ paddingBottom: '60px' }}
            >
              <motion.h3 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}
              >
                <Activity size={24} color="#60a5fa" /> Key Initiatives
              </motion.h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {data.projects?.map((proj, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5 }}
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '40px', borderRadius: '16px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#3b82f6' }} />
                    <h4 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#f8fafc', margin: '0 0 15px 0' }}>{proj.name}</h4>
                    <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '25px' }}>{proj.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {proj.tech?.map((t, i) => (
                        <span key={i} style={{ padding: '6px 12px', backgroundColor: 'rgba(30, 41, 59, 1)', color: '#94a3b8', borderRadius: '4px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

          </div>
        </main>
      </div>
    </div>
  );
}
