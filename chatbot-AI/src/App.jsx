import React from "react";
import Chatbot from "./Chatbot";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>AI Document Chat</h1>
        <p className="subtitle">Upload file → Chat với file + Gemini (document/general/hybrid)</p>
      </header>

      <main className="app-main">
        <Chatbot />
      </main>

      <footer className="app-footer">
        <small>Made for your AI project • Backend required: /upload and /ask</small>
      </footer>
    </div>
  );
}
