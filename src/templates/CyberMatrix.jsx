import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text } from "@react-three/drei";
import {
  Terminal,
  Cpu,
  Code,
  Database,
  Layers,
  Zap,
  Globe,
  Mail,
  Send,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

function GithubIcon(props) {
  return (
    <svg width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg width={props.size || 18} height={props.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function CyberParticles() {
  const count = 1000;
  const meshRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const isBlue = Math.random() > 0.5;
      col[i * 3] = isBlue ? 0.0 : 0.0;
      col[i * 3 + 1] = isBlue ? 1.0 : 0.8;
      col[i * 3 + 2] = isBlue ? 0.8 : 0.2;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GridBackground() {
  return (
    <group position={[0, -2, -5]} rotation={[Math.PI / 2, 0, 0]}>
      <gridHelper args={[50, 50, "#00ffcc", "#00ffcc"]} material-opacity={0.15} material-transparent />
    </group>
  );
}

export default function CyberMatrixTemplate({ data }) {
  if (!data) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const allSkills = data.skills || ["React", "Three.js", "WebGL", "TypeScript", "Node.js", "Python", "GraphQL", "AWS", "Docker", "Cybersecurity"];

  return (
    <div style={{ backgroundColor: "#020617", color: "#e2e8f0", fontFamily: "'Space Grotesk', 'Inter', sans-serif", width: "100%", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      
      {/* 3D Cyber Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <CyberParticles />
          <GridBackground />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
        </Canvas>
      </div>

      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 1) 100%)", pointerEvents: "none", zIndex: 0 }}></div>

      {/* Navigation */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(0, 255, 204, 0.1)", backgroundColor: "rgba(2, 6, 23, 0.8)", backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#00ffcc", fontWeight: "bold", fontSize: "20px", letterSpacing: "1px" }}>
            <Terminal size={24} />
            <span>{data.name?.toUpperCase() || "SYS.ADMIN"}</span>
          </motion.div>
          <div style={{ display: "flex", gap: "24px" }} className="hidden md:flex">
             <a href="#about" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px" }}>// About</a>
             <a href="#skills" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px" }}>// Skills</a>
             <a href="#projects" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "1px" }}>// Projects</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, padding: "0 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div style={{ color: "#00ffcc", fontFamily: "monospace", fontSize: "16px", marginBottom: "20px" }}>
              &gt; INITIALIZING_SYSTEM_USER: {data.name || "GUEST"}...
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: "900", lineHeight: "1.1", marginBottom: "24px", color: "#f8fafc", textShadow: "0 0 20px rgba(0, 255, 204, 0.3)" }}
            >
              {data.title || "CREATIVE TECHNOLOGIST"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: "600px", lineHeight: "1.6", marginBottom: "40px" }}
            >
              {data.about || "Building the next generation of digital experiences at the intersection of design and engineering."}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ display: "flex", gap: "20px" }}>
              <a href="#projects" style={{ background: "rgba(0, 255, 204, 0.1)", border: "1px solid #00ffcc", color: "#00ffcc", padding: "12px 32px", fontSize: "14px", fontWeight: "bold", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", transition: "all 0.2s" }} onMouseOver={(e) => { e.target.style.background = "#00ffcc"; e.target.style.color = "#020617"; }} onMouseOut={(e) => { e.target.style.background = "rgba(0, 255, 204, 0.1)"; e.target.style.color = "#00ffcc"; }}>
                <Zap size={18} /> INITIALIZE
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "100px 24px", position: "relative", zIndex: 1, borderTop: "1px dashed rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", display: "flex", alignItems: "center", gap: "12px" }}>
              <Cpu color="#00ffcc" /> SYS.CAPABILITIES
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
            {allSkills.map((skill, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.05, borderColor: "#00ffcc" }} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15, 23, 42, 0.5)", padding: "20px", display: "flex", alignItems: "center", gap: "12px", backdropFilter: "blur(5px)" }}>
                <Code size={18} color="#94a3b8" />
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#e2e8f0" }}>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" style={{ padding: "100px 24px", position: "relative", zIndex: 1, backgroundColor: "rgba(15, 23, 42, 0.3)", borderTop: "1px dashed rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginBottom: "60px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", display: "flex", alignItems: "center", gap: "12px" }}>
              <Database color="#00ffcc" /> EXECUTED_PROGRAMS
            </h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            {(data.projects || [
              { name: "Neural Network Viz", desc: "Interactive WebGL visualization of deep learning layers.", tech: ["Three.js", "React"] },
              { name: "Quantum Protocol", desc: "Decentralized data exchange interface with high security.", tech: ["Rust", "WebAssembly"] }
            ]).map((proj, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -10 }} style={{ border: "1px solid rgba(0, 255, 204, 0.2)", background: "linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(2, 6, 23, 0.9) 100%)", padding: "30px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", backgroundColor: "#00ffcc" }}></div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "16px", color: "#fff" }}>{proj.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6", marginBottom: "24px" }}>{proj.desc}</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {(proj.tech || []).map((t, idx) => (
                    <span key={idx} style={{ fontSize: "12px", fontFamily: "monospace", color: "#00ffcc", background: "rgba(0, 255, 204, 0.1)", padding: "4px 8px" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer style={{ padding: "80px 24px", position: "relative", zIndex: 1, borderTop: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ fontSize: "2rem", fontWeight: "800", color: "#fff", marginBottom: "20px" }}>ESTABLISH_CONNECTION</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ color: "#94a3b8", marginBottom: "40px" }}>Open to new nodes in my network. Send a transmission.</motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            {data.contact?.github && (
              <a href={data.contact.github} style={{ color: "#00ffcc", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "16px" }}><GithubIcon size={20}/> GITHUB</a>
            )}
            {data.contact?.linkedin && (
              <a href={data.contact.linkedin} style={{ color: "#00ffcc", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "16px" }}><LinkedinIcon size={20}/> LINKEDIN</a>
            )}
            <a href={`mailto:${data.contact?.email || "hello@example.com"}`} style={{ color: "#00ffcc", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "16px" }}><Mail size={20}/> EMAIL</a>
          </motion.div>
          <div style={{ marginTop: "60px", fontSize: "12px", color: "#475569", fontFamily: "monospace" }}>
            © {new Date().getFullYear()} // SYSTEM ID: {data.name || "PORTFOLIO"}
          </div>
        </div>
      </footer>
    </div>
  );
}
