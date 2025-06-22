import React, { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { db } from "./firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

const BACKEND_URL = "https://server2-0-9pf7.onrender.com";
const WFAI_PER_USDT = 1 / 0.0000001252;
const RECEIVER_WALLET = new PublicKey("Cuzt7YRDoEq4Moi1Voj6ceQAdGbavTpqSk3WpfTEBtnM");

async function updateTotalSold(wfaiAmount) {
  const totalRef = doc(db, "sales", "total");
  try {
    const snap = await getDoc(totalRef);
    const previous = snap.exists() ? Number(snap.data().wfaiAmount || 0) : 0;
    const newTotal = previous + parseInt(wfaiAmount, 10);
    await setDoc(totalRef, { wfaiAmount: newTotal }, { merge: true });
  } catch (e) {
    console.error("❌ Failed to update total sold:", e);
  }
}

export default function PresaleForm() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();

  const [usdtAmount, setUsdtAmount] = useState("");
  const [solAmount, setSolAmount] = useState("");
  const [wfaiAmount, setWfaiAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [solPrice, setSolPrice] = useState(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      .then((res) => res.json())
      .then((data) => setSolPrice(data.solana.usd))
      .catch(() => setStatus("❌ Failed to fetch SOL price."));
  }, []);

  const updateFromUsdt = (value) => {
    setUsdtAmount(value);
    const usdt = parseFloat(value);
    if (!isNaN(usdt) && solPrice) {
      const sol = usdt / solPrice;
      setSolAmount(sol.toFixed(4));
      setWfaiAmount((usdt * WFAI_PER_USDT).toFixed(0));
    } else {
      setSolAmount("");
      setWfaiAmount("");
    }
  };

  async function handleBuy(e) {
    e.preventDefault();
    if (!connected || !publicKey) {
      setStatus("❌ Please connect your wallet.");
      return;
    }

    const sol = parseFloat(solAmount);
    if (!sol || isNaN(sol) || sol <= 0) {
      setStatus("❌ Enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setStatus("⏳ Creating transaction...");

      const lamports = sol * 1e9;
      const blockhashInfo = await connection.getLatestBlockhash("finalized");

      const transaction = new Transaction({
        feePayer: publicKey,
        recentBlockhash: blockhashInfo.blockhash,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: RECEIVER_WALLET,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(
        { signature, ...blockhashInfo },
        "confirmed"
      );

      setStatus("✅ Confirmed. Verifying with backend...");

      const response = await fetch(`${BACKEND_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signature,
          buyer: publicKey.toBase58(),
          wfaiAmount: (parseInt(wfaiAmount, 10) * 1e9).toString(),
        }),
      });

      const data = await response.json();
      setStatus(
        response.ok && data.success
          ? "🎉 Purchase successful! Tokens sent."
          : `❌ Backend error: ${data.error || "Unknown error"}`
      );
      updateTotalSold(wfaiAmount);
    } catch (err) {
      console.error("❌ Transaction error:", err);
      setStatus("❌ Transaction failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleBuy} style={styles.form}>
      <div style={styles.line}>💰 1 $LABUBU = 0.0000001252 USDT</div>
      <input
        type="number"
        placeholder="USDT"
        value={usdtAmount}
        min="1"
        max="500"
        step="0.01"
        onChange={(e) => updateFromUsdt(e.target.value)}
        style={styles.input}
        disabled={loading}
      />
      <input
        type="text"
        placeholder="LABUBU"
        value={wfaiAmount}
        disabled
        style={styles.input}
      />
      <button
        type="submit"
        style={styles.button}
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now 🚀"}
      </button>
      <p style={styles.status}>{status}</p>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    fontFamily: "'Press Start 2P', monospace",
  },
  line: {
    textAlign: "center",
    fontSize: "10px",
    color: "#00ffff",
  },
  input: {
    padding: "12px",
    fontSize: "12px",
    borderRadius: "8px",
    border: "1px solid #FF66CC",
    backgroundColor: "#1a1a2e",
    color: "#FF66CC",
    textAlign: "center",
    fontFamily: "'Press Start 2P', monospace",
  },
  button: {
    padding: "14px",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#FF66CC",
    color: "#1a1a2e",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Press Start 2P', monospace",
    boxShadow: "0 0 10px #FF66CC",
    transition: "0.3s ease",
  },
  status: {
    fontSize: "10px",
    color: "#00ffff",
    textAlign: "center",
    minHeight: "24px",
    marginTop: "10px",
  },
};
