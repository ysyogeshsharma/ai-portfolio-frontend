import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import {
  Feather,
  Sun,
  Layout,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  MapPin,
  Mail
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

function EtherealShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[-3, 2, -5]}>
          <MeshDistortMaterial color="#fca5a5" attach="material" distort={0.4} speed={1.5} roughness={0.1} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[2, 64, 64]} position={[4, -1, -6]}>
          <MeshDistortMaterial color="#bae6fd" attach="material" distort={0.5} speed={2} roughness={0.1} />
        </Sphere>
      </Float>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.2}>
        <Sphere args={[1, 64, 64]} position={[0, -3, -4]}>
          <MeshDistortMaterial color="#d8b4fe" attach="material" distort={0.3} speed={1} roughness={0.1} />
        </Sphere>
      </Float>
    </>
  );
}

export default function EtherealTemplate({ data }) {
  if (!data) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const allSkills = data.skills || ["UI/UX Design", "React", "Figma", "Interaction Design", "Framer Motion", "Tailwind CSS", "CSS3", "Typography", "Branding"];

  return (
    <div style={{ backgroundColor: "#fdfdfd", color: "#334155", fontFamily: "'Outfit', 'Inter', sans-serif", width: "100%", minHeight: "100vh", position: "relative", overflowX: "clip" }}>
      
      {/* 3D Ethereal Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#fca5a5" />
          <EtherealShapes />
        </Canvas>
      </div>

      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg, rgba(253, 253, 253, 0.2) 0%, rgba(253, 253, 253, 0.9) 100%)", pointerEvents: "none", zIndex: 0 }}></div>

      {/* Navigation */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(253, 253, 253, 0.7)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0, 0, 0, 0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#0f172a", fontWeight: "800", fontSize: "22px", letterSpacing: "-0.5px" }}>
            <Sun size={24} color="#f87171" />
            <span>{data.name || "Portfolio"}</span>
          </motion.div>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="hidden md:flex">
             <a href="#about" style={{ color: "#64748b", fontSize: "15px", fontWeight: "500", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#0f172a"} onMouseOut={(e) => e.target.style.color = "#64748b"}>About</a>
             <a href="#work" style={{ color: "#64748b", fontSize: "15px", fontWeight: "500", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#0f172a"} onMouseOut={(e) => e.target.style.color = "#64748b"}>Work</a>
             <a href="#contact" style={{ backgroundColor: "#0f172a", color: "#fff", padding: "10px 24px", borderRadius: "50px", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "transform 0.2s" }} onMouseOver={(e) => e.target.style.transform = "scale(1.05)"} onMouseOut={(e) => e.target.style.transform = "scale(1)"}>Say Hello</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ minHeight: "85vh", display: "flex", alignItems: "center", position: "relative", zIndex: 1, padding: "0 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ display: "inline-flex", padding: "8px 20px", borderRadius: "50px", backgroundColor: "#fef2f2", color: "#f87171", fontWeight: "600", fontSize: "14px", marginBottom: "30px", border: "1px solid #fee2e2" }}>
              Crafting Digital Elegance
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: "900", lineHeight: "1.1", marginBottom: "24px", color: "#0f172a", letterSpacing: "-1.5px" }}
            >
              {data.title || "Creative Designer & Developer"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ fontSize: "1.3rem", color: "#64748b", maxWidth: "600px", margin: "0 auto 40px auto", lineHeight: "1.6" }}
            >
              {data.about || "Bringing minimalist aesthetics and fluid animations to modern web experiences."}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Work/Projects */}
      <section id="work" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ marginBottom: "60px", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-1px" }}>Selected Works</h2>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px" }}>
            {(data.projects || [
              { name: "Minimalist E-commerce", desc: "A clean, whitespace-heavy storefront focusing on typography and product imagery.", tech: ["React", "Framer Motion", "Shopify"] },
              { name: "Brand Identity", desc: "Complete visual overhaul including logo design, color theory, and digital assets.", tech: ["Figma", "Illustrator"] }
            ]).map((proj, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -12 }} style={{ backgroundColor: "#ffffff", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 40px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "280px" }}>
                <div>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>{proj.name}</h3>
                  <p style={{ color: "#64748b", fontSize: "16px", lineHeight: "1.6" }}>{proj.desc}</p>
                </div>
                <div style={{ marginTop: "30px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {(proj.tech || []).map((t, idx) => (
                    <span key={idx} style={{ backgroundColor: "#f1f5f9", color: "#475569", padding: "6px 16px", borderRadius: "50px", fontSize: "13px", fontWeight: "600" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ padding: "100px 24px", position: "relative", zIndex: 1, backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ marginBottom: "60px", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-1px" }}>Expertise</h2>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
            {allSkills.map((skill, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ scale: 1.05 }} style={{ backgroundColor: "#ffffff", padding: "14px 24px", borderRadius: "50px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.02)", fontSize: "15px", fontWeight: "600", color: "#334155" }}>
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" style={{ padding: "100px 24px 60px 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ fontSize: "3rem", fontWeight: "900", color: "#0f172a", marginBottom: "24px", letterSpacing: "-1px" }}>
            Let's create something beautiful.
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ color: "#64748b", fontSize: "18px", marginBottom: "40px" }}>
            Currently available for freelance opportunities.
          </motion.p>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
             <a href={`mailto:${data.contact?.email || "hello@example.com"}`} style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "16px 36px", borderRadius: "50px", fontSize: "16px", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", transition: "transform 0.2s" }} onMouseOver={(e) => e.target.style.transform = "scale(1.05)"} onMouseOut={(e) => e.target.style.transform = "scale(1)"}>
               <Mail size={18}/> Contact Me
             </a>
          </motion.div>

          <div style={{ marginTop: "80px", display: "flex", justifyContent: "center", gap: "24px" }}>
            {data.contact?.github && (
              <a href={data.contact.github} style={{ color: "#64748b" }}><GithubIcon size={24}/></a>
            )}
            {data.contact?.linkedin && (
              <a href={data.contact.linkedin} style={{ color: "#64748b" }}><LinkedinIcon size={24}/></a>
            )}
          </div>
          
          <div style={{ marginTop: "40px", fontSize: "14px", color: "#94a3b8" }}>
            © {new Date().getFullYear()} {data.name || "Portfolio"}. Designed with minimal elegance.
          </div>
        </div>
      </footer>
    </div>
  );
}
