import React, { useEffect } from "react";

export default function LoadingScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/info"; // Navigate after 2.5 seconds
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* Background gradient */}
      <div style={styles.gradient}></div>

      {/* Background Circles */}
      <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-[#0F766E] rounded-full opacity-70 blur-xl"></div>
      <div className="absolute top-1/2 left-[300px] w-28 h-28 bg-[#14B8A6] rounded-full opacity-60 blur-xl"></div>
      <div className="absolute bottom-1/4 right-[200px] w-40 h-40 bg-[#06B6D4] rounded-full opacity-80 blur-xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-[#0D9488] rounded-full opacity-70 blur-xl"></div>
      {/* Animated Waves */}
      <div className="wave wave1" style={styles.wave}></div>
      <div className="wave wave2" style={styles.wave}></div>

      {/* Center text */}
      <p style={styles.text}>Loading...</p>

      {/* Keyframes (inline style tag) */}
      <style>
        {`
          @keyframes waveAnim {
            0% { transform: scale(0.5); opacity: 0.6; }
            100% { transform: scale(1.8); opacity: 0; }
          }

          @keyframes texturePulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.15); opacity: 0.6; }
          }

          .wave {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 100px;
            background-color: rgba(31, 182, 186, 0.2);
            animation: waveAnim 1.5s infinite ease-out;
          }

          .wave2 {
            animation-delay: 0.4s;
            animation-duration: 1.9s;
          }

          .textureCircle {
            animation: texturePulse 3s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

// Inline JS Styles
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg, #E0F2F1, #B2DFDB, #80CBC4)",
  },
  gradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  wave: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "100px",
    backgroundColor: "rgba(31, 182, 186, 0.2)",
  },
  textureCircle: {
    position: "absolute",
    borderRadius: "1000px",
    animation: "texturePulse 3s infinite ease-in-out",
  },
  textureCircle1: {
    top: "15%",
    right: "-60px",
    width: "140px",
    height: "140px",
    backgroundColor: "#B2F5EA",
  },
  textureCircle2: {
    top: "40%",
    left: "-40px",
    width: "100px",
    height: "100px",
    backgroundColor: "#CCFBF1",
    animationDuration: "3.5s",
  },
  textureCircle3: {
    bottom: "25%",
    right: "-30px",
    width: "120px",
    height: "120px",
    backgroundColor: "#A7F3D0",
    animationDuration: "4s",
  },
  textureCircle4: {
    bottom: "15%",
    left: "-50px",
    width: "110px",
    height: "110px",
    backgroundColor: "#B2F5EA",
    animationDuration: "3.2s",
  },
  text: {
    position: "absolute",
    bottom: "25%",
    fontSize: "18px",
    color: "#004D40",
    fontWeight: "700",
    textAlign: "center",
    textShadow: "0 2px 4px rgba(14, 94, 95, 0.3)",
  },
};
