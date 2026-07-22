import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Layers,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Cpu,
  ShieldCheck,
  Workflow,
  ChevronRight,
  ArrowUpRight,
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

function PremiumBackground() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-5, 3, -8]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[6, -2, -10]}>
          <octahedronGeometry args={[2.5, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0, -15]}>
          <torusGeometry args={[8, 0.02, 16, 100]} />
          <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Creative3D2({ data }) {
  if (!data) return null;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const allSkills = data.skills || ["Node.js", "Express.js", "React.js", "JavaScript", "MongoDB", "PostgreSQL", "TailwindCSS", "REST APIs", "Git", "Docker"];
  const splitIndex1 = Math.ceil(allSkills.length / 3);
  const splitIndex2 = Math.ceil((allSkills.length * 2) / 3);
  
  const languagesFrameworks = allSkills.slice(0, splitIndex1);
  const databasesOrams = allSkills.slice(splitIndex1, splitIndex2);
  const toolsConcepts = allSkills.slice(splitIndex2);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div style={{ backgroundColor: "#060913", color: "#f8fafc", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", width: "100%", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      
      {/* 3D Premium Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#3b82f6" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
          <PremiumBackground />
        </Canvas>
      </div>

      {/* Background Ambient Glows */}
      <div style={{ position: "fixed", top: "-10%", left: "20%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 70%)", pointerEvents: "none", zIndex: 0 }}></div>
      <div style={{ position: "fixed", top: "40%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%)", pointerEvents: "none", zIndex: 0 }}></div>

      {/* 1. Header Navigation */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(6, 9, 19, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "18px", boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}>
              {data.name ? data.name.charAt(0).toUpperCase() : "P"}
            </div>
            <span style={{ fontWeight: "700", fontSize: "19px", color: "#fff", letterSpacing: "-0.5px" }}>
              {data.name || "Portfolio"}
            </span>
          </motion.div>

          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ gap: "28px", alignItems: "center", display: "none" }}>
            {/* Nav links on desktop, hidden on very small mobile for now */}
          </motion.nav>
          
          <div style={{display: "flex", gap: "28px", alignItems: "center"}} className="hidden md:flex">
             <a href="#about" style={{ color: "#94a3b8", fontWeight: "500", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#60a5fa"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>About</a>
            <a href="#experience" style={{ color: "#94a3b8", fontWeight: "500", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#60a5fa"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>Experience</a>
            <a href="#skills" style={{ color: "#94a3b8", fontWeight: "500", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#60a5fa"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>Skills</a>
            <a href="#projects" style={{ color: "#94a3b8", fontWeight: "500", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#60a5fa"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>Projects</a>
            <a href="#contact" style={{ color: "#94a3b8", fontWeight: "500", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "#60a5fa"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>Contact</a>
          </div>

          <motion.a
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "13.5px",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
            }}
          >
            Get In Touch
          </motion.a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section style={{ padding: "120px 24px 100px 24px", maxWidth: "1100px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }} id="hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#60a5fa",
            padding: "8px 20px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "36px",
            backdropFilter: "blur(10px)",
          }}
        >
          <Sparkles size={16} color="#60a5fa" />
          <span>Available for New Projects & Opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "calc(3.2rem + 1.8vw)",
            fontWeight: "900",
            color: "#fff",
            letterSpacing: "-1.5px",
            lineHeight: "1.15",
            marginBottom: "20px",
          }}
        >
          Hi, I'm{" "}
          <span style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {data.name || "Software Engineer"}
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "1.6rem", fontWeight: "600", color: "#94a3b8", marginBottom: "28px" }}
        >
          {data.title || "Full-Stack Software Engineer"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: "750px", margin: "0 auto 48px auto", fontSize: "1.15rem", color: "#cbd5e1", lineHeight: "1.8" }}
        >
          {data.about || data.summary || "Passionate software engineer focused on building robust, scalable applications and high-performance user experiences."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: "18px", justifyContent: "center", flexWrap: "wrap", marginBottom: "80px" }}
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              color: "#fff",
              padding: "16px 36px",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "16px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 6px 24px rgba(59, 130, 246, 0.3)",
            }}
          >
            View Featured Work <ChevronRight size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "16px 36px",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "16px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backdropFilter: "blur(12px)",
            }}
          >
            Contact Me <Mail size={18} />
          </motion.a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(59, 130, 246, 0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "32px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)", textAlign: "center", transition: "all 0.3s ease" }}
          >
            <div style={{ fontSize: "2.8rem", fontWeight: "900", background: "linear-gradient(135deg, #60a5fa, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>3+ Years</div>
            <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Engineering Exp</div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(139, 92, 246, 0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "32px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)", textAlign: "center", transition: "all 0.3s ease" }}
          >
            <div style={{ fontSize: "2.8rem", fontWeight: "900", background: "linear-gradient(135deg, #a78bfa, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>{(data.projects || []).length || 15}+</div>
            <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Projects Built</div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -8, scale: 1.02, borderColor: "rgba(244, 114, 182, 0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "32px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)", textAlign: "center", transition: "all 0.3s ease" }}
          >
            <div style={{ fontSize: "2.8rem", fontWeight: "900", background: "linear-gradient(135deg, #f472b6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "8px" }}>99.9%</div>
            <div style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>Performance</div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. About & Experience Section */}
      <section style={{ backgroundColor: "rgba(10, 15, 30, 0.5)", padding: "100px 24px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", position: "relative", zIndex: 1 }} id="about">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ textAlign: "center", marginBottom: "70px" }}>
            <span style={{ color: "#60a5fa", fontWeight: "700", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>Career Snapshot</span>
            <h2 style={{ fontSize: "2.6rem", fontWeight: "900", color: "#fff", marginTop: "12px", letterSpacing: "-1px" }}>Experience & Education</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "50px" }} id="experience">
            {/* Experience Column */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeRight}>
              <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#fff", marginBottom: "30px", display: "flex", alignItems: "center", gap: "12px" }}>
                <Briefcase size={26} color="#60a5fa" /> Work Experience
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {(data.experience || [
                  {
                    company: "Tech Enterprise Solutions",
                    role: "Software Developer",
                    startDate: "2022",
                    endDate: "Present",
                    description: ["Developed high-scale REST APIs & Microservices.", "Engineered responsive frontend UI components."]
                  }
                ]).map((exp, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 8, backgroundColor: "rgba(15, 23, 42, 0.95)", borderColor: "rgba(59, 130, 246, 0.4)" }}
                    style={{ padding: "28px", backgroundColor: "rgba(15, 23, 42, 0.7)", borderLeft: "4px solid #3b82f6", borderRadius: "0 16px 16px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderRight: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backdropFilter: "blur(16px)", transition: "all 0.3s ease" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#fff" }}>{exp.role}</h4>
                      <span style={{ fontSize: "12px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", padding: "4px 12px", borderRadius: "50px", fontWeight: "600", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "#60a5fa", marginBottom: "16px" }}>{exp.company}</div>
                    {Array.isArray(exp.description) ? (
                      <ul style={{ paddingLeft: "18px", margin: 0, color: "#94a3b8", fontSize: "14.5px", lineHeight: "1.7" }}>
                        {exp.description.map((item, i) => (
                          <li key={i} style={{ marginBottom: "8px" }}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: "#94a3b8", fontSize: "14.5px", lineHeight: "1.7", margin: 0 }}>{exp.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education & Certifications Column */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeLeft}>
              <h3 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#fff", marginBottom: "30px", display: "flex", alignItems: "center", gap: "12px" }}>
                <GraduationCap size={26} color="#a78bfa" /> Education & Credentials
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {(data.education || [
                  {
                    school: "University Institute of Technology",
                    degree: "Bachelor of Science / Computer Applications",
                    year: "2019 - 2022"
                  }
                ]).map((edu, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(15, 23, 42, 0.95)", borderColor: "rgba(167, 139, 250, 0.4)" }}
                    style={{ padding: "28px", backgroundColor: "rgba(15, 23, 42, 0.7)", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.08)", backdropFilter: "blur(16px)", transition: "all 0.3s ease" }}
                  >
                    <div style={{ fontSize: "13px", color: "#a78bfa", fontWeight: "700", marginBottom: "8px" }}>{edu.year}</div>
                    <h4 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>{edu.degree}</h4>
                    <p style={{ fontSize: "14.5px", color: "#94a3b8", margin: 0 }}>{edu.school}</p>
                  </motion.div>
                ))}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{ padding: "28px", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)", border: "1px dashed rgba(96, 165, 250, 0.4)", borderRadius: "16px", marginTop: "10px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#60a5fa", fontWeight: "700", fontSize: "16px", marginBottom: "10px" }}>
                    <Award size={22} /> Verified Technical Certification
                  </div>
                  <div style={{ fontSize: "15.5px", color: "#fff", fontWeight: "600" }}>Full Stack MERN & Cloud Architecture</div>
                  <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px" }}>Certified in scalable backend & frontend web engineering</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Skills Section */}
      <section style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }} id="skills">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ textAlign: "center", marginBottom: "70px" }}>
          <span style={{ color: "#60a5fa", fontWeight: "700", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>Tech Stack</span>
          <h2 style={{ fontSize: "2.6rem", fontWeight: "900", color: "#fff", marginTop: "12px", letterSpacing: "-1px" }}>Skills & Technical Expertise</h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          {/* Card 1: Languages & Frameworks */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, borderColor: "rgba(59, 130, 246, 0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "36px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)", transition: "all 0.3s ease" }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", marginBottom: "24px" }}>
              <Code2 size={28} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff", marginBottom: "24px" }}>Languages & Frameworks</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {languagesFrameworks.map((sk, i) => (
                <span key={i} style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#cbd5e1", border: "1px solid rgba(255, 255, 255, 0.12)", padding: "8px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", transition: "all 0.2s ease" }} onMouseOver={(e) => {e.target.style.backgroundColor="rgba(59, 130, 246, 0.2)"; e.target.style.borderColor="rgba(59, 130, 246, 0.5)";}} onMouseOut={(e) => {e.target.style.backgroundColor="rgba(255, 255, 255, 0.08)"; e.target.style.borderColor="rgba(255, 255, 255, 0.12)";}}>
                  {sk}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Databases & Storage */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, borderColor: "rgba(139, 92, 246, 0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "36px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)", transition: "all 0.3s ease" }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", marginBottom: "24px" }}>
              <Layers size={28} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff", marginBottom: "24px" }}>Databases & Storage</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {databasesOrams.map((sk, i) => (
                <span key={i} style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#cbd5e1", border: "1px solid rgba(255, 255, 255, 0.12)", padding: "8px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", transition: "all 0.2s ease" }} onMouseOver={(e) => {e.target.style.backgroundColor="rgba(139, 92, 246, 0.2)"; e.target.style.borderColor="rgba(139, 92, 246, 0.5)";}} onMouseOut={(e) => {e.target.style.backgroundColor="rgba(255, 255, 255, 0.08)"; e.target.style.borderColor="rgba(255, 255, 255, 0.12)";}}>
                  {sk}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Architecture & Tools */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10, borderColor: "rgba(244, 114, 182, 0.5)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "36px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)", transition: "all 0.3s ease" }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(244, 114, 182, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f472b6", marginBottom: "24px" }}>
              <Cpu size={28} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#fff", marginBottom: "24px" }}>Architecture & Tools</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {toolsConcepts.map((sk, i) => (
                <span key={i} style={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "#cbd5e1", border: "1px solid rgba(255, 255, 255, 0.12)", padding: "8px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: "600", transition: "all 0.2s ease" }} onMouseOver={(e) => {e.target.style.backgroundColor="rgba(244, 114, 182, 0.2)"; e.target.style.borderColor="rgba(244, 114, 182, 0.5)";}} onMouseOut={(e) => {e.target.style.backgroundColor="rgba(255, 255, 255, 0.08)"; e.target.style.borderColor="rgba(255, 255, 255, 0.12)";}}>
                  {sk}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Projects Section */}
      <section style={{ backgroundColor: "rgba(10, 15, 30, 0.5)", padding: "100px 24px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", position: "relative", zIndex: 1 }} id="projects">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ textAlign: "center", marginBottom: "70px" }}>
            <span style={{ color: "#60a5fa", fontWeight: "700", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>Portfolio</span>
            <h2 style={{ fontSize: "2.6rem", fontWeight: "900", color: "#fff", marginTop: "12px", letterSpacing: "-1px" }}>Featured Work & Projects</h2>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "40px" }}>
            {(data.projects || [
              {
                name: "Full-Stack Enterprise App",
                desc: "High-performance web platform built with modular backend APIs and responsive modern frontend design.",
                tech: ["Node.js", "React", "MongoDB", "TailwindCSS"]
              }
            ]).map((proj, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -12, borderColor: "rgba(59, 130, 246, 0.5)", boxShadow: "0 24px 48px rgba(0,0,0,0.6)" }}
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  borderRadius: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backdropFilter: "blur(20px)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff" }}>{proj.name}</h3>
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
                      <ArrowUpRight size={26} color="#60a5fa" />
                    </motion.div>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.7", marginBottom: "28px" }}>
                    {proj.desc}
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {(proj.tech || []).map((t, i) => (
                      <span key={i} style={{ background: "rgba(59, 130, 246, 0.12)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.3)", padding: "6px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: "600" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Why Choose Me & Process Section */}
      <section style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "60px" }}>
          {/* Why Choose Me */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeRight}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#fff", marginBottom: "32px" }}>Why Work With Me</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <motion.div whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.4)" }} style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)" }}>
                <CheckCircle2 size={24} color="#60a5fa" style={{ marginBottom: "12px" }} />
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#fff", marginBottom: "6px" }}>High Performance</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>Optimized code for low latency.</div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, borderColor: "rgba(167, 139, 250, 0.4)" }} style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)" }}>
                <ShieldCheck size={24} color="#a78bfa" style={{ marginBottom: "12px" }} />
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#fff", marginBottom: "6px" }}>Security & RBAC</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>Enterprise auth & compliance.</div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, borderColor: "rgba(244, 114, 182, 0.4)" }} style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)" }}>
                <Cpu size={24} color="#f472b6" style={{ marginBottom: "12px" }} />
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#fff", marginBottom: "6px" }}>Scalable Arch</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>Modular microservices.</div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05, borderColor: "rgba(52, 211, 153, 0.4)" }} style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)" }}>
                <Workflow size={24} color="#34d399" style={{ marginBottom: "12px" }} />
                <div style={{ fontWeight: "800", fontSize: "15px", color: "#fff", marginBottom: "6px" }}>Agile Workflow</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>Fast delivery & clean docs.</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Development Process */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeLeft}>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#fff", marginBottom: "32px" }}>Development Workflow</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <motion.div whileHover={{ x: 10, borderColor: "rgba(59, 130, 246, 0.4)" }} style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)", display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "900", color: "#fff", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}>01</div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: "#fff", marginBottom: "4px" }}>Discovery & Architecture</div>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Analyzing requirements, API contracts and schemas.</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10, borderColor: "rgba(139, 92, 246, 0.4)" }} style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)", display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "900", color: "#fff", background: "linear-gradient(135deg, #8b5cf6, #ec4899)", width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)" }}>02</div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: "#fff", marginBottom: "4px" }}>Development & Testing</div>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>Writing clean, modular backend APIs and frontends.</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10, borderColor: "rgba(236, 72, 153, 0.4)" }} style={{ backgroundColor: "rgba(10, 15, 30, 0.7)", padding: "24px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)", display: "flex", gap: "20px", alignItems: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "900", color: "#fff", background: "linear-gradient(135deg, #ec4899, #f43f5e)", width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 15px rgba(236, 72, 153, 0.4)" }}>03</div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: "#fff", marginBottom: "4px" }}>Deployment & Maintenance</div>
                  <div style={{ fontSize: "14px", color: "#94a3b8" }}>CI/CD pipelines, production deployment, and monitoring.</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section style={{ backgroundColor: "rgba(6, 9, 19, 0.8)", padding: "100px 24px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", position: "relative", zIndex: 1 }} id="contact">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp} style={{ textAlign: "center", marginBottom: "70px" }}>
            <span style={{ color: "#60a5fa", fontWeight: "700", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>Get In Touch</span>
            <h2 style={{ fontSize: "2.6rem", fontWeight: "900", color: "#fff", marginTop: "12px", letterSpacing: "-1px" }}>Let's Work Together</h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "60px" }}>
            {/* Direct Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeRight} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#fff", marginBottom: "20px" }}>Contact Details</h3>
                <p style={{ color: "#94a3b8", fontSize: "15.5px", lineHeight: "1.8", marginBottom: "40px" }}>
                  Feel free to reach out for project inquiries, technical engineering roles, or full-time opportunities.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                  <motion.div whileHover={{ x: 8 }} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Email</div>
                      <a href={`mailto:${data.contact?.email || "contact@example.com"}`} style={{ fontSize: "16px", color: "#fff", fontWeight: "700", textDecoration: "none" }}>
                        {data.contact?.email || "contact@example.com"}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 8 }} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", border: "1px solid rgba(139, 92, 246, 0.3)" }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Phone / WhatsApp</div>
                      <a href={`tel:${data.contact?.phone || "+1234567890"}`} style={{ fontSize: "16px", color: "#fff", fontWeight: "700", textDecoration: "none" }}>
                        {data.contact?.phone || "+1 (555) 019-2834"}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 8 }} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "rgba(244, 114, 182, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f472b6", border: "1px solid rgba(244, 114, 182, 0.3)" }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Location</div>
                      <div style={{ fontSize: "16px", color: "#fff", fontWeight: "700" }}>Available Remotely & Worldwide</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div style={{ marginTop: "50px", display: "flex", gap: "16px" }}>
                {data.contact?.github && (
                  <motion.a whileHover={{ scale: 1.15, backgroundColor: "#3b82f6" }} href={data.contact.github} target="_blank" rel="noopener noreferrer" style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none", transition: "background-color 0.3s" }}>
                    <GithubIcon size={22} />
                  </motion.a>
                )}
                {data.contact?.linkedin && (
                  <motion.a whileHover={{ scale: 1.15, backgroundColor: "#0077b5" }} href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none", transition: "background-color 0.3s" }}>
                    <LinkedinIcon size={22} />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Interactive Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeLeft} style={{ backgroundColor: "rgba(10, 15, 30, 0.8)", padding: "40px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.1)", backdropFilter: "blur(20px)" }}>
              {formSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "50px 10px" }}>
                  <div style={{ width: "68px", height: "68px", borderRadius: "50%", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#4ade80", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", marginBottom: "12px" }}>Message Sent!</h4>
                  <p style={{ color: "#94a3b8", fontSize: "15px" }}>Thank you for reaching out. I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "10px" }}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "rgba(2, 6, 23, 0.8)", color: "#fff", fontSize: "15px", outline: "none", transition: "border-color 0.3s" }}
                      onFocus={(e) => e.target.style.borderColor = "#60a5fa"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.15)"}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "10px" }}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "rgba(2, 6, 23, 0.8)", color: "#fff", fontSize: "15px", outline: "none", transition: "border-color 0.3s" }}
                      onFocus={(e) => e.target.style.borderColor = "#60a5fa"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.15)"}
                    />
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "10px" }}>Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Technical Collaboration / Hiring"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "rgba(2, 6, 23, 0.8)", color: "#fff", fontSize: "15px", outline: "none", transition: "border-color 0.3s" }}
                      onFocus={(e) => e.target.style.borderColor = "#60a5fa"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.15)"}
                    />
                  </div>

                  <div style={{ marginBottom: "30px" }}>
                    <label style={{ display: "block", fontSize: "13.5px", fontWeight: "600", color: "#cbd5e1", marginBottom: "10px" }}>Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.15)", backgroundColor: "rgba(2, 6, 23, 0.8)", color: "#fff", fontSize: "15px", outline: "none", resize: "vertical", transition: "border-color 0.3s" }}
                      onFocus={(e) => e.target.style.borderColor = "#60a5fa"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.15)"}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      color: "#fff",
                      padding: "16px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      fontSize: "16px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <Send size={18} /> Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer style={{ backgroundColor: "#02040a", color: "#64748b", padding: "60px 24px 40px 24px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "900", color: "#fff", marginBottom: "6px" }}>{data.name || "Portfolio"}</div>
            <div style={{ fontSize: "14.5px", color: "#94a3b8" }}>{data.title || "Full Stack Software Engineer"}</div>
          </div>

          <div style={{ fontSize: "14.5px" }}>
            © {new Date().getFullYear()} {data.name || "Portfolio"}. Crafted with AI Portfolio Studio.
          </div>
        </div>
      </footer>

    </div>
  );
}
