import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import PresaleForm from "./components/PresaleForm";
import TokenomicsChart from "./components/TokenomicsChart";
import Countdown from "./components/Countdown";
import SaleProgress from "./components/progress";
import Navbar from "./components/Navbar";
// Load retro font
const retroFontLink = document.createElement("link");
retroFontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
retroFontLink.rel = "stylesheet";
document.head.appendChild(retroFontLink);

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isWalletInstalled(name) {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes(name);
}

export default function App() {
  useEffect(() => {
    if (isMobile() && !isWalletInstalled("phantom") && !isWalletInstalled("solflare")) {
      const dappUrl = encodeURIComponent(window.location.href);
      // Auto-redirect to Phantom or Solflare if mobile
      const redirectUrl = navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad")
        ? `https://phantom.app/ul/browse/${dappUrl}`
        : `https://solflare.com/i/#${dappUrl}`;
      window.location.href = redirectUrl;
    }
  }, []);

  return (

    <div style={styles.page}>
       <Navbar />
      <div style={styles.background}></div>
      
      <div style={styles.container}>
       
        <Countdown />
        <SaleProgress />
        <WalletMultiButton style={styles.walletButton} />
        <PresaleForm />
        {/* <p style={styles.note}>🔒 Unsold tokens will be burned.</p> */}
        <footer style={styles.footer}>
          © 2025 Labubu Club· <a href="mailto:labubu.coin@gmail.com" style={styles.link}>Contact Us</a>
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
    flexDirection:"column",
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
    // boxShadow: "0 0 25px #FF66CC66",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 20,
    boxShadow: "0 0 10px #FF66CC",
  },
  heading: {
    fontSize: "16px",
    color: "#00FFFF",
    marginBottom: 20,
  },
  walletButton: {
    marginTop: "1rem",
    marginBottom: "1.5rem",
    backgroundColor: "#FF66CC",
    color: "#000",
    fontSize: "10px",
    borderRadius: "6px",
    padding: "10px",
  },
  note: {
    fontSize: "10px",
    color: "#ffcccc",
    marginTop: "2rem",
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
