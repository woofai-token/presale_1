import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import PresaleForm from "./components/PresaleForm";
import TokenomicsChart from "./components/TokenomicsChart";
import Countdown from "./components/Countdown";
import SaleProgress from "./components/progress";
import Navbar from "./components/Navbar";
import LanguageSelector from "./components/LanguageSelector";

const retroFontLink = document.createElement("link");
retroFontLink.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
retroFontLink.rel = "stylesheet";
document.head.appendChild(retroFontLink);
function handleLanguageChange(lang) {
  fetch(`/Lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.innerText = data[key];
      });
    });

}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isInWalletBrowser() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("phantom") || ua.includes("solflare");
}

export default function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isMobile() && !isInWalletBrowser()) {
      setShowPopup(true);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("✅ Presale link copied to clipboard!");
  };

  return (
    <><Navbar />
    <div style={styles.page}>
     
      <div style={styles.background}></div>

      {showPopup && (
        <div style={styles.popupOverlay}>
  <div style={styles.popupBox}>
    <LanguageSelector onChange={handleLanguageChange} />

    <h3 style={styles.popupTitle} data-i18n="popup_heading">📱 Open in Wallet Browser</h3>
    <p style={styles.popupText} data-i18n="popup_note">
      For mobile phone users, please follow the steps below:
    </p>

    <p style={styles.popupText}><strong data-i18n="step1_title" style={styles.step}>Step 1:</strong> <span data-i18n="step1_desc">Install Solflare or Phantom wallet</span></p>
    <button style={styles.popupBtn} onClick={() => window.open("https://phantom.app", "_blank")} data-i18n="install_phantom">
      Install Phantom
    </button>
    <button style={styles.popupBtn} onClick={() => window.open("https://solflare.com", "_blank")} data-i18n="install_solflare">
      Install Solflare
    </button>

    <p style={styles.popupText}>
      <strong data-i18n="step2_title" style={styles.step}>Step 2:</strong> <span data-i18n="step2_desc">Open the Solflare or Phantom wallet → tap <b>Explore</b> 🔍</span>
    </p>

    <p style={styles.popupText}>
      <strong data-i18n="step3_title" style={styles.step}>Step 3:</strong> <span data-i18n="step3_desc">Paste the following presale link and open it</span>
    </p>

    <div style={styles.copyRow}>
      <input
        type="text"
        value={window.location.href}
        readOnly
        style={styles.copyInput}
      />
      <button style={styles.copyButton} onClick={handleCopy} data-i18n="copy_button">📋 Copy</button>
    </div>
  </div>
</div>

      )}

      <div style={styles.container}>
        <Countdown />
        <SaleProgress />
        <WalletMultiButton style={styles.walletButton} />
        <PresaleForm />
        <footer style={styles.footer}>
          © 2025 BabyLabubu Club · <a href="mailto:BabyLabubu.coin@gmail.com" style={styles.link}>Contact Us</a>
        </footer>
      </div>
    </div>
    </>
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
    alignItems: "center",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
  },
  step:{
      color: "#FF66CCaa",
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
    zIndex: 0,
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
  footer: {
    fontSize: "10px",
    marginTop: "1.5rem",
    color: "#cccccc",
  },
  link: {
    color: "#00FFFF",
    textDecoration: "underline",
  },

  // Popup styles
  popupOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000000dd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  popupBox: {
    backgroundColor: "#1a1a2e",
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #00FFFF",
    textAlign: "center",
    width: "90%",
    maxWidth: "320px",
    boxShadow: "0 0 20px #FF66CCaa",
  },
  popupTitle: {
    fontSize: "12px",
    color: "#FF66CC",
    marginBottom: "10px",
  },
  popupText: {
    fontSize: "10px",
    color: "#ccc",
    marginBottom: "15px",
  },
  popupBtn: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "8px",
    backgroundColor: "#00FFFF",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "10px",
    cursor: "pointer",
  },
  popupClose: {
    marginTop: "8px",
    backgroundColor: "#FF66CC",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "10px",
    cursor: "pointer",
  },
    copyRow: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  copyInput: {
    flex: 1,
    minWidth: "180px",
    backgroundColor: "#0d0d0d",
    color: "#00FFFF",
    border: "1px solid #00FFFF",
    borderRadius: "6px",
    padding: "8px",
    fontSize: "9px",
    fontFamily: "'Press Start 2P', monospace",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  copyButton: {
    padding: "8px",
    fontSize: "9px",
    backgroundColor: "#FF66CC",
    color: "#000",
    border: "none",
    borderRadius: "6px",
    fontFamily: "'Press Start 2P', monospace",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

};
