import React from "react";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <img
          src="https://raw.githubusercontent.com/woofai-token/Presalepage/main/logo.jpg"
          alt="Labubu Logo"
          style={styles.logoImg}
        />
        <span style={styles.logoText}>LABUBU Presale</span>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#111",
    display: "flex",
    width:"100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    borderBottom: "4px solid #00FFFF",
    fontFamily: "'Press Start 2P', cursive",
    position: "relative",
    zIndex: 1,
    margin:0,
    borderTop:0,

  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    width: "70px",
    height: "70px",
    marginRight: "1rem",
  },
  logoText: {
    fontSize: "1rem",
    color: "#00FFFF",
  },
};
