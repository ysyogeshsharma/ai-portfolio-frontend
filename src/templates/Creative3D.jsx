import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Layout, Blocks } from 'lucide-react';

function FloatingObjects() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-2, 1, -3]}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial color="#8a2be2" wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[2, -1, -2]}>
          <octahedronGeometry args={[1.5]} />
          <meshStandardMaterial color="#58a6ff" opacity={0.8} transparent />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0, 2, -5]}>
          <icosahedronGeometry args={[1]} />
          <meshStandardMaterial color="#ff7b72" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export default function Creative3D({ data }) {
  if (!data) return null;

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-white overflow-y-hidden font-sans">

      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <FloatingObjects />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-20">

        {/* Header/Hero Section */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-32 h-32 rounded-full mx-auto mb-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-5xl font-bold bg-opacity-80 backdrop-blur-sm">
                {data.name?.charAt(0)}
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.name}
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl text-slate-300 font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.title}
          </motion.h2>

          <motion.p
            className="max-w-2xl text-lg text-slate-400 leading-relaxed mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {data.about}
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-slate-500"
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        {/* Skills Section */}
        <motion.section
          className="my-32"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 !mb-8 justify-center">
            <Blocks size={32} className="text-purple-400" />
            <h3 className="text-4xl font-bold">Tech Stack</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {data.skills?.map((skill, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                className="!px-6 !py-1 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md text-lg text-slate-200 cursor-pointer transition-colors"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 !mb-8 !mt-10 justify-center">
            <Layout size={32} className="text-emerald-400" />
            <h3 className="text-4xl font-bold">Featured Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects?.map((proj, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="!p-8 rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <h4 className="text-2xl font-bold mb-4 text-slate-100 flex items-center gap-3">
                  <Code size={24} className="text-blue-400" /> {proj.name}
                </h4>
                <p className="text-slate-400 mb-6 line-clamp-3">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech?.map((t, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1 rounded-md bg-slate-950 text-emerald-400 border border-emerald-900/30">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
