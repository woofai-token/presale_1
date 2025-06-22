import React from "react";

const LanguageSelector = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      style={styles.selector}
      defaultValue="en"
    >
       <option value="en">🌐 English</option>
  <option value="es">Español</option>
  <option value="ar">العربية</option>
  <option value="zh-CN">中文</option>
  <option value="fr">Français</option>
  <option value="pt">Português</option>
  <option value="ru">Русский</option>
  <option value="ja">日本語</option>
  <option value="hi">हिन्दी</option>
  <option value="ur">اردو</option>
  <option value="de">Deutsch</option>
  <option value="ko">한국어</option>
  <option value="it">Italiano</option>
    </select>
  );
};

const styles = {
  selector: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "10px",
    padding: "5px",
    borderRadius: "6px",
    border: "1px solid #00ffff",
    backgroundColor: "#1a1a2e",
    color: "#00ffff",
    position: "absolute",
    top: "1rem",
    right: "1rem",
    zIndex: 2,
  },
};

export default LanguageSelector;
