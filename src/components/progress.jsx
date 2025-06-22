import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const TARGET = 400000000000;

export default function SaleProgress() {
  const [sold, setSold] = useState("Loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const totalRef = doc(db, "labubuSales", "total");
          const snap = await getDoc(totalRef);
          const amount = snap.exists() ? Number(snap.data().labubuSold || 0) : 0;
          setSold(amount);
        } catch (err) {
          console.error("❌ Error fetching sale progress:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const progressPercent = Math.min((sold / TARGET) * 100, 100).toFixed(2);

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>
        🔥 SOLD: {sold.toLocaleString()} LABUBU
      </h3>
      <div style={styles.barBackground}>
        <div
          style={{
            ...styles.barFill,
            width: `${progressPercent}%`,
          }}
        ></div>
      </div>
      <p style={styles.percent}>{progressPercent}% COMPLETE</p>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Press Start 2P', monospace",
    textAlign: "center",
    margin: "20px 0",
    color: "#FF66CC",
  },
  header: {
    fontSize: "12px",
    marginBottom: "10px",
    color: "#00ffff",
    textShadow: "0 0 6px #00ffff",
  },
  barBackground: {
    width: "100%",
    maxWidth: 420,
    height: 18,
    backgroundColor: "#1a1a2e",
    borderRadius: 10,
    boxShadow: "0 0 8px #ff66cc55",
    overflow: "hidden",
    margin: "0 auto",
  },
  barFill: {
    height: "100%",
    background: "linear-gradient(to right, #FF66CC, #00ffff)",
    boxShadow: "0 0 12px #ff66cc",
    transition: "width 0.5s ease-in-out",
  },
  percent: {
    marginTop: 6,
    fontSize: "10px",
    color: "#00ffff",
    textShadow: "0 0 4px #00ffff",
  },
};
