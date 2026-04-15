import { useState, useRef, useEffect } from "react";

const EMOTIONS = [
  {
    id: "anger",
    name: "분노",
    nameEn: "Anger",
    color: "#C17058",
    colorLight: "#F5E8E4",
    zone: "hyper",
    zoneLabel: "과각성 🔥",
    subEmotions: ["짜증", "격분", "억울함", "좌절"],
    bodyParts: [
      { area: "head", label: "머리 뜨거움" },
      { area: "jaw", label: "턱 꽉 물림" },
      { area: "chest", label: "가슴 팽창" },
      { area: "hands", label: "주먹 쥐어짐" },
    ],
    icon: "🔥",
  },
  {
    id: "fear",
    name: "두려움",
    nameEn: "Fear",
    color: "#C49A6C",
    colorLight: "#F7F0E8",
    zone: "hyper",
    zoneLabel: "과각성 🔥",
    subEmotions: ["불안", "공포", "긴장", "걱정"],
    bodyParts: [
      { area: "chest", label: "심장 빨라짐" },
      { area: "stomach", label: "배 조임" },
      { area: "throat", label: "목 막힘" },
      { area: "hands", label: "손 떨림" },
    ],
    icon: "⚡",
  },
  {
    id: "joy",
    name: "기쁨",
    nameEn: "Joy",
    color: "#8A9A7A",
    colorLight: "#EEF2EB",
    zone: "window",
    zoneLabel: "내성의 창 ✨",
    subEmotions: ["행복", "감사", "설렘", "만족"],
    bodyParts: [
      { area: "chest", label: "가슴 따뜻함" },
      { area: "face", label: "얼굴 펴짐" },
      { area: "whole", label: "몸 가벼움" },
      { area: "hands", label: "손 펴짐" },
    ],
    icon: "🌿",
  },
  {
    id: "calm",
    name: "편안함",
    nameEn: "Calm",
    color: "#7A9A9A",
    colorLight: "#EBF1F1",
    zone: "window",
    zoneLabel: "내성의 창 ✨",
    subEmotions: ["안정", "평화", "여유", "이완"],
    bodyParts: [
      { area: "whole", label: "몸 이완됨" },
      { area: "chest", label: "호흡 깊고 느림" },
      { area: "shoulders", label: "어깨 내려감" },
      { area: "face", label: "표정 부드러움" },
    ],
    icon: "✨",
  },
  {
    id: "sadness",
    name: "슬픔",
    nameEn: "Sadness",
    color: "#8A8AAA",
    colorLight: "#EDEDF3",
    zone: "mixed",
    zoneLabel: "창 경계",
    subEmotions: ["서운함", "그리움", "상실감", "외로움"],
    bodyParts: [
      { area: "chest", label: "가슴 무거움" },
      { area: "throat", label: "목 뭉침" },
      { area: "eyes", label: "눈 시큼함" },
      { area: "whole", label: "몸 처짐" },
    ],
    icon: "💧",
  },
  {
    id: "shame",
    name: "수치심",
    nameEn: "Shame",
    color: "#A68A9A",
    colorLight: "#F2ECEF",
    zone: "mixed",
    zoneLabel: "창 경계",
    subEmotions: ["부끄러움", "자기비난", "무가치함", "당혹"],
    bodyParts: [
      { area: "face", label: "얼굴 화끈거림" },
      { area: "chest", label: "가슴 쪼그라듦" },
      { area: "stomach", label: "속 불편함" },
      { area: "whole", label: "숨고 싶음" },
    ],
    icon: "🫧",
  },
  {
    id: "numbness",
    name: "무감각",
    nameEn: "Numbness",
    color: "#9AAAB0",
    colorLight: "#EDF1F2",
    zone: "hypo",
    zoneLabel: "저각성 ❄️",
    subEmotions: ["멍함", "공허함", "해리", "무기력"],
    bodyParts: [
      { area: "whole", label: "몸 무거움" },
      { area: "head", label: "머리 안개낌" },
      { area: "hands", label: "감각 없음" },
      { area: "chest", label: "텅 빈 느낌" },
    ],
    icon: "❄️",
  },
  {
    id: "disgust",
    name: "혐오",
    nameEn: "Disgust",
    color: "#A09080",
    colorLight: "#F0ECE8",
    zone: "hyper",
    zoneLabel: "과각성 🔥",
    subEmotions: ["역겨움", "거부감", "경멸", "메스꺼움"],
    bodyParts: [
      { area: "stomach", label: "속 메스꺼움" },
      { area: "throat", label: "목 울렁임" },
      { area: "face", label: "얼굴 찌푸림" },
      { area: "whole", label: "몸 움츠림" },
    ],
    icon: "🍂",
  },
];

const BODY_AREA_POSITIONS = {
  head: { cx: 150, cy: 45, rx: 28, ry: 32 },
  face: { cx: 150, cy: 50, rx: 22, ry: 18 },
  eyes: { cx: 150, cy: 42, rx: 20, ry: 8 },
  jaw: { cx: 150, cy: 62, rx: 18, ry: 10 },
  throat: { cx: 150, cy: 82, rx: 14, ry: 10 },
  shoulders: { cx: 150, cy: 100, rx: 50, ry: 12 },
  chest: { cx: 150, cy: 130, rx: 35, ry: 28 },
  stomach: { cx: 150, cy: 175, rx: 28, ry: 22 },
  hands: { cx: 150, cy: 220, rx: 55, ry: 14 },
  whole: { cx: 150, cy: 150, rx: 55, ry: 80 },
};

const BODY_QUESTIONS = [
  { area: "head", label: "머리", icon: "🧠" },
  { area: "chest", label: "가슴", icon: "💗" },
  { area: "stomach", label: "배", icon: "🫄" },
  { area: "throat", label: "목", icon: "🗣️" },
  { area: "hands", label: "손", icon: "🤲" },
  { area: "whole", label: "온몸", icon: "🧍" },
  { area: "face", label: "얼굴", icon: "😶" },
  { area: "shoulders", label: "어깨", icon: "💆" },
];

function BodySilhouette({ activeParts, color }) {
  return (
    <svg viewBox="0 0 300 330" style={{ width: "100%", maxWidth: 220 }}>
      {/* Head */}
      <ellipse cx="150" cy="45" rx="30" ry="35" fill="#E8E0D8" stroke="#D4C8BC" strokeWidth="1.5" />
      {/* Neck */}
      <rect x="140" y="75" width="20" height="18" rx="6" fill="#E8E0D8" stroke="#D4C8BC" strokeWidth="1.5" />
      {/* Torso */}
      <path d="M100 93 Q90 95 85 110 L80 200 Q80 215 100 220 L120 222 L150 225 L180 222 L200 220 Q220 215 220 200 L215 110 Q210 95 200 93 Z"
        fill="#E8E0D8" stroke="#D4C8BC" strokeWidth="1.5" />
      {/* Left arm */}
      <path d="M85 110 Q60 115 50 150 L45 200 Q42 215 55 218 L65 215 Q68 210 70 200 L80 155 Q82 140 85 130"
        fill="#E8E0D8" stroke="#D4C8BC" strokeWidth="1.5" />
      {/* Right arm */}
      <path d="M215 110 Q240 115 250 150 L255 200 Q258 215 245 218 L235 215 Q232 210 230 200 L220 155 Q218 140 215 130"
        fill="#E8E0D8" stroke="#D4C8BC" strokeWidth="1.5" />
      {/* Left leg */}
      <path d="M110 220 L105 280 Q103 300 110 310 L125 312 Q130 305 128 295 L130 225"
        fill="#E8E0D8" stroke="#D4C8BC" strokeWidth="1.5" />
      {/* Right leg */}
      <path d="M190 220 L195 280 Q197 300 190 310 L175 312 Q170 305 172 295 L170 225"
        fill="#E8E0D8" stroke="#D4C8BC" strokeWidth="1.5" />

      {/* Active body part highlights */}
      {activeParts.map((part, i) => {
        const pos = BODY_AREA_POSITIONS[part.area];
        if (!pos) return null;
        return (
          <g key={i}>
            <ellipse
              cx={pos.cx} cy={pos.cy} rx={pos.rx + 6} ry={pos.ry + 6}
              fill={color} opacity={0.15}
              style={{ animation: `pulse ${1.5 + i * 0.3}s ease-in-out infinite` }}
            />
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
          감정 지도
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#8B7D70", fontWeight: 300 }}>
          내 감정에 이름 붙이기, 몸에서 느끼기
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
            감정 인식에는 다양한 방식이 있습니다
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
          💡 핵심 인사이트
        </h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.9 }}>
          감정을 바로 알아차리기 어려운 건 흔한 일이에요. <span style={{
            background: "linear-gradient(180deg, transparent 60%, #E8DFD4 60%)",
            padding: "0 4px",
            fontWeight: 500,
          }}>감정에서든, 몸에서든, 어디서 시작해도 괜찮아요.</span><br /><br />
          감정에 이름을 붙이면 뇌의 편도체 활성이 줄어들어요. 이것을 <strong>'감정 명명 효과(Affect Labeling)'</strong>라고 해요.<br /><br />
          이름을 붙이는 것 자체가 <span style={{
            background: "linear-gradient(180deg, transparent 60%, #E8DFD4 60%)",
            padding: "0 4px",
            fontWeight: 500,
          }}>조절의 시작</span>이에요.
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
          🎯 감정에서 출발
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
          🧍 몸에서 출발
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
            지금 느끼는 감정을 골라보세요
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
                  <div style={{ fontSize: 12, color: "#8B7D70", marginTop: 2 }}>
                    {e.nameEn}
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
                margin: "0 0 6px",
              }}>
                {emotion.icon} {emotion.name}
              </h3>
              <div style={{ fontSize: 14, color: "#8B7D70", marginBottom: 20 }}>
                {emotion.nameEn}
              </div>

              {/* Sub-emotions */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  fontSize: 13,
                  color: "#8B7D70",
                  marginBottom: 10,
                  fontWeight: 600,
                }}>
                  비슷한 감정들
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
                  몸에서 어떻게 느껴지나요?
                </div>
                <div style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  background: "#FAF6F1",
                  borderRadius: 20,
                  padding: "20px 16px",
                }}>
                  <div style={{ flex: "0 0 130px" }}>
                    <BodySilhouette activeParts={emotion.bodyParts} color={emotion.color} />
                  </div>
                  <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    paddingTop: 12,
                  }}>
                    {emotion.bodyParts.map((bp, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          animation: `fadeIn ${0.3 + i * 0.1}s ease`,
                        }}
                      >
                        <div style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: emotion.color,
                          flexShrink: 0,
                        }} />
                        <span style={{
                          fontSize: 14,
                          color: "#4A4540",
                          lineHeight: 1.5,
                        }}>
                          {bp.label}
                        </span>
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
            지금 몸에서 가장 많이 느껴지는 곳은?
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
            marginBottom: 24,
          }}>
            {BODY_QUESTIONS.map((bq) => (
              <button
                key={bq.area}
                onClick={() => { setBodyQuery(bodyQuery === bq.area ? null : bq.area); setSelected(null); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 18px",
                  borderRadius: 20,
                  border: `2px solid ${bodyQuery === bq.area ? "#5C524A" : "rgba(139, 115, 85, 0.15)"}`,
                  background: bodyQuery === bq.area ? "#E8DFD420" : "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: 22 }}>{bq.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#4A4540" }}>
                  {bq.label}
                </span>
              </button>
            ))}
          </div>

          {/* Matched emotions */}
          {bodyQuery && (
            <div style={{ animation: "slideUp 0.35s ease" }}>
              <div style={{
                fontSize: 14,
                color: "#8B7D70",
                textAlign: "center",
                marginBottom: 16,
                fontWeight: 500,
              }}>
                {BODY_QUESTIONS.find(b => b.area === bodyQuery)?.label}에서 느껴지는 감정들
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {matchedEmotions.map((e) => {
                  const bp = e.bodyParts.find((b) => b.area === bodyQuery);
                  return (
                    <button
                      key={e.id}
                      onClick={() => setSelected(selected === e.id ? null : e.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "16px 20px",
                        borderRadius: 20,
                        border: `2px solid ${selected === e.id ? e.color : "rgba(139, 115, 85, 0.15)"}`,
                        background: selected === e.id ? e.colorLight : "#fff",
                        cursor: "pointer",
                        transition: "all 0.25s",
                        textAlign: "left",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <span style={{ fontSize: 28 }}>{e.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: selected === e.id ? e.color : "#4A4540",
                        }}>
                          {e.name}
                        </div>
                        <div style={{ fontSize: 13, color: "#8B7D70", marginTop: 3 }}>
                          {bp?.label}
                        </div>
                      </div>
                      <div style={{
                        fontSize: 12,
                        padding: "4px 12px",
                        borderRadius: 14,
                        background: zoneGradient(e.zone),
                        color: zoneColor(e.zone),
                        fontWeight: 600,
                      }}>
                        {e.zoneLabel}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Body detail if selected */}
              {emotion && (
                <div
                  ref={detailRef}
                  style={{
                    marginTop: 24,
                    animation: "slideUp 0.4s ease",
                    background: "#fff",
                    borderRadius: 24,
                    padding: "24px 20px",
                    boxShadow: "0 4px 30px rgba(139, 115, 85, 0.08)",
                    border: `1px solid rgba(139, 115, 85, 0.1)`,
                    borderLeft: `4px solid ${emotion.color}`,
                  }}
                >
                  <div style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    background: "#FAF6F1",
                    borderRadius: 20,
                    padding: "20px 16px",
                  }}>
                    <div style={{ flex: "0 0 120px" }}>
                      <BodySilhouette activeParts={emotion.bodyParts} color={emotion.color} />
                    </div>
                    <div style={{ flex: 1, paddingTop: 8 }}>
                      <div style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: 18,
                        fontWeight: 700,
                        color: emotion.color,
                        marginBottom: 10,
                      }}>
                        {emotion.icon} {emotion.name}
                      </div>
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginBottom: 14,
                      }}>
                        {emotion.subEmotions.map((sub, i) => (
                          <span
                            key={i}
                            style={{
                              padding: "4px 12px",
                              borderRadius: 14,
                              fontSize: 13,
                              background: emotion.colorLight,
                              color: emotion.color,
                              fontWeight: 500,
                            }}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                      {emotion.bodyParts.map((bp, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 6,
                          }}
                        >
                          <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: bp.area === bodyQuery ? emotion.color : `${emotion.color}66`,
                            flexShrink: 0,
                          }} />
                          <span style={{
                            fontSize: 14,
                            lineHeight: 1.4,
                            color: bp.area === bodyQuery ? "#4A4540" : "#8B7D70",
                            fontWeight: bp.area === bodyQuery ? 600 : 400,
                          }}>
                            {bp.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sensory Guide */}
      <section style={{
        background: "#fff",
        borderRadius: 24,
        padding: 32,
        marginTop: 50,
        boxShadow: "0 4px 30px rgba(139, 115, 85, 0.08)",
        maxWidth: 600,
        margin: "50px auto 0",
      }}>
        <h2 style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: "1.4rem",
          color: "#5C524A",
          marginBottom: 24,
          textAlign: "center",
        }}>
          🌡️ 각성 상태 가이드
        </h2>
        <div style={{
          display: "grid",
          gap: 16,
        }}>
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
              🔥 과각성 (Hyperarousal)
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4A4540" }}>
              심장이 빨라지고, 근육이 긴장되고, 생각이 빠르게 돌아가는 상태예요.
              분노, 두려움, 혐오 같은 감정이 여기에 속해요.
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
              color: "#5C524A",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              ✨ 내성의 창 (Window of Tolerance)
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4A4540" }}>
              신경계가 최적으로 기능하는 구간이에요.
              기쁨, 편안함 같은 감정을 느끼고, 스트레스에 유연하게 대처할 수 있어요.
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
              ❄️ 저각성 (Hypoarousal)
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#4A4540" }}>
              에너지가 떨어지고, 멍하고, 감각이 둔해지는 상태예요.
              무감각, 해리 같은 경험이 여기에 속해요.
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
          💛 기억해두면 좋은 것들
        </h2>
        <div style={{ display: "grid", gap: 14 }}>
          {[
            { num: 1, text: "모든 감정은 정보예요. '나쁜' 감정은 없어요. 불편한 감정도 당신에게 무언가를 알려주려는 신호예요." },
            { num: 2, text: "감정에 이름을 붙이는 것만으로도 편도체 활성이 줄어들어요. 이름 붙이기 자체가 조절이에요." },
            { num: 3, text: "몸의 감각을 알아차리면 감정을 더 빨리, 더 정확하게 인식할 수 있어요." },
            { num: 4, text: "한 번에 여러 감정을 느끼는 건 자연스러운 거예요. 복잡한 상황에선 복잡한 감정이 나와요." },
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
          📖 참고문헌
        </div>

        <div style={{ fontSize: 13, color: "#5A5A5A", lineHeight: 1.9 }}>
          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: "#4A4540" }}>신체감각 기반 감정 지도</strong><br />
            Nummenmaa, L., Glerean, E., Hari, R., & Hietanen, J. K. (2014). Bodily maps of emotions. <em>Proceedings of the National Academy of Sciences, 111</em>(2), 646-651.<br />
            <span style={{ color: "#8B7D70" }}>감정마다 고유한 신체 활성화 패턴이 있고, 문화를 넘어 일관됨</span>
          </p>

          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: "#4A4540" }}>감정의 2차원 모델</strong><br />
            Russell, J. A. (1980). A circumplex model of affect. <em>Journal of Personality and Social Psychology, 39</em>(6), 1161-1178.<br />
            <span style={{ color: "#8B7D70" }}>쾌/불쾌 × 각성도 2축으로 감정을 배치 → 내성의 창과 연결</span>
          </p>

          <p style={{ margin: "0 0 12px" }}>
            <strong style={{ color: "#4A4540" }}>내성의 창</strong><br />
            Siegel, D. J. (1999). <em>The developing mind: Toward a neurobiology of interpersonal experience.</em> Guilford Press.<br />
            <span style={{ color: "#8B7D70" }}>신경계의 최적 기능 구간. 과각성 ↔ 저각성 이해의 틀</span>
          </p>

          <p style={{ margin: 0 }}>
            <strong style={{ color: "#4A4540" }}>감정 명명 효과</strong><br />
            Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., Tom, S. M., Pfeifer, J. H., & Way, B. M. (2007). Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli. <em>Psychological Science, 18</em>(5), 421-428.<br />
            <span style={{ color: "#8B7D70" }}>감정에 이름을 붙이면 편도체 반응 감소 → 조절의 시작</span>
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
        <p style={{ margin: 0 }}>감정을 느끼는 것, 그 자체로 괜찮아요.</p>
        <p style={{ margin: "8px 0 0" }}>
          당신의 감정은 당신을 돕고 있어요. <span style={{ display: "inline-block", animation: "gentleSwing 3s ease-in-out infinite" }}>🧭</span>
        </p>
        <p style={{ marginTop: 24, fontSize: 13, color: "#8B7D70" }}>
          <strong>PADO Psychological Wellness</strong><br />
          Dr. Yeji Son
        </p>
      </footer>
    </div>
  );
}
