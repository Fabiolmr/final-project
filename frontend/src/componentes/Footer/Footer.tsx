import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <p>
        Feito por{" "}
        <a href="https://github.com/G-Furlan" target="_blank" rel="noopener noreferrer" className="footer-link">
          G-Furlan
        </a>
        ,{" "}
        <a href="https://github.com/Flip-Cruz" target="_blank" rel="noopener noreferrer" className="footer-link">
          Flip-Cruz
        </a>{" "}
        e{" "}
        <a href="https://github.com/Fabiolmr" target="_blank" rel="noopener noreferrer" className="footer-link">
          Fabiolmr
        </a>
      </p>
    </footer>
  );
}