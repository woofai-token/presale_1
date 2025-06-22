import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import PresaleForm from "./components/PresaleForm";
import TokenomicsChart from "./components/TokenomicsChart";
import Countdown from "./components/Countdown";
import SaleProgress from "./components/progress";
import Navbar from "./components/Navbar";

const retroFontLink = document.createElement("link");
retroFontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
retroFontLink.rel = "stylesheet";
document.head.appendChild(retroFontLink);

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function App() {
  const [showMobileOptions, setShowMobileOptions] = useState(false);

  const dappUrl = encodeURIComponent("https://labubutoken.netlify.app"); // <-- Update to your live URL

  const handlePhantomRedirect = () => {
    window.location.href = `https://phantom.app/ul/browse/${dappUrl}`;
  };

  const handleSolflareRedirect = () => {
    window.location.href = `https://solflare.com/i/#${dappUrl}`;
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.background}></div>

      <div style={styles.container}>
        <Countdown />
        <SaleProgress />

        <WalletMultiButton
          style={styles.walletButton}
          onClick={() => isMobile() && setShowMobileOptions(true)}
        />

        {showMobileOptions && (
          <div style={{ marginTop: "1rem" }}>
            <p style={styles.note}>Choose wallet app:</p>
            <button onClick={handlePhantomRedirect} style={styles.mobileBtn}>Open in Phantom</button>
            <button onClick={handleSolflareRedirect} style={styles.mobileBtn}>Open in Solflare</button>
          </div>
        )}

        <PresaleForm />

        <footer style={styles.footer}>
          © 2025 Labubu Club ·{" "}
          <a href="mailto:labubu.coin@gmail.com" style={styles.link}>Contact Us</a>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Press Start 2P', monospace",
    backgroundColor: "#0d0d0d",
    minHeight: "100vh",
    color: "#FF66CC",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at top, #6600ff, #0d0d0d)",
    zIndex: -1,
  },
  container: {
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    background: "#1a1a2e",
    border: "2px solid #00FFFF",
    borderRadius: "12px",
    padding: "2rem 1rem",
  },
  walletButton: {
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#FF66CC",
    color: "#000",
    fontSize: "10px",
    borderRadius: "6px",
    padding: "10px",
  },
  mobileBtn: {
    margin: "5px",
    padding: "10px",
    fontSize: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#00FFFF",
    color: "#000",
    cursor: "pointer",
    fontFamily: "'Press Start 2P', monospace",
  },
  note: {
    fontSize: "10px",
    color: "#cccccc",
    marginBottom: "0.5rem",
  },
  footer: {
    fontSize: "10px",
    marginTop: "1.5rem",
    color: "#cccccc",
  },
  link: {
    color: "#00FFFF",
    textDecoration: "underline",
  },
};
