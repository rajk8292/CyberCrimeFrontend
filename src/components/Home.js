import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [hoverBtn, setHoverBtn] = useState(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ complaints: 0, solved: 0, active: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setStatsVisible(y > 1200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const interval = setInterval(() => {
        setCounters(prev => ({
          complaints: Math.min(prev.complaints + 180, 12000),
          solved: Math.min(prev.solved + 120, 8500),
          active: Math.min(prev.active + 25, 1200)
        }));
      }, 16);
      return () => clearInterval(interval);
    }
  }, [statsVisible]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // All original style objects with responsive clamp() values
  const pageStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#222",
    overflowX: "hidden",
    background: "linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
  };

  const heroStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: "radial-gradient(ellipse at top, #1a2a6c 0%, #16213e 50%, #0f0f1a 100%)",
    padding: "0 clamp(16px, 5vw, 40px)",
  };

  const heroTitleStyle = {
    fontSize: "clamp(2rem, 8vw, 4rem)",
    fontWeight: "900",
    background: "linear-gradient(120deg, #00d4ff 0%, #ff4b2b 50%, #ffd700 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "clamp(1rem, 4vw, 2rem)",
    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
    lineHeight: "1.1",
  };

  const heroContentStyle = {
    maxWidth: "100%",
    paddingRight: isMobile ? "0" : "clamp(2rem, 5vw, 4rem)",
  };

  const sectionStyle = {
    padding: "clamp(60px, 12vw, 120px) clamp(20px, 5vw, 40px)",
    maxWidth: "1400px",
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
  };

  const titleStyle = {
    fontSize: "clamp(1.75rem, 6vw, 3.5rem)",
    fontWeight: "900",
    marginBottom: "clamp(1.5rem, 5vw, 4rem)",
    background: "linear-gradient(135deg, #00d4ff 0%, #0072ff 50%, #ff4b2b 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    filter: "drop-shadow(0 20px 40px rgba(0,212,255,0.3))",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "clamp(1rem, 3vw, 2.5rem)",
    marginTop: "clamp(2rem, 4vw, 3rem)",
  };

  const servicesData = [
    { icon: "💳", title: "Online Fraud", desc: "UPI • ATM • Banking • Payment Gateway Fraud", color: "#ff4b2b" },
    { icon: "📱", title: "Social Media Crime", desc: "Fake Profiles • Harassment • Impersonation", color: "#00d4ff" },
    { icon: "👤", title: "Cyber Stalking", desc: "Threats • Blackmail • Digital Harassment", color: "#ffd700" },
    { icon: "🔒", title: "Data Theft", desc: "Identity Breach • Privacy Invasion • Ransomware", color: "#ff6b6b" },
  ];

  const getGlassCardStyle = () => ({
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    borderRadius: "clamp(20px, 4vw, 30px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
    position: "relative",
    overflow: "hidden",
  });

  const Stat = ({ value, label, icon, color }) => {
    const glassCard = {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(30px)",
      WebkitBackdropFilter: "blur(30px)",
      borderRadius: "clamp(20px, 4vw, 30px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)",
      boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
      transition: "all 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    };

    return (
      <div style={glassCard}>
        <div style={{ 
          fontSize: "clamp(2.5rem, 8vw, 3.5rem)", 
          marginBottom: "clamp(1rem, 3vw, 1.5rem)",
          filter: `drop-shadow(0 0 30px ${color}60)`,
        }}>
          {icon}
        </div>
        <h1 style={{
          fontSize: "clamp(2rem, 8vw, 4rem)",
          fontWeight: "900",
          background: `linear-gradient(135deg, ${color}, rgba(255,255,255,0.9))`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: "0 0 clamp(1rem, 2vw, 1.5rem) 0",
        }}>
          {value.toLocaleString()}+
        </h1>
        <p style={{ 
          fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", 
          color: "rgba(255,255,255,0.9)",
          fontWeight: "500"
        }}>
          {label}
        </p>
      </div>
    );
  };

  return (
    <div style={pageStyle}>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateY(-50%) translateX(50px); } to { opacity: 1; transform: translateY(-50%) translateX(0); } }
        @keyframes slideUpNotification { 0% { opacity: 0; transform: translateX(-50%) translateY(20px); } 20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); } 100% { opacity: 0; transform: translateX(-50%) translateY(-10px); } }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .notification-panel { 
            position: static !important; 
            transform: none !important; 
            margin-top: clamp(2rem, 8vw, 4rem) !important;
            width: 100% !important; 
            height: auto !important; 
            max-height: none !important;
          }
          .mobile-notification-bar { 
            position: fixed !important; 
            left: clamp(10px, 3vw, 20px) !important; 
            right: clamp(10px, 3vw, 20px) !important;
            bottom: clamp(20px, 4vw, 30px) !important;
            transform: translateX(0) !important; 
            max-width: calc(100vw - clamp(20px, 6vw, 40px)) !important;
            font-size: clamp(0.8rem, 3vw, 0.95rem) !important;
            white-space: normal !important;
            text-align: center;
            padding: clamp(10px, 2vw, 15px) clamp(20px, 4vw, 28px);
          }
        }
      `}</style>

      {/* HERO SECTION - RESPONSIVE */}
      <section style={heroStyle}>
        {/* Background overlay */}
        <div style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          background: "radial-gradient(circle at 20% 80%, rgba(0,212,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,75,43,0.3) 0%, transparent 50%)",
          animation: "pulse 4s ease-in-out infinite",
          transform: `translateY(${scrollY * 0.3}px)`,
        }} />
        
        {/* MAIN CONTENT - FLEX LAYOUT */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1400px",
          gap: "clamp(2rem, 8vw, 4rem)",
          padding: "0 clamp(20px, 5vw, 60px)",
          zIndex: 3,
        }}>
          {/* LEFT: Title & Buttons */}
          <div style={heroContentStyle}>
            <h1 style={heroTitleStyle}>Cyber Crime <br></br>
              Complaint Portal</h1>
            <p style={{
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              opacity: 0.95,
              marginBottom: "clamp(2rem, 6vw, 3rem)",
              fontWeight: "300",
              lineHeight: "1.6",
            }}>
              🚀 Secure • Lightning Fast • 100% Transparent • Government Certified
            </p>
            <div style={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              gap: "clamp(1rem, 3vw, 2rem)",
              width: "100%",
            }}>
              {/* REGISTER BUTTON */}
              <div style={{ position: "relative", display: "inline-block", width: isMobile ? "100%" : "auto" }}>
                <button style={{
                  padding: "clamp(16px, 3vw, 22px) clamp(30px, 5vw, 50px)",
                  borderRadius: "60px",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  fontWeight: "800",
                  cursor: "pointer",
                  border: "none",
                  color: "white",
                  background: hoverBtn === "danger" ? "linear-gradient(45deg, #ff4b2b, #ff416c)" : "linear-gradient(45deg, #ff416c, #ff4b2b)",
                  boxShadow: hoverBtn === "danger" ? "0 0 60px rgba(255,75,43,0.8)" : "0 20px 40px rgba(255,75,43,0.4)",
                  transform: hoverBtn === "danger" ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.5s cubic-bezier(0.23, 1, 0.320, 1)",
                  width: isMobile ? "100%" : "auto",
                }}
                onMouseEnter={() => setHoverBtn("danger")}
                onMouseLeave={() => setHoverBtn(null)}>
                  🚨 Register Complaint Now
                </button>
                <div style={{
                  position: "absolute",
                  top: isMobile ? "-12px" : "-8px", 
                  right: isMobile ? "-12px" : "-8px",
                  width: "clamp(24px, 4vw, 28px)", 
                  height: "clamp(24px, 4vw, 28px)",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #ffeb3b, #ff9800)",
                  border: "3px solid #fff",
                  boxShadow: "0 0 20px rgba(255,235,59,0.8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "clamp(10px, 2vw, 12px)", 
                  fontWeight: "900", 
                  color: "#1a1a2e",
                  animation: "pulse 2s infinite",
                }}>
                  47
                </div>
              </div>

              {/* TRACK BUTTON */}
              <button style={{
                padding: "clamp(16px, 3vw, 22px) clamp(30px, 5vw, 50px)",
                borderRadius: "60px",
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                fontWeight: "800",
                cursor: "pointer",
                border: "none",
                color: "white",
                background: hoverBtn === "track" ? "linear-gradient(45deg, #0072ff, #00d4ff)" : "linear-gradient(45deg, #00c6ff, #0072ff)",
                boxShadow: hoverBtn === "track" ? "0 0 60px rgba(0,212,255,0.8)" : "0 20px 40px rgba(0,212,255,0.4)",
                transform: hoverBtn === "track" ? "scale(1.08)" : "scale(1)",
                transition: "all 0.5s cubic-bezier(0.23, 1, 0.320, 1)",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={() => setHoverBtn("track")}
              onMouseLeave={() => setHoverBtn(null)}>
                📍 Track Your Case
              </button>
            </div>
          </div>

          {/* RIGHT: Notice Panel - Responsive */}
          <div className="notification-panel" style={{
            position: isMobile ? "static" : "absolute",
            top: isMobile ? "auto" : "50%",
            right: isMobile ? "auto" : "5%",
            transform: isMobile ? "none" : "translateY(-50%)",
            width: isMobile ? "100%" : "400px",
            height: isMobile ? "auto" : "500px",
            maxHeight: isMobile ? "none" : "90vh",
            background: "linear-gradient(145deg, rgba(255,75,43,0.95), rgba(255,65,108,0.95))",
            backdropFilter: "blur(25px)",
            borderRadius: "clamp(20px, 4vw, 25px)",
            padding: "clamp(1.5rem, 4vw, 2rem)",
            boxShadow: "0 30px 80px rgba(255,75,43,0.4), 0 0 40px rgba(255,75,43,0.3)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "white",
            textAlign: "left",
            animation: "slideInRight 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both",
            zIndex: 4,
            overflow: isMobile ? "visible" : "hidden",
            display: "flex",
            flexDirection: "column",
            marginTop: isMobile ? "clamp(2rem, 6vw, 4rem)" : "0",
          }}>
            {/* Notice content same as original */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(10px, 2vw, 15px)",
              marginBottom: "clamp(1rem, 3vw, 1.5rem)",
              paddingBottom: "clamp(0.75rem, 2vw, 1rem)",
              borderBottom: "2px solid rgba(255,255,255,0.3)",
            }}>
              <div style={{
                width: "clamp(40px, 6vw, 50px)", 
                height: "clamp(40px, 6vw, 50px)",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ffeb3b, #ffd700)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(1.3rem, 4vw, 1.6rem)", 
                fontWeight: "bold", 
                color: "#1a1a2e",
                boxShadow: "0 8px 25px rgba(255,235,59,0.6)",
                animation: "pulse 2s infinite",
              }}>
                ⚠️
              </div>
              <div>
                <h3 style={{
                  fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
                  fontWeight: "900",
                  margin: 0,
                  background: "linear-gradient(45deg, #fff, #ffeb3b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  IMPORTANT NOTICE
                </h3>
                <p style={{ fontSize: "clamp(0.75rem, 2vw, 0.85rem)", opacity: 0.9, margin: "0.25rem 0 0" }}>
                  Updated: Today 2:55 PM IST
                </p>
              </div>
            </div>

            <div style={{
              flex: 1,
              fontSize: "clamp(0.85rem, 2.2vw, 0.95rem)",
              lineHeight: "1.55",
              marginBottom: "clamp(1rem, 3vw, 1.5rem)",
              overflowY: "auto",
              paddingRight: "0.5rem",
              maxHeight: isMobile ? "none" : "300px",
            }}>
              🚨 <strong>New UPI Fraud Alert:</strong> Multiple accounts targeted with 
              fake "Account Locked" SMS from +91-XXXXXXX numbers. Criminals using 
              sophisticated phishing techniques.
              
              <br/><br/>
              <strong>⚠️ NEVER SHARE:</strong>
              <ul style={{ margin: "0.5rem 0 0 1rem", fontSize: "clamp(0.8rem, 2vw, 0.9rem)" }}>
                <li>OTP codes</li>
                <li>Bank details</li>
                <li>CVV numbers</li>
                <li>Debit/Credit card info</li>
              </ul>
              
              <br/>
              <strong>✅ REPORT IMMEDIATELY:</strong> Use Register Complaint button above. 
              24×7 helpline available at 1930.
            </div>

            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "stretch" : "center",
              marginBottom: "clamp(1rem, 3vw, 1.5rem)",
              paddingTop: "clamp(0.75rem, 2vw, 1rem)",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              gap: isMobile ? "0.75rem" : "0",
              fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
            }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span style={{
                  padding: "clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 12px)",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "16px",
                  fontWeight: "700",
                }}>
                  #UPIFraud
                </span>
                <span style={{
                  padding: "clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 12px)",
                  background: "rgba(255,235,59,0.3)",
                  borderRadius: "16px",
                  fontWeight: "700",
                  color: "#1a1a2e",
                }}>
                  2.3K Views
                </span>
              </div>
              <div style={{ fontWeight: "700", color: "#ffeb3b" }}>
                LIVE
              </div>
            </div>

            <button style={{
              width: "100%",
              padding: "clamp(12px, 2.5vw, 14px) clamp(16px, 3vw, 20px)",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.25)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "white",
              fontWeight: "700",
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              cursor: "pointer",
              backdropFilter: "blur(20px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.35)";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.25)";
              e.target.style.transform = "translateY(0)";
            }}>
              🔍 Read Full Alert →
            </button>
          </div>
        </div>

        {/* MOBILE NOTIFICATION BAR */}
        <div className="mobile-notification-bar" style={{
          position: "fixed",
          bottom: "clamp(20px, 4vw, 30px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, rgba(255,75,43,0.95), rgba(255,65,108,0.95))",
          padding: "clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)",
          borderRadius: "30px",
          color: "white",
          fontSize: "clamp(0.8rem, 3vw, 0.95rem)",
          fontWeight: "700",
          boxShadow: "0 15px 40px rgba(255,75,43,0.5)",
          animation: "slideUpNotification 4s ease-out 1s infinite",
          zIndex: 5,
        }}>
          🔔 1,247 New Complaints Today
        </div>
      </section>

      {/* Rest of sections remain exactly the same with responsive gridStyle */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>🚀 Cyber Crime Services</h2>
        <div style={gridStyle}>
          {servicesData.map(({ icon, title, desc, color }, i) => (
            <div key={i} style={getGlassCardStyle()} onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-25px) scale(1.03)";
              e.currentTarget.style.boxShadow = `0 40px 80px rgba(0,0,0,0.4), 0 0 60px ${color}30`;
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)";
            }}>
              <div style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", marginBottom: "clamp(1.5rem, 4vw, 2rem)", filter: `drop-shadow(0 0 25px ${color}40)` }}>
                {icon}
              </div>
              <h3 style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", marginBottom: "clamp(1rem, 2vw, 1.5rem)", background: `linear-gradient(45deg, ${color}, #ffffff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: "800" }}>
                {title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: "1.8", fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        ...sectionStyle,
        opacity: statsVisible ? 1 : 0,
        transform: statsVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 1s ease",
      }}>
        <h2 style={titleStyle}>📊 Live Statistics</h2>
        <div style={gridStyle}>
          <Stat value={counters.complaints} label="Total Complaints Filed" icon="📈" color="#ff4b2b" />
          <Stat value={counters.solved} label="Cases Successfully Resolved" icon="✅" color="#00d4ff" />
          <Stat value={counters.active} label="Active Investigations" icon="🔍" color="#ffd700" />
        </div>
      </section>

      <section style={{
        padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 40px)",
        background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
        color: "white",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: "clamp(1.75rem, 6vw, 2.5rem)", marginBottom: "clamp(1rem, 3vw, 1.5rem)" }}>🚨 Emergency Helpline</h2>
        <h1 style={{ fontSize: "clamp(3.5rem, 12vw, 6rem)", margin: "clamp(0.75rem, 2vw, 1rem) 0 clamp(1.5rem, 4vw, 2rem)", fontWeight: "900", textShadow: "0 0 40px rgba(255,255,255,0.9)" }}>
          📞 1930
        </h1>
        <p style={{ fontSize: "clamp(1.1rem, 4vw, 1.4rem)", fontWeight: "500" }}>
          Available 24×7 • National Cyber Crime Helpline
        </p>
      </section>

      <footer style={{ background: "#0b1220", color: "rgba(255,255,255,0.7)", padding: "2rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "1rem" }}>
          © 2026 Cyber Crime Portal | Ministry of Home Affairs, Govt. of India
        </p>
      </footer>
    </div>
  );
  
}
