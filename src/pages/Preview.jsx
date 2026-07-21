import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DeveloperTemplate from "../templates/Developer";
import MinimalistTemplate from "../templates/Minimalist";
import Creative3DTemplate from "../templates/Creative3D";
import CorporateTemplate from "../templates/Corporate";
import SynthwaveTemplate from "../templates/Synthwave";
import GalaxyTemplate from "../templates/Galaxy";
import WavesTemplate from "../templates/Waves";
import HolographicTemplate from "../templates/Holographic";
import ZenTemplate from "../templates/Zen";
import BrutalistTemplate from "../templates/Brutalist";
import GlassTemplate from "../templates/Glass";
import DataStreamTemplate from "../templates/DataStream";
import NeonTemplate from "../templates/Neon";
import IslandsTemplate from "../templates/Islands";
import ParticlesTemplate from "../templates/Particles";
import OrbsTemplate from "../templates/Orbs";
import TunnelTemplate from "../templates/Tunnel";
import VortexTemplate from "../templates/Vortex";
import CubeGridTemplate from "../templates/CubeGrid";
import LowPolyTemplate from "../templates/LowPoly";
import ClassicResume from "../templates/ClassicResume";
import ModernResume from "../templates/ModernResume";
import TechResume from "../templates/TechResume";
import MinimalistResume from "../templates/MinimalistResume";
import CreativeResume from "../templates/CreativeResume";
import ExecutiveResume from "../templates/ExecutiveResume";
import StartupResume from "../templates/StartupResume";
import AcademicResume from "../templates/AcademicResume";
import InfographicResume from "../templates/InfographicResume";
import ElegantResume from "../templates/ElegantResume";
import DesignerResume from "../templates/DesignerResume";
import CorporateResume from "../templates/CorporateResume";
import TrendyResume from "../templates/TrendyResume";
import CleanResume from "../templates/CleanResume";
import BoldResume from "../templates/BoldResume";
import TwoColumnMinimal from "../templates/TwoColumnMinimal";
import ChronologicalPro from "../templates/ChronologicalPro";
import DataEditorSidebar from "../components/DataEditorSidebar";
import { API_BASE_URL } from "../config";

import {
  ArrowLeft,
  Monitor,
  Layout,
  Download,
  Share2,
  Code as CodeIcon,
  Sparkles,
  Briefcase,
  Globe,
  Mountain,
  Droplet,
  Sun,
  Wind,
  Box,
  Disc,
  Terminal,
  Zap,
  Map,
  FileText,
  GraduationCap,
  Grid,
  Building,
  Star,
  Feather,
  Anchor,
  Edit3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Copy,
  ExternalLink,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

const PORTFOLIO_TEMPLATES = [
  { id: "creative3d", Icon: Sparkles, color: "#c084fc", label: "3D Creative" },
  { id: "developer", Icon: Terminal, color: "#4ade80", label: "Cyberpunk" },
  { id: "minimalist", Icon: Layout, color: "#94a3b8", label: "Minimalist" },
  { id: "corporate", Icon: Briefcase, color: "#60a5fa", label: "Corporate" },
  { id: "synthwave", Icon: Mountain, color: "#f472b6", label: "Synthwave" },
  { id: "galaxy", Icon: Globe, color: "#818cf8", label: "Space Galaxy" },
  { id: "waves", Icon: Droplet, color: "#38bdf8", label: "Abstract Waves" },
  { id: "holographic", Icon: Disc, color: "#e879f9", label: "Holographic" },
  { id: "zen", Icon: Wind, color: "#a3e635", label: "Zen Nature" },
  { id: "brutalist", Icon: Box, color: "#52525b", label: "Brutalist 3D" },
  { id: "glass", Icon: Layout, color: "#7dd3fc", label: "Glassmorphism" },
  { id: "datastream", Icon: CodeIcon, color: "#a7f3d0", label: "Data Stream" },
  { id: "neon", Icon: Zap, color: "#fbbf24", label: "Neon Grid" },
  { id: "islands", Icon: Map, color: "#fb923c", label: "Islands" },
  { id: "particles", Icon: Sparkles, color: "#818cf8", label: "3D Particles" },
  { id: "orbs", Icon: Globe, color: "#e2e8f0", label: "Glass Orbs" },
  { id: "tunnel", Icon: CodeIcon, color: "#00ffcc", label: "Wireframe Tunnel" },
  { id: "vortex", Icon: Globe, color: "#ff0055", label: "Vortex Galaxy" },
  { id: "cubegrid", Icon: Box, color: "#4f46e5", label: "Isometric Cubes" },
  {
    id: "lowpoly",
    Icon: Mountain,
    color: "#ff00cc",
    label: "Synthwave Terrain",
  },
];

const RESUME_TEMPLATES = [
  {
    id: "resume_classic",
    Icon: FileText,
    color: "#ffffff",
    label: "Classic ATS PDF",
  },
  {
    id: "resume_modern",
    Icon: FileText,
    color: "#3b82f6",
    label: "Modern Layout",
  },
  { id: "resume_tech", Icon: Terminal, color: "#22c55e", label: "Tech / Code" },
  {
    id: "resume_minimalist",
    Icon: Layout,
    color: "#cbd5e1",
    label: "Minimalist",
  },
  {
    id: "resume_creative",
    Icon: Sparkles,
    color: "#f43f5e",
    label: "Creative",
  },
  {
    id: "resume_executive",
    Icon: Briefcase,
    color: "#ca8a04",
    label: "Executive",
  },
  { id: "resume_startup", Icon: Zap, color: "#0ea5e9", label: "Startup" },
  {
    id: "resume_academic",
    Icon: GraduationCap,
    color: "#78716c",
    label: "Academic CV",
  },
  {
    id: "resume_infographic",
    Icon: Map,
    color: "#8b5cf6",
    label: "Infographic",
  },
  { id: "resume_elegant", Icon: Sun, color: "#fca5a5", label: "Elegant" },
  { id: "resume_designer", Icon: Grid, color: "#ff5e62", label: "Designer" },
  {
    id: "resume_corporate",
    Icon: Building,
    color: "#333333",
    label: "Corporate",
  },
  { id: "resume_trendy", Icon: Star, color: "#6366f1", label: "Trendy" },
  { id: "resume_clean", Icon: Feather, color: "#cbd5e1", label: "Clean" },
  {
    id: "resume_bold",
    Icon: Anchor,
    color: "#000000",
    label: "Bold High-Contrast",
  },
  {
    id: "resume_twocolumn_minimal",
    Icon: Layout,
    color: "#64748b",
    label: "Dark Split Minimal",
  },
  {
    id: "resume_chronological",
    Icon: Briefcase,
    color: "#3b82f6",
    label: "Pro Chronological",
  },
];

function Code(props) {
  return <CodeIcon {...props} />;
}

export default function Preview() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const [portfolioData, setPortfolioData] = useState(() => {
    let encodedData = params.get("data");
    if (encodedData) {
      try {
        // Restore standard Base64 characters from URL-safe variants
        encodedData = encodedData.replace(/-/g, '+').replace(/_/g, '/');
        while (encodedData.length % 4) {
          encodedData += '=';
        }
        const decodedStr = decodeURIComponent(atob(encodedData).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(decodedStr);
      } catch (e) {
        console.error("Failed to decode shared data", e);
      }
    }
    const savedData = localStorage.getItem("portfolioData");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse", savedData);
      }
    }
    return null;
  });

  const [activeTemplate, setActiveTemplate] = useState(() => {
    const templateParam = params.get("template");
    if (templateParam) return templateParam;
    return localStorage.getItem("selectedTemplate") || "creative3d";
  });

  const [loadingDb, setLoadingDb] = useState(!!id);
  const [saveStatus, setSaveStatus] = useState("synced"); // "synced", "saving", "error"
  const isInitialMount = useRef(true);

  const [isEditing, setIsEditing] = useState(false);
  const scrollContainerRef = useRef(null);

  const [builderType, setBuilderType] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam) return typeParam;
    return localStorage.getItem("builderType") || "portfolio";
  });

  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveDomain, setLiveDomain] = useState(
    localStorage.getItem("vercelDomain") || ""
  );

  const [dbPublishLink, setDbPublishLink] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [dbCopied, setDbCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePublish = async () => {
    setPublishing(true);
    setPublishError("");
    try {
      const response = await fetch(`${API_BASE_URL}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: activeTemplate,
          portfolioData: portfolioData
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to publish.");
      }

      // Compute the live URL using the custom domain override or location.origin
      const baseDomain = liveDomain.trim() ? liveDomain.trim() : window.location.origin;
      let formattedDomain = baseDomain;
      if (formattedDomain && !/^https?:\/\//i.test(formattedDomain)) {
        formattedDomain = "https://" + formattedDomain;
      }
      formattedDomain = formattedDomain.replace(/\/$/, "");

      const liveUrl = `${formattedDomain}/p/${result.id}`;
      setDbPublishLink(liveUrl);
    } catch (err) {
      console.error(err);
      setPublishError(err.message || "Failed to save portfolio to database. Ensure backend is running.");
    } finally {
      setPublishing(false);
    }
  };

  const isViewerMode = !!new URLSearchParams(window.location.search).get("data");
  const navigate = useNavigate();

  const getShareLink = () => {
    if (!portfolioData) return "";
    try {
      const jsonStr = JSON.stringify(portfolioData);
      // Generate URL-safe base64 string
      const encoded = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const baseDomain = liveDomain.trim() ? liveDomain.trim() : window.location.origin;
      let formattedDomain = baseDomain;
      if (formattedDomain && !/^https?:\/\//i.test(formattedDomain)) {
        formattedDomain = "https://" + formattedDomain;
      }
      formattedDomain = formattedDomain.replace(/\/$/, "");

      return `${formattedDomain}/preview?data=${encodeURIComponent(encoded)}&template=${activeTemplate}&type=${builderType}`;
    } catch (e) {
      console.error("Failed to generate share link", e);
      return "";
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  const handleUpdateData = (newData) => {
    if (typeof newData === "function") {
      setPortfolioData((prev) => {
        const updated = newData(prev);
        localStorage.setItem("portfolioData", JSON.stringify(updated));
        return updated;
      });
    } else {
      setPortfolioData(newData);
      localStorage.setItem("portfolioData", JSON.stringify(newData));
    }
  };

  useEffect(() => {
    if (isViewerMode) return;
    const savedData = localStorage.getItem("portfolioData");
    if (savedData) {
      try {
        setPortfolioData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse", savedData);
        navigate("/");
      }
    } else if (!id) {
      navigate("/");
    }
  }, [navigate, isViewerMode, id]);

  // Fetch initial portfolio configuration if id parameter is provided
  useEffect(() => {
    if (!id) return;

    const fetchPortfolio = async () => {
      setLoadingDb(true);
      try {
        const response = await fetch(`${API_BASE_URL}/p/${id}`);
        const result = await response.json();
        if (response.ok && result.data) {
          setPortfolioData(result.data.portfolioData);
          setActiveTemplate(result.data.templateId);

          // Pre-populate share link
          const baseDomain = liveDomain.trim() ? liveDomain.trim() : window.location.origin;
          let formattedDomain = baseDomain;
          if (formattedDomain && !/^https?:\/\//i.test(formattedDomain)) {
            formattedDomain = "https://" + formattedDomain;
          }
          formattedDomain = formattedDomain.replace(/\/$/, "");
          setDbPublishLink(`${formattedDomain}/p/${id}`);
        }
      } catch (err) {
        console.error("Error loading portfolio from MongoDB:", err);
      } finally {
        setLoadingDb(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  // Dynamic cloud save effect when data changes
  useEffect(() => {
    if (!id || isViewerMode || !portfolioData) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setSaveStatus("saving");
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/p/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            templateId: activeTemplate,
            portfolioData: portfolioData
          })
        });

        if (!response.ok) {
          throw new Error("Failed to save changes.");
        }
        setSaveStatus("synced");
      } catch (err) {
        console.error("Auto-save error:", err);
        setSaveStatus("error");
      }
    }, 1000); // 1-second debounce

    return () => clearTimeout(delayDebounceFn);
  }, [portfolioData, activeTemplate, id, isViewerMode]);

  if (loadingDb) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0d1117",
          color: "#fff"
        }}
      >
        <div className="loading-spinner" style={{ width: "40px", height: "40px", marginBottom: "16px" }}></div>
        <p style={{ color: "#8b949e", fontSize: "16px" }}>Loading Portfolio from Cloud...</p>
      </div>
    );
  }

  if (!portfolioData) return <div className="loading-spinner"></div>;

  const mockLiveLink = getShareLink();

  return (
    <div
      className="preview-root"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {!isViewerMode && (
        <>
          <nav
            className="no-print"
            style={{
              height: "64px",
              backgroundColor: "#010409",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
              zIndex: 100,
            }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <button
                className="btn-secondary"
                onClick={() => navigate("/")}
                style={{ padding: "8px", border: "none" }}
              >
                <ArrowLeft size={20} />
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontWeight: "600", color: "#fff", lineHeight: 1.2 }}>
                  {builderType === "resume" ? "Resume Preview" : "Portfolio Preview"}
                </span>
                {id && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                    {saveStatus === "synced" && (
                      <>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#2ea043" }}></span>
                        <span style={{ color: "#8b949e" }}>Cloud Synced</span>
                      </>
                    )}
                    {saveStatus === "saving" && (
                      <>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e3b341", animation: "pulse 1s infinite" }}></span>
                        <span style={{ color: "#8b949e" }}>Saving...</span>
                      </>
                    )}
                    {saveStatus === "error" && (
                      <>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f85149" }}></span>
                        <span style={{ color: "#f85149" }}>Sync Error</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                maxWidth: "50vw",
              }}
            >
              <button
                className="btn-secondary"
                onClick={scrollLeft}
                style={{
                  padding: "6px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <div
                ref={scrollContainerRef}
                style={{
                  display: "flex",
                  backgroundColor: "#0d1117",
                  borderRadius: "8px",
                  padding: "4px",
                  border: "1px solid var(--border-color)",
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  whiteSpace: "nowrap",
                }}
                className="custom-scrollbar"
              >
                {(builderType === "portfolio"
                  ? PORTFOLIO_TEMPLATES
                  : RESUME_TEMPLATES
                ).map((t) => {
                  const Icon = t.Icon;
                  const isActive = activeTemplate === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTemplate(t.id)}
                      style={{
                        backgroundColor: isActive
                          ? "var(--panel-bg)"
                          : "transparent",
                        color: isActive ? "#fff" : "#8b949e",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: "500",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} color={isActive ? t.color : "#8b949e"} />{" "}
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <button
                className="btn-secondary"
                onClick={scrollRight}
                style={{
                  padding: "6px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <style>{`.custom-scrollbar::-webkit-scrollbar { display: none; }`}</style>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                className="btn-secondary"
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: isEditing
                    ? "1px solid var(--primary-color)"
                    : "1px solid var(--border-color)",
                  color: isEditing ? "var(--primary-color)" : "#fff",
                }}
              >
                <Edit3 size={16} /> {isEditing ? "Close Editor" : "Edit LiveData"}
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowShareModal(true)}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Share2 size={16} /> Share Link
              </button>

              {builderType === "resume" ? (
                <button
                  className="btn-primary"
                  onClick={() => window.print()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    background: "#2ea043",
                  }}
                >
                  <Download size={16} /> Save as PDF
                </button>
              ) : (
                <button
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                  }}
                >
                  <Download size={16} /> Export Code
                </button>
              )}
            </div>
          </nav>

          {builderType === "portfolio" && (
            <div
              className="no-print"
              style={{
                padding: "8px",
                backgroundColor: "#161b22",
                borderBottom: "1px solid var(--border-color)",
                textAlign: "center",
                fontSize: "13px",
                color: "#8b949e",
                zIndex: 100,
              }}
            >
              <Monitor
                size={14}
                style={{
                  display: "inline",
                  marginRight: "6px",
                  verticalAlign: "middle",
                }}
              />
              Your site is live at:{" "}
              <a
                href={getShareLink()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--primary-color)", textDecoration: "underline" }}
              >
                Click here to open your live link
              </a>
            </div>
          )}
        </>
      )}

      <div
        className="preview-content-wrapper"
        style={{ display: "flex", flex: 1, overflow: "hidden" }}
      >
        {isEditing && (
          <div
            className="no-print"
            style={{
              width: "350px",
              borderRight: "1px solid var(--border-color)",
              backgroundColor: "#010409",
              flexShrink: 0,
            }}
          >
            <DataEditorSidebar
              data={portfolioData}
              setData={handleUpdateData}
              builderType={builderType}
            />
          </div>
        )}

        <div
          className="preview-content"
          style={{ flex: 1, overflowY: "auto", position: "relative" }}
        >
          {activeTemplate === "resume_classic" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <ClassicResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_modern" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <ModernResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_tech" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <TechResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_minimalist" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <MinimalistResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_creative" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <CreativeResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_executive" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <ExecutiveResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_startup" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <StartupResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_academic" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <AcademicResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_infographic" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <InfographicResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_elegant" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <ElegantResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_designer" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <DesignerResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_corporate" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <CorporateResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_trendy" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <TrendyResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_clean" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <CleanResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_bold" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <BoldResume data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_twocolumn_minimal" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <TwoColumnMinimal data={portfolioData} />
            </div>
          )}
          {activeTemplate === "resume_chronological" && (
            <div
              className="resume-wrapper"
              style={{ padding: "40px 0", backgroundColor: "#525659" }}
            >
              <ChronologicalPro data={portfolioData} />
            </div>
          )}

          {activeTemplate === "creative3d" && (
            <Creative3DTemplate data={portfolioData} />
          )}
          {activeTemplate === "developer" && (
            <DeveloperTemplate data={portfolioData} />
          )}
          {activeTemplate === "minimalist" && (
            <MinimalistTemplate data={portfolioData} />
          )}
          {activeTemplate === "corporate" && (
            <CorporateTemplate data={portfolioData} />
          )}

          {activeTemplate === "synthwave" && (
            <SynthwaveTemplate data={portfolioData} />
          )}
          {activeTemplate === "galaxy" && (
            <GalaxyTemplate data={portfolioData} />
          )}
          {activeTemplate === "waves" && <WavesTemplate data={portfolioData} />}
          {activeTemplate === "holographic" && (
            <HolographicTemplate data={portfolioData} />
          )}
          {activeTemplate === "zen" && <ZenTemplate data={portfolioData} />}
          {activeTemplate === "brutalist" && (
            <BrutalistTemplate data={portfolioData} />
          )}
          {activeTemplate === "glass" && <GlassTemplate data={portfolioData} />}
          {activeTemplate === "datastream" && (
            <DataStreamTemplate data={portfolioData} />
          )}
          {activeTemplate === "neon" && <NeonTemplate data={portfolioData} />}
          {activeTemplate === "islands" && (
            <IslandsTemplate data={portfolioData} />
          )}
          {activeTemplate === "particles" && (
            <ParticlesTemplate data={portfolioData} />
          )}
          {activeTemplate === "orbs" && <OrbsTemplate data={portfolioData} />}
          {activeTemplate === "tunnel" && (
            <TunnelTemplate data={portfolioData} />
          )}
          {activeTemplate === "vortex" && (
            <VortexTemplate data={portfolioData} />
          )}
          {activeTemplate === "cubegrid" && (
            <CubeGridTemplate data={portfolioData} />
          )}
          {activeTemplate === "lowpoly" && (
            <LowPolyTemplate data={portfolioData} />
          )}
        </div>
      </div>

      {/* Floating Viewer Badges */}
      {isViewerMode && builderType === "portfolio" && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 99999,
          }}
        >
        </div>
      )}

      {isViewerMode && builderType === "resume" && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99999,
            display: "flex",
            gap: "12px",
            background: "rgba(22, 27, 34, 0.9)",
            backdropFilter: "blur(12px)",
            padding: "10px 20px",
            borderRadius: "50px",
            border: "1px solid var(--border-color)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => window.print()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#2ea043",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "13px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.backgroundColor = "#3fb950";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = "#2ea043";
            }}
          >
            <Download size={14} /> Save as PDF
          </button>

          <div style={{ width: "1px", height: "20px", backgroundColor: "var(--border-color)" }}></div>

          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "13px",
              textDecoration: "none",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.color = "var(--primary-color)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.color = "#fff";
            }}
          >
            <Sparkles size={14} color="var(--primary-color)" /> Build Yours
          </a>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(8, 10, 14, 0.8)",
            backdropFilter: "blur(12px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setShowShareModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "linear-gradient(135deg, rgba(22, 27, 34, 0.95) 0%, rgba(13, 17, 23, 0.98) 100%)",
              border: "1px solid rgba(88, 166, 255, 0.2)",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
              animation: "modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes modalSlideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px) scale(0.98);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              @keyframes pulseGlow {
                0% {
                  box-shadow: 0 0 0 0 rgba(88, 166, 255, 0.4);
                }
                70% {
                  box-shadow: 0 0 0 10px rgba(88, 166, 255, 0);
                }
                100% {
                  box-shadow: 0 0 0 0 rgba(88, 166, 255, 0);
                }
              }
              @keyframes floatIcon {
                0% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-6px) rotate(2deg); }
                100% { transform: translateY(0px) rotate(0deg); }
              }
              .pulse-button {
                animation: pulseGlow 2s infinite;
              }
              .float-container {
                animation: floatIcon 4s ease-in-out infinite;
              }
            `}</style>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff", display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
                <Share2 size={24} style={{ color: "var(--primary-color)" }} /> Publish & Share
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#8b949e",
                  cursor: "pointer",
                  fontSize: "20px",
                  lineHeight: "1",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &times;
              </button>
            </div>

            {/* 1. Permanent Database Link Section */}
            {!dbPublishLink ? (
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  className="float-container"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(88, 166, 255, 0.15) 0%, rgba(138, 43, 226, 0.15) 100%)",
                    border: "1px solid rgba(88, 166, 255, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  <Globe size={40} style={{ color: "var(--primary-color)" }} />
                </div>

                <h4 style={{ fontSize: "16px", color: "#fff", fontWeight: "600", marginBottom: "8px" }}>
                  Create a Shareable Web Link
                </h4>
                <p style={{ color: "#8b949e", fontSize: "13.5px", marginBottom: "24px", lineHeight: "1.6", maxWidth: "380px" }}>
                  Publish your portfolio to our cloud database. You will get a unique, clean link that anyone can visit to see your site.
                </p>

                {publishError && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(255, 123, 114, 0.1)",
                    border: "1px solid rgba(255, 123, 114, 0.2)",
                    borderRadius: "8px",
                    padding: "12px",
                    width: "100%",
                    marginBottom: "16px",
                    color: "#ff7b72",
                    fontSize: "13px",
                    textAlign: "left"
                  }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{publishError}</span>
                  </div>
                )}

                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="btn-primary pulse-button"
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "15px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 8px 24px rgba(88, 166, 255, 0.25)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseOver={(e) => {
                    if (!publishing) {
                      e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                      e.currentTarget.style.boxShadow = "0 12px 28px rgba(88, 166, 255, 0.35)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!publishing) {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(88, 166, 255, 0.25)";
                    }
                  }}
                >
                  {publishing ? (
                    <>
                      <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                      Publishing to MongoDB...
                    </>
                  ) : (
                    <>
                      🚀 Get Shareable Link
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "8px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(46, 160, 67, 0.15)",
                      border: "1px solid rgba(46, 160, 67, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <Check size={32} style={{ color: "#3fb950" }} />
                  </div>
                  <h4 style={{ fontSize: "16px", color: "#fff", fontWeight: "600", marginBottom: "4px" }}>
                    Successfully Published!
                  </h4>
                  <p style={{ color: "#8b949e", fontSize: "13px" }}>
                    Your site is live. Share this unique URL with anyone:
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    padding: "8px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    alignItems: "center"
                  }}
                >
                  <input
                    type="text"
                    readOnly
                    value={dbPublishLink}
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#c9d1d9",
                      padding: "8px 10px",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(dbPublishLink);
                        setDbCopied(true);
                        setTimeout(() => setDbCopied(false), 2000);
                      } catch (err) {
                        console.error("Clipboard copy failed", err);
                      }
                    }}
                    className="btn-primary"
                    style={{
                      padding: "10px 16px",
                      fontSize: "13px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      flexShrink: 0,
                      background: dbCopied ? "#2ea043" : "linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)",
                      boxShadow: "none",
                    }}
                  >
                    {dbCopied ? (
                      <>
                        <Check size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy
                      </>
                    )}
                  </button>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <a
                    href={dbPublishLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      flex: 1,
                      padding: "12px",
                      fontSize: "14px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    Open Live Site <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={() => setDbPublishLink("")}
                    className="btn-secondary"
                    style={{
                      padding: "12px",
                      fontSize: "14px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    Update / Re-publish
                  </button>
                </div>
              </div>
            )}

            <div style={{ margin: "24px 0 16px 0", height: "1px", background: "rgba(255,255,255,0.06)" }}></div>

            {/* Advanced Section */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#8b949e",
                  fontSize: "12.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  padding: "6px 0",
                  width: "fit-content",
                  fontWeight: "500",
                  outline: "none",
                  alignSelf: "center",
                }}
              >
                <span>Advanced Options (Client-only URL)</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: showAdvanced ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease-in-out"
                  }}
                />
              </button>

              {showAdvanced && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "16px",
                    backgroundColor: "rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    animation: "modalSlideUp 0.2s ease-out"
                  }}
                >
                  <p style={{ color: "#8b949e", fontSize: "11.5px", marginBottom: "12px", lineHeight: "1.5" }}>
                    This client-side link encodes all resume data inside the URL parameter itself. No database entry is created.
                  </p>

                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", color: "#8b949e", fontSize: "10.5px", fontWeight: "600", marginBottom: "4px", textAlign: "left" }}>
                      Live Domain Override (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. your-project.vercel.app"
                      value={liveDomain}
                      onChange={(e) => {
                        setLiveDomain(e.target.value);
                        localStorage.setItem("vercelDomain", e.target.value);
                      }}
                      style={{
                        width: "100%",
                        backgroundColor: "#0d1117",
                        border: "1px solid var(--border-color)",
                        color: "#c9d1d9",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--primary-color)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
                    />
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      readOnly
                      value={getShareLink()}
                      style={{
                        flex: 1,
                        backgroundColor: "#0d1117",
                        border: "1px solid var(--border-color)",
                        color: "#c9d1d9",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        outline: "none",
                      }}
                      onClick={(e) => e.target.select()}
                    />
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(getShareLink());
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        } catch (err) {
                          console.error("Clipboard copy failed", err);
                        }
                      }}
                      className="btn-primary"
                      style={{
                        padding: "8px 12px",
                        fontSize: "12px",
                        borderRadius: "8px",
                        flexShrink: 0,
                        background: copied ? "#2ea043" : "linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)",
                        boxShadow: "none",
                      }}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <button
                className="btn-secondary"
                onClick={() => setShowShareModal(false)}
                style={{ padding: "8px 16px", fontSize: "14px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
