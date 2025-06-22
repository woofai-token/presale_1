import React, { useEffect, useState } from "react";

export default function Countdown() {
  const END_DATE = new Date("2025-06-24T00:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = END_DATE - now;

    if (diff <= 0) {
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      expired: false,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n) => n.toString().padStart(2, "0");

  return (
    <div style={styles.container}>
      <div style={styles.title}>⏳ PRICE GOES UP IN:</div>
      <div style={styles.timer}>
        <div style={styles.block}>{format(timeLeft.days)}<span style={styles.unit}>D</span></div>
        <div style={styles.separator}>:</div>
        <div style={styles.block}>{format(timeLeft.hours)}<span style={styles.unit}>H</span></div>
        <div style={styles.separator}>:</div>
        <div style={styles.block}>{format(timeLeft.minutes)}<span style={styles.unit}>M</span></div>
        <div style={styles.separator}>:</div>
        <div style={styles.block}>{format(timeLeft.seconds)}<span style={styles.unit}>S</span></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Press Start 2P', monospace",
    marginBottom: "20px",
    color: "#FF66CC",
  },
  title: {
    fontSize: "12px",
    marginBottom: "10px",
    color: "#00ffff",
    textShadow: "0 0 6px #00ffff",
  },
  timer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  block: {
    backgroundColor: "#1a1a2e",
    color: "#FF66CC",
    padding: "12px 10px",
    borderRadius: "8px",
    fontSize: "14px",
    boxShadow: "0 0 10px #FF66CC",
    minWidth: "60px",
    textAlign: "center",
    position: "relative",
  },
  unit: {
    display: "block",
    fontSize: "8px",
    marginTop: "4px",
    color: "#00ffff",
  },
  separator: {
    fontSize: "20px",
    color: "#00ffff",
    textShadow: "0 0 8px #00ffff",
  },
};
