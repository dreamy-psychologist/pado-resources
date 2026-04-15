import { useState, useRef, useEffect } from "react";

const EMOTIONS = [
  {
    id: "anger",
    name: "Anger",
    color: "#C17058",
    colorLight: "#F5E8E4",
    zone: "hyper",
    zoneLabel: "Hyperarousal 🔥",
    subEmotions: ["Irritation", "Rage", "Resentment", "Frustration"],
    bodyParts: [
      { area: "head", label: "Head feels hot" },
      { area: "jaw", label: "Jaw clenches" },
      { area: "chest", label: "Chest expands" },
      { area: "hands", label: "Fists clench" },
    ],
    icon: "🔥",
  },
  {
    id: "fear",
    name: "Fear",
    color: "#C49A6C",
    colorLight: "#F7F0E8",
    zone: "hyper",
    zoneLabel: "Hyperarousal 🔥",
    subEmotions: ["Anxiety", "Terror", "Tension", "Worry"],
    bodyParts: [
      { area: "chest", label: "Heart races" },
      { area: "stomach", label: "Stomach tightens" },
      { area: "throat", label: "Throat closes" },
      { area: "hands", label: "Hands tremble" },
    ],
    icon: "⚡",
  },
  {
    id: "joy",
    name: "Joy",
    color: "#8A9A7A",
    colorLight: "#EEF2EB",
    zone: "window",
    zoneLabel: "Window of Tolerance ✨",
    subEmotions: ["Happiness", "Gratitude", "Excitement", "Contentment"],
    bodyParts: [
      { area: "chest", label: "Chest feels warm" },
      { area: "face", label: "Face relaxes" },
      { area: "whole", label: "Body feels light" },
      { area: "hands", label: "Hands open" },
    ],
    icon: "🌿",
  },
  {
    id: "calm",
    name: "Calm",
    color: "#7A9A9A",
    colorLight: "#EBF1F1",
    zone: "window",
    zoneLabel: "Window of Tolerance ✨",
    subEmotions: ["Stability", "Peace", "Ease", "Relaxation"],
    bodyParts: [
      { area: "whole", label: "Body relaxes" },
      { area: "chest", label: "Breath deepens" },
      { area: "shoulders", label: "Shoulders drop" },
      { area: "face", label: "Expression softens" },
    ],
    icon: "✨",
  },
  {
    id: "sadness",
    name: "Sadness",
    color: "#8A8AAA",
    colorLight: "#EDEDF3",
    zone: "mixed",
    zoneLabel: "Mixed Zone",
    subEmotions: ["Disappointment", "Longing", "Grief", "Loneliness"],
    bodyParts: [
      { area: "chest", label: "Chest feels heavy" },
      { area: "throat", label: "Throat tightens" },
      { area: "eyes", label: "Eyes sting" },
      { area: "whole", label: "Body droops" },
    ],
    icon: "💧",
  },
  {
    id: "shame",
    name: "Shame",
    color: "#A68A9A",
    colorLight: "#F2ECEF",
    zone: "mixed",
    zoneLabel: "Mixed Zone",
    subEmotions: ["Embarrassment", "Self-criticism", "Worthlessness", "Humiliation"],
    bodyParts: [
      { area: "face", label: "Face flushes" },
      { area: "chest", label: "Chest shrinks" },
      { area: "stomach", label: "Stomach sinks" },
      { area: "whole", label: "Want to hide" },
    ],
    icon: "🌑",
  },
  {
    id: "numbness",
    name: "Numbness",
    color: "#9A9A9A",
    colorLight: "#F0F0F0",
    zone: "hypo",
    zoneLabel: "Hypoarousal ❄️",
    subEmotions: ["Emptiness", "Disconnection", "Apathy", "Blankness"],
    bodyParts: [
      { area: "whole", label: "Body feels heavy" },
      { area: "face", label: "Expression flat" },
      { area: "chest", label: "Hard to breathe" },
      { area: "hands", label: "Hands cold" },
    ],
    icon: "🌫️",
  },
  {
    id: "disgust",
    name: "Disgust",
    color: "#7A8A6A",
    colorLight: "#EDF0EA",
    zone: "mixed",
    zoneLabel: "Mixed Zone",
    subEmotions: ["Revulsion", "Distaste", "Aversion", "Contempt"],
    bodyParts: [
      { area: "stomach", label: "Stomach turns" },
      { area: "throat", label: "Gag reflex" },
      { area: "face", label: "Nose wrinkles" },
      { area: "whole", label: "Pull away" },
    ],
    icon: "🍃",
  },
];

const BODY_AREAS = [
  { id: "head", label: "Head", cx: 100, cy: 35, rx: 30, ry: 32 },
  { id: "face", label: "Face", cx: 100, cy: 45, rx: 22, ry: 20 },
  { id: "eyes", label: "Eyes", cx: 100, cy: 38, rx: 28, ry: 8 },
  { id: "jaw", label: "Jaw", cx: 100, cy: 60, rx: 20, ry: 12 },
  { id: "throat", label: "Throat", cx: 100, cy: 80, rx: 14, ry: 14 },
  { id: "shoulders", label: "Shoulders", cx: 100, cy: 100, rx: 55, ry: 16 },
  { id: "chest", label: "Chest", cx: 100, cy: 135, rx: 42, ry: 35 },
  { id: "stomach", label: "Stomach", cx: 100, cy: 190, rx: 35, ry: 30 },
  { id: "hands", label: "Hands", cx: 100, cy: 260, rx: 55, ry: 25 },
  { id: "whole", label: "Whole body", cx: 100, cy: 180, rx: 55, ry: 130 },
];

function BodySilhouette({ highlights = [], onAreaClick, interactive = false }) {
  return (
    <svg viewBox="0 0 200 350" style={{ width: "100%", maxWidth: 180, height: "auto" }}>
      {/* Body outline */}
      <ellipse cx="100" cy="40" rx="28" ry="32" fill="#E8DFD4" stroke="#C49A6C" strokeWidth="1.5" />
      <path
        d="M72 72 Q60 85 45 130 Q35 160 40 200 L50 200 Q52 170 55 145 L65 180 Q68 220 60 280 L75 280 Q78 240 80 200 L85 250 L90 300 L110 300 L115 250 L120 200 Q122 240 125 280 L140 280 Q132 220 135 180 L145 145 Q148 170 150 200 L160 200 Q165 160 155 130 Q140 85 128 72 Z"
        fill="#E8DFD4"
        stroke="#C49A6C"
        strokeWidth="1.5"
      />

      {/* Highlight areas */}
      {highlights.map((area, i) => {
        const pos = BODY_AREAS.find((b) => b.id === area);
        if (!pos) return null;
        const color = "#C49A6C";
        return (
          <g key={area}>
            <ellipse
              cx={pos.cx} cy={pos.cy} rx={pos.rx} ry={pos.ry}
              fill={color} opacity={0.35}
              style={{ animation: `pulse ${1.5 + i * 0.3}s ease-in-out infinite` }}
            />
          </g>
        );
      })}

      {/* Interactive buttons */}
      {interactive && BODY_AREAS.filter((a) => a.id !== "whole").map((area) => (
        <g key={area.id} onClick={() => onAreaClick && onAreaClick(area.id)} style={{ cursor: "pointer" }}>
          <ellipse
            cx={area.cx} cy={area.cy} rx={area.rx * 0.7} ry={area.ry * 0.7}
            fill={highlights.includes(area.id) ? "#C49A6C" : "transparent"}
            opacity={highlights.includes(area.id) ? 0.4 : 0}
          />
          <ellipse
            cx={area.cx} cy={area.cy} rx={area.rx * 0.7} ry={area.ry * 0.7}
            fill="transparent"
            stroke="transparent"
          />
        </g>
      ))}
    </svg>
  );
}

function BodySilhouetteWithPulse({ areas, color }) {
  return (
    <svg viewBox="0 0 200 350" style={{ width: "100%", maxWidth: 120, height: "auto" }}>
      <ellipse cx="100" cy="40" rx="28" ry="32" fill="#E8DFD4" stroke="#D4C8BC" strokeWidth="1" />
      <path
        d="M72 72 Q60 85 45 130 Q35 160 40 200 L50 200 Q52 170 55 145 L65 180 Q68 220 60 280 L75 280 Q78 240 80 200 L85 250 L90 300 L110 300 L115 250 L120 200 Q122 240 125 280 L140 280 Q132 220 135 180 L145 145 Q148 170 150 200 L160 200 Q165 160 155 130 Q140 85 128 72 Z"
        fill="#E8DFD4"
        stroke="#D4C8BC"
        strokeWidth="1"
      />
      {areas.map((areaId, i) => {
        const pos = BODY_AREAS.find((b) => b.id === areaId);
        if (!pos) return null;
        return (
          <g key={areaId}>
            <ellipse
              cx={pos.cx} cy={pos.cy} rx={pos.rx} ry={pos.ry}
              fill={color} opacity={0.35}
              style={{ animation: `pulse ${1.5 + i * 0.3}s ease-in-out infinite` }}
            />
          </g>
        );
      })}
    </svg>
  );
}

const MODE_BODY = "body";
const MODE_EMOTION = "emotion";

export default function EmotionMap() {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState(MODE_EMOTION);
  const [bodyQuery, setBodyQuery] = useState(null);
  const detailRef = useRef(null);

  const matchedEmotions = bodyQuery
    ? EMOTIONS.filter((e) => e.bodyParts.some((bp) => bp.area === bodyQuery))
    : [];

  useEffect(() => {
    if (selected && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selected]);

  const emotion = selected ? EMOTIONS.find((e) => e.id === selected) : null;

  const zoneColor = (zone) => {
    if (zone === "hyper") return "#C17058";
    if (zone === "window") return "#8A9A7A";
    if (zone === "hypo") return "#7A9A9A";
    return "#A68A9A";
  };

  const zoneGradient = (zone) => {
    if (zone === "hyper") return "linear-gradient(135deg, #F5E8E4 0%, #F7F0E8 100%)";
    if (zone === "window") return "linear-gradient(135deg, #EEF2EB 0%, #EBF1F1 100%)";
    if (zone === "hypo") return "linear-gradient(135deg, #EBF1F1 0%, #EDEDF3 100%)";
    return "linear-gradient(135deg, #EDEDF3 0%, #F2ECEF 100%)";
  };

  return (
    <div style={{
      fontFamily: "'Source Sans Pro', -apple-system, sans-serif",
      background: "linear-gradient(180deg, #FAF6F1 0%, #F2EBE3 100%)",
      minHeight: "100vh",
      padding: "40px 24px 60px",
      color: "#4A4540",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+Pro:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.08); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentleSwing {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
      `}</style>

      {/* Header */}
      <header style={{
        textAlign: "center",
        marginBottom: 40,
        padding: "50px 30px",
        background: "linear-gradient(180deg, rgba(196, 154, 108, 0.15) 0%, transparent 100%)",
        borderRadius: 30,
      }}>
        <div style={{ fontSize: 48, marginBottom: 20, animation: "gentleSwing 3s ease-in-out infinite" }}>🧭</div>
        <h1 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "2.4rem",
          fontWeight: 700,
          color: "#5C524A",
          marginBottom: 16,
          letterSpacing: -1,
        }}>
          Emotion Map
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#8B7D70", fontWeight: 300 }}>
          Naming your emotions, feeling them in your body
        </p>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-block",
            background: "#E8DFD4",
            padding: "6px 16px",
            borderRadius: 20,
            fontSize: "0.85rem",
            color: "#7A6E62",
          }}>
            Neuro-affirming
          </span>
          <span style={{
            fontSize: "0.8rem",
            color: "#A09080",
            fontStyle: "italic",
          }}>
            There are many ways to recognize emotions
          </span>
        </div>
      </header>

      {/* Key Insight */}
      <section style={{
        background: "linear-gradient(135deg, #fff 0%, #F7F0E8 100%)",
        borderRadius: 24,
        padding: 32,
        marginBottom: 40,
        borderLeft: "5px solid #C49A6C",
        boxShadow: "0 4px 30px rgba(139, 115, 85, 0.08)",
        maxWidth: 600,
        margin: "0 auto 40px",
      }}>
        <h2 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "1.4rem",
          color: "#8B7D70",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          💡 Key Insight
        </h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.9 }}>
          It's common to have trouble identifying emotions right away. <span style={{
            background: "linear-gradient(180deg, transparent 60%, #E8DFD4 60%)",
            padding: "0 4px",
            fontWeight: 500,
          }}>Whether you start from the emotion or from your body, either path is valid.</span><br /><br />
          When we name our emotions, amygdala activity decreases. This is called <strong>'Affect Labeling'</strong>.<br /><br />
          Naming what you feel is <span style={{
            background: "linear-gradient(180deg, transparent 60%, #E8DFD4 60%)",
            padding: "0 4px",
            fontWeight: 500,
          }}>the beginning of regulation</span>.
        </p>
      </section>

      {/* Mode toggle */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 0,
        marginBottom: 32,
        background: "#E8DFD4",
        borderRadius: 28,
        padding: 4,
        maxWidth: 400,
        margin: "0 auto 32px",
      }}>
        <button
          onClick={() => { setMode(MODE_EMOTION); setBodyQuery(null); setSelected(null); }}
          style={{
            flex: 1,
            padding: "12px 0",
            borderRadius: 24,
            border: "none",
            fontSize: 15,
            fontWeight: 600,
            background: mode === MODE_EMOTION ? "#fff" : "transparent",
            color: mode === MODE_EMOTION ? "#5C524A" : "#8B7D70",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: mode === MODE_EMOTION ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
          }}
        >
          🎯 Start from emotion
        </button>
        <button
          onClick={() => { setMode(MODE_BODY); setSelected(null); setBodyQuery(null); }}
          style={{
            flex: 1,
            padding: "12px 0",
            borderRadius: 24,
            border: "none",
            fontSize: 15,
            fontWeight: 600,
            background: mode === MODE_BODY ? "#fff" : "transparent",
            color: mode === MODE_BODY ? "#5C524A" : "#8B7D70",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: mode === MODE_BODY ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
          }}
        >
          🧍 Start from body
        </button>
      </div>

      {/* ===== EMOTION MODE ===== */}
      {mode === MODE_EMOTION && (
        <div style={{ animation: "fadeIn 0.4s ease", maxWidth: 600, margin: "0 auto" }}>
          <p style={{
            textAlign: "center",
            fontSize: 15,
            color: "#8B7D70",
            marginBottom: 24,
            fontWeight: 300,
          }}>
            Select what you're feeling right now
          </p>

          {/* Emotion grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}>
            {EMOTIONS.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(selected === e.id ? null : e.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 18px",
                  borderRadius: 20,
                  border: "2px solid",
                  borderColor: selected === e.id ? e.color : "rgba(139, 115, 85, 0.15)",
                  background: selected === e.id ? e.colorLight : "#fff",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  boxShadow: selected === e.id
                    ? `0 4px 20px ${e.color}25`
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  transform: selected === e.id ? "scale(1.02)" : "scale(1)",
                }}
              >
                <span style={{ fontSize: 26 }}>{e.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: selected === e.id ? e.color : "#4A4540",
                  }}>
                    {e.name}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {emotion && (
            <div
              ref={detailRef}
              style={{
                marginTop: 28,
                animation: "slideUp 0.4s ease",
                background: "#fff",
                borderRadius: 24,
                padding: "28px 24px",
                boxShadow: "0 4px 30px rgba(139, 115, 85, 0.08)",
                border: `1px solid rgba(139, 115, 85, 0.1)`,
                borderLeft: `4px solid ${emotion.color}`,
              }}
            >
              {/* Zone badge */}
              <div style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 20,
                background: zoneGradient(emotion.zone),
                border: `1px solid ${zoneColor(emotion.zone)}44`,
                fontSize: 13,
                fontWeight: 600,
                color: zoneColor(emotion.zone),
                marginBottom: 20,
              }}>
                🌡️ {emotion.zoneLabel}
              </div>

              <h3 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: 22,
                fontWeight: 700,
                color: emotion.color,
                margin: "0 0 20px",
              }}>
                {emotion.icon} {emotion.name}
              </h3>

              {/* Sub-emotions */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  fontSize: 13,
                  color: "#8B7D70",
                  marginBottom: 10,
                  fontWeight: 600,
                }}>
                  Related feelings
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {emotion.subEmotions.map((sub, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 30,
                        fontSize: 14,
                        background: emotion.colorLight,
                        color: emotion.color,
                        fontWeight: 500,
                      }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body map */}
              <div>
                <div style={{
                  fontSize: 13,
                  color: "#8B7D70",
                  marginBottom: 12,
                  fontWeight: 600,
                }}>
                  Where do you feel it in your body?
                </div>
                <div style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  background: "#FAF6F1",
                  borderRadius: 20,
                  padding: "20px 16px",
                }}>
                  <BodySilhouetteWithPulse
                    areas={emotion.bodyParts.map((bp) => bp.area)}
                    color={emotion.color}
                  />
                  <div style={{ flex: 1, display: "grid", gap: 8, paddingTop: 8 }}>
                    {emotion.bodyParts.map((bp, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 14px",
                          background: "#fff",
                          borderRadius: 14,
                          fontSize: 14,
                          color: "#4A4540",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                        }}
                      >
                        <span style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: emotion.color,
                          opacity: 0.7,
                        }} />
                        {bp.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== BODY MODE ===== */}
      {mode === MODE_BODY && (
        <div style={{ animation: "fadeIn 0.4s ease", maxWidth: 600, margin: "0 auto" }}>
          <p style={{
            textAlign: "center",
            fontSize: 15,
            color: "#8B7D70",
            marginBottom: 24,
            fontWeight: 300,
          }}>
            Where do you feel something in your body?
          </p>

          {/* Body area buttons */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            marginBottom: 32,
          }}>
            {BODY_AREAS.filter((a) => a.id !== "whole").map((area) => (
              <button
                key={area.id}
                onClick={() => {
                  setBodyQuery(bodyQuery === area.id ? null : area.id);
                  setSelected(null);
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: 25,
                  border: "2px solid",
                  borderColor: bodyQuery === area.id ? "#C49A6C" : "rgba(139, 115, 85, 0.2)",
                  background: bodyQuery === area.id ? "#C49A6C" : "#fff",
                  color: bodyQuery === area.id ? "#fff" : "#5C524A",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: bodyQuery === area.id
                    ? "0 4px 15px rgba(196, 154, 108, 0.3)"
                    : "0 2px 6px rgba(0,0,0,0.04)",
                }}
              >
                {area.label}
              </button>
            ))}
          </div>

          {/* Body visualization */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 32,
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 20px rgba(139, 115, 85, 0.06)",
          }}>
            <BodySilhouette
              highlights={bodyQuery ? [bodyQuery] : []}
              interactive={false}
            />
          </div>

          {/* Matched emotions */}
          {bodyQuery && (
            <div style={{ animation: "slideUp 0.4s ease" }}>
              <p style={{
                textAlign: "center",
                fontSize: 14,
                color: "#8B7D70",
                marginBottom: 16,
              }}>
                Emotions that may be connected to <strong style={{ color: "#C49A6C" }}>{BODY_AREAS.find((a) => a.id === bodyQuery)?.label}</strong>:
              </p>
              <div style={{ display: "grid", gap: 12 }}>
                {matchedEmotions.map((e) => {
                  const bodyPart = e.bodyParts.find((bp) => bp.area === bodyQuery);
                  return (
                    <button
                      key={e.id}
                      onClick={() => setSelected(selected === e.id ? null : e.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "18px 20px",
                        borderRadius: 20,
                        border: "2px solid",
                        borderColor: selected === e.id ? e.color : "rgba(139, 115, 85, 0.15)",
                        background: selected === e.id ? e.colorLight : "#fff",
                        cursor: "pointer",
                        transition: "all 0.25s",
                        textAlign: "left",
                        boxShadow: selected === e.id
                          ? `0 4px 20px ${e.color}25`
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <span style={{ fontSize: 30 }}>{e.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: selected === e.id ? e.color : "#4A4540",
                          marginBottom: 4,
                        }}>
                          {e.name}
                        </div>
                        <div style={{
                          fontSize: 13,
                          color: "#8B7D70",
                        }}>
                          {bodyPart?.label}
                        </div>
                      </div>
                      <div style={{
                        padding: "4px 12px",
                        borderRadius: 15,
                        background: zoneGradient(e.zone),
                        fontSize: 12,
                        color: zoneColor(e.zone),
                        fontWeight: 500,
                      }}>
                        {e.zone === "hyper" ? "🔥" : e.zone === "window" ? "✨" : e.zone === "hypo" ? "❄️" : "◐"}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail panel for body mode */}
              {selected && emotion && (
                <div
                  ref={detailRef}
                  style={{
                    marginTop: 24,
                    animation: "slideUp 0.4s ease",
                    background: "#fff",
                    borderRadius: 24,
                    padding: "28px 24px",
                    boxShadow: "0 4px 30px rgba(139, 115, 85, 0.08)",
                    border: `1px solid rgba(139, 115, 85, 0.1)`,
                    borderLeft: `4px solid ${emotion.color}`,
                  }}
                >
                  <div style={{
                    display: "inline-block",
                    padding: "6px 16px",
                    borderRadius: 20,
                    background: zoneGradient(emotion.zone),
                    border: `1px solid ${zoneColor(emotion.zone)}44`,
                    fontSize: 13,
                    fontWeight: 600,
                    color: zoneColor(emotion.zone),
                    marginBottom: 20,
                  }}>
                    🌡️ {emotion.zoneLabel}
                  </div>

                  <h3 style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: emotion.color,
                    margin: "0 0 20px",
                  }}>
                    {emotion.icon} {emotion.name}
                  </h3>

                  <div style={{ marginBottom: 24 }}>
                    <div style={{
                      fontSize: 13,
                      color: "#8B7D70",
                      marginBottom: 10,
                      fontWeight: 600,
                    }}>
                      Related feelings
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {emotion.subEmotions.map((sub, i) => (
                        <span
                          key={i}
                          style={{
                            padding: "6px 14px",
                            borderRadius: 30,
                            fontSize: 14,
                            background: emotion.colorLight,
                            color: emotion.color,
                            fontWeight: 500,
                          }}
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: 13,
                      color: "#8B7D70",
                      marginBottom: 12,
                      fontWeight: 600,
                    }}>
                      Other body sensations for this emotion
                    </div>
                    <div style={{
                      display: "grid",
                      gap: 8,
                    }}>
                      {emotion.bodyParts.map((bp, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            background: bp.area === bodyQuery ? emotion.colorLight : "#FAF6F1",
                            borderRadius: 14,
                            fontSize: 14,
                            color: "#4A4540",
                            border: bp.area === bodyQuery ? `1px solid ${emotion.color}44` : "1px solid transparent",
                          }}
                        >
                          <span style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: emotion.color,
                            opacity: bp.area === bodyQuery ? 1 : 0.5,
                          }} />
                          {bp.label}
                          {bp.area === bodyQuery && (
                            <span style={{ marginLeft: "auto", fontSize: 12, color: emotion.color }}>
                              ← you're feeling this
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!bodyQuery && (
            <div style={{
              textAlign: "center",
              padding: 40,
              color: "#A09080",
              fontSize: 15,
            }}>
              <span style={{ fontSize: 40, display: "block", marginBottom: 16 }}>👆</span>
              Select a body area above
            </div>
          )}
        </div>
      )}

      {/* Arousal Guide */}
      <section style={{
        marginTop: 50,
        background: "#fff",
        borderRadius: 24,
        padding: 32,
        maxWidth: 600,
        margin: "50px auto 0",
        boxShadow: "0 4px 30px rgba(139, 115, 85, 0.08)",
      }}>
        <h2 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "1.4rem",
          color: "#8B7D70",
          marginBottom: 24,
          textAlign: "center",
        }}>
          🌡️ Arousal State Guide
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          <div style={{
            padding: 20,
            borderRadius: 16,
            background: "linear-gradient(135deg, #F5E8E4 0%, #F7F0E8 100%)",
          }}>
            <h3 style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 10,
              color: "#C17058",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              🔥 Hyperarousal
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4A4540" }}>
              A state of being overwhelmed by energy and sensation.
              Anger, fear, and anxiety tend to show up here.
            </p>
          </div>
          <div style={{
            padding: 20,
            borderRadius: 16,
            background: "linear-gradient(135deg, #EEF2EB 0%, #EBF1F1 100%)",
          }}>
            <h3 style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 10,
              color: "#8A9A7A",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              ✨ Window of Tolerance
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4A4540" }}>
              The zone where your nervous system functions optimally.
              You can feel joy and calm here, and respond flexibly to stress.
            </p>
          </div>
          <div style={{
            padding: 20,
            borderRadius: 16,
            background: "linear-gradient(135deg, #EBF1F1 0%, #EDEDF3 100%)",
          }}>
            <h3 style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 10,
              color: "#7A9A9A",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              ❄️ Hypoarousal
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4A4540" }}>
              A state of lowered energy, numbness, or disconnection.
              Numbness and dissociation belong here.
            </p>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section style={{
        background: "#fff",
        borderRadius: 24,
        padding: 32,
        marginTop: 40,
        border: "2px dashed #E8DFD4",
        maxWidth: 600,
        margin: "40px auto 0",
      }}>
        <h2 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "1.4rem",
          color: "#8B7D70",
          marginBottom: 24,
          textAlign: "center",
        }}>
          💛 Things to Remember
        </h2>
        <div style={{ display: "grid", gap: 14 }}>
          {[
            { num: 1, text: "All emotions are information. There are no 'bad' emotions. Even uncomfortable feelings are signals trying to tell you something." },
            { num: 2, text: "Simply naming an emotion reduces amygdala activity. Labeling is itself a form of regulation." },
            { num: 3, text: "Noticing body sensations helps you recognize emotions faster and more accurately." },
            { num: 4, text: "Feeling multiple emotions at once is natural. Complex situations create complex emotions." },
          ].map((tip) => (
            <div
              key={tip.num}
              style={{
                background: "#FAF6F1",
                padding: "18px 22px",
                borderRadius: 16,
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <span style={{
                background: "#C49A6C",
                color: "#fff",
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 600,
                flexShrink: 0,
              }}>
                {tip.num}
              </span>
              <p style={{ fontSize: 14, lineHeight: 1.8, margin: 0, color: "#4A4540" }}>
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* References */}
      <section style={{
        marginTop: 40,
        padding: "28px 24px",
        background: "#fff",
        borderRadius: 20,
        maxWidth: 600,
        margin: "40px auto 0",
        border: "1px solid rgba(139, 115, 85, 0.15)",
      }}>
        <div style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 15,
          fontWeight: 700,
          color: "#5C524A",
          marginBottom: 16,
        }}>
          📖 References
        </div>

        <div style={{ fontSize: 13, color: "#5A5A5A", lineHeight: 1.9 }}>
          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: "#4A4540" }}>Body-based emotion mapping</strong><br />
            Nummenmaa, L., Glerean, E., Hari, R., & Hietanen, J. K. (2014). Bodily maps of emotions. <em>Proceedings of the National Academy of Sciences, 111</em>(2), 646-651.<br />
            <span style={{ color: "#8B7D70" }}>Each emotion has unique bodily activation patterns, consistent across cultures</span>
          </p>

          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: "#4A4540" }}>Two-dimensional model of affect</strong><br />
            Russell, J. A. (1980). A circumplex model of affect. <em>Journal of Personality and Social Psychology, 39</em>(6), 1161-1178.<br />
            <span style={{ color: "#8B7D70" }}>Emotions mapped on valence × arousal axes → connects to Window of Tolerance</span>
          </p>

          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: "#4A4540" }}>Window of Tolerance</strong><br />
            Siegel, D. J. (1999). <em>The developing mind: Toward a neurobiology of interpersonal experience.</em> Guilford Press.<br />
            <span style={{ color: "#8B7D70" }}>Optimal functioning zone of the nervous system. Framework for hyper/hypo arousal</span>
          </p>

          <p style={{ margin: 0 }}>
            <strong style={{ color: "#4A4540" }}>Affect Labeling</strong><br />
            Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., Tom, S. M., Pfeifer, J. H., & Way, B. M. (2007). Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli. <em>Psychological Science, 18</em>(5), 421-428.<br />
            <span style={{ color: "#8B7D70" }}>Naming emotions reduces amygdala response → the beginning of regulation</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        marginTop: 50,
        padding: 30,
        color: "#8B7D70",
        fontSize: 14,
      }}>
        <p style={{ margin: 0 }}>Feeling your emotions is okay, just as you are.</p>
        <p style={{ margin: "8px 0 0" }}>
          Your emotions are here to help you. <span style={{ display: "inline-block", animation: "gentleSwing 3s ease-in-out infinite" }}>🧭</span>
        </p>
        <p style={{ marginTop: 24, fontSize: 13, color: "#8B7D70" }}>
          <strong>PADO Psychological Wellness</strong><br />
          Dr. Yeji Son
        </p>
      </footer>
    </div>
  );
}
