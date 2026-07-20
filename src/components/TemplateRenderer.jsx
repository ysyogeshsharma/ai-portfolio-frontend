import React from "react";
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

const templateMap = {
  // Resumes
  resume_classic: ClassicResume,
  resume_modern: ModernResume,
  resume_tech: TechResume,
  resume_minimalist: MinimalistResume,
  resume_creative: CreativeResume,
  resume_executive: ExecutiveResume,
  resume_startup: StartupResume,
  resume_academic: AcademicResume,
  resume_infographic: InfographicResume,
  resume_elegant: ElegantResume,
  resume_designer: DesignerResume,
  resume_corporate: CorporateResume,
  resume_trendy: TrendyResume,
  resume_clean: CleanResume,
  resume_bold: BoldResume,
  resume_twocolumn_minimal: TwoColumnMinimal,
  resume_chronological: ChronologicalPro,

  // Portfolios
  creative3d: Creative3DTemplate,
  developer: DeveloperTemplate,
  minimalist: MinimalistTemplate,
  corporate: CorporateTemplate,
  synthwave: SynthwaveTemplate,
  galaxy: GalaxyTemplate,
  waves: WavesTemplate,
  holographic: HolographicTemplate,
  zen: ZenTemplate,
  brutalist: BrutalistTemplate,
  glass: GlassTemplate,
  datastream: DataStreamTemplate,
  neon: NeonTemplate,
  islands: IslandsTemplate,
  particles: ParticlesTemplate,
  orbs: OrbsTemplate,
  tunnel: TunnelTemplate,
  vortex: VortexTemplate,
  cubegrid: CubeGridTemplate,
  lowpoly: LowPolyTemplate,
};

export default function TemplateRenderer({ templateId, data }) {
  const TemplateComponent = templateMap[templateId];

  if (!TemplateComponent) {
    return (
      <div style={{ color: "#ff7b72", padding: "40px", textAlign: "center", background: "#0d1117", minHeight: "100vh" }}>
        <h3>Error: Template "{templateId}" not found</h3>
      </div>
    );
  }

  // Resume templates need a wrapper and gray background
  const isResume = templateId.startsWith("resume_");

  if (isResume) {
    return (
      <div className="resume-wrapper print-exact" style={{ padding: "40px 0", backgroundColor: "#525659", minHeight: "100vh" }}>
        <TemplateComponent data={data} />
      </div>
    );
  }

  return <TemplateComponent data={data} />;
}
