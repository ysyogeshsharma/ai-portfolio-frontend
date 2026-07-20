import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TemplateRenderer from "../components/TemplateRenderer";
import { Sparkles, ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "../config";


export default function SharedPortfolio() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE_URL}/p/${id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to retrieve portfolio.");
        }

        setPortfolio(result.data);
        
        // Update document title metadata for SEO
        if (result.data?.portfolioData?.name) {
          document.title = `${result.data.portfolioData.name} - Portfolio`;
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong fetching the portfolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
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
        <p style={{ color: "#8b949e", fontSize: "16px" }}>Loading Shared Site...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={{ 
          height: "100vh", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          backgroundColor: "#0d1117", 
          color: "#c9d1d9",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <h2 style={{ color: "#ff7b72", marginBottom: "12px", fontSize: "24px" }}>Failed to Load</h2>
        <p style={{ color: "#8b949e", maxWidth: "450px", marginBottom: "24px", lineHeight: "1.6" }}>{error}</p>
        <Link to="/" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <ArrowLeft size={16} /> Back to Studio
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Dynamic Template rendering */}
      <TemplateRenderer templateId={portfolio.templateId} data={portfolio.portfolioData} />

      {/* Floating builder redirect badge */}
      <div
        className="no-print"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 99999,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "50px",
            fontWeight: "600",
            boxShadow: "0 8px 32px rgba(88, 166, 255, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontSize: "14px",
            textDecoration: "none",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(88, 166, 255, 0.6)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(88, 166, 255, 0.4)";
          }}
        >
          <Sparkles size={16} /> Create Your AI Portfolio
        </Link>
      </div>
    </div>
  );
}
